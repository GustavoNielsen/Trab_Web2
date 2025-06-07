import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { EquipamentoService } from '../../services/equipamento.service';
import { FuncionarioService } from '../../services/funcionario.service'; // Importar FuncionarioService

import { Solicitacao } from '../../shared/models/solicitacao';
import { Equipamento } from '../../shared/models/equipamento';
import { Funcionario } from '../../shared/models/funcionario'; // Importar Funcionario
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-solicita-manutencao',
  templateUrl: './solicita-manutencao.component.html',
  standalone: true,
  styleUrls: ['./solicita-manutencao.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class SolicitaManutencaoComponent implements OnInit {
  // Dados do formulário
  public cpf = '';
  public descricaoEquipamento = '';
  public categoriaEquipamento = '';
  public descricaoDefeito = '';

  // Listas de apoio e estado
  public equipamentos: Equipamento[] = [];
  public funcionarios: Funcionario[] = []; // Armazena os funcionários disponíveis
  public isLoading = true;

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService,
    private equipamentoService: EquipamentoService,
    private funcionarioService: FuncionarioService // Injetar o FuncionarioService
  ) {}

  ngOnInit(): void {
    this.cpf = this.clienteService.cpfLogado;
    
    // CORREÇÃO 1: Carrega dados essenciais (equipamentos e funcionários) em paralelo.
    forkJoin({
      equipamentos: this.equipamentoService.listarTodos(),
      funcionarios: this.funcionarioService.listarTodos()
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (resultado) => {
        this.equipamentos = resultado.equipamentos;
        this.funcionarios = resultado.funcionarios;
      },
      error: (err) => {
        console.error('Erro ao carregar dados iniciais:', err);
        alert('Não foi possível carregar os dados necessários para a solicitação.');
      }
    });
  }

  enviarSolicitacao(): void {
    if (this.isLoading) return;
    
    // CORREÇÃO 2: Lógica para atribuir a solicitação a um funcionário.
    // Em um sistema real, isso seria uma regra de negócio mais complexa.
    // Aqui, pegamos o primeiro funcionário da lista como padrão.
    if (this.funcionarios.length === 0 || !this.funcionarios[0].id) {
        alert('Não há funcionários disponíveis para receber a solicitação.');
        return;
    }
    const idFuncionarioInicial = this.funcionarios[0].id;

    // CORREÇÃO 3: Usa o novo construtor simplificado da classe Solicitacao.
    const novaSolicitacao = new Solicitacao(
      this.cpf,
      this.descricaoEquipamento,
      this.categoriaEquipamento,
      this.descricaoDefeito,
      idFuncionarioInicial
    );

    this.isLoading = true;
    // CORREÇÃO 4: Chama o método correto ('inserir') e navega apenas no sucesso.
    this.solicitacaoService.inserir(novaSolicitacao)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (solicitacaoCriada) => {
          console.log('Solicitação criada com sucesso:', solicitacaoCriada);
          alert('Sua solicitação foi enviada com sucesso!');
          this.router.navigate(['/paginainicialcliente']);
        },
        error: (err) => {
          console.error('Erro ao enviar a solicitação:', err);
          alert('Houve uma falha ao enviar sua solicitação. Tente novamente.');
        }
      });
  }
}
