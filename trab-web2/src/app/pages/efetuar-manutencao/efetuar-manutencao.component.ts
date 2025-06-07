import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';
import { Funcionario } from '../../shared/models/funcionario';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';

import { SolicitacaoService } from '../../services/soliciticao.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { ClienteService } from '../../services/cliente.service';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarFuncionarioComponent],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  public solicitacao!: Solicitacao;
  public cliente!: Cliente;
  public funcionarios: Funcionario[] = [];
  public exibirFormularioManutencao = false;
  
  // Dados do formulário
  public descricaoManutencao = '';
  public orientacoesCliente = '';
  public destinoFuncionarioId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService,
    private funcSvc: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  private carregarDados(): void {
    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }

    const solicitacaoEncontrada = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!solicitacaoEncontrada) {
      alert('Solicitação não encontrada!');
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.solicitacao = solicitacaoEncontrada;

    // forkJoin executa as chamadas em paralelo e retorna quando TODAS estiverem completas.
    forkJoin({
      cliente: this.clienteSvc.buscarPorCpf(this.solicitacao.cpfCliente),
      funcionarios: this.funcSvc.listarTodos()
    }).pipe(
      catchError(error => {
        console.error('Erro ao carregar dados em paralelo', error);
        alert('Não foi possível carregar os detalhes da solicitação. Tente novamente.');
        this.router.navigate(['/paginainicialfuncionario']);
        return of(null); // Retorna um observable nulo para não quebrar a cadeia
      })
    ).subscribe(resultado => {
      if (resultado) {
        this.cliente = resultado.cliente;
        // Filtra a lista de funcionários para não incluir o funcionário atual
        this.funcionarios = resultado.funcionarios.filter(f => f.id !== this.solicitacao.idFuncionario);
      }
    });
  }

  public toggleManutencao(): void {
    this.exibirFormularioManutencao = !this.exibirFormularioManutencao;
  }

  public confirmarManutencao(): void {
    if (!this.descricaoManutencao.trim() || !this.orientacoesCliente.trim()) {
      alert('Por favor, preencha todos os campos de manutenção.');
      return;
    }

    this.solicitacao.descricaoManutencao = this.descricaoManutencao;
    this.solicitacao.orientacaoCliente = this.orientacoesCliente;
    this.solicitacao.estado = 'Arrumada';
    this.solicitacao.dataHoraManutencao = new Date().toISOString();
    
    const historico = new Historicosolicitacao(
      this.solicitacao.dataHoraManutencao,
      this.solicitacao.estado,
      this.solicitacao.idFuncionario,
      'Manutenção concluída.'
    );
    this.solicitacao.historicoSolicitacao.push(historico);

    // A lógica de salvar foi movida para o serviço. O componente só chama o método.
    this.solicitacaoSvc.atualizar(this.solicitacao).subscribe({
      next: () => {
        alert('Manutenção registrada com sucesso!');
        this.router.navigate(['/paginainicialfuncionario']);
      },
      error: (err) => {
        alert('Erro ao salvar a manutenção.');
        console.error(err);
      }
    });
  }

  public redirecionarManutencao(): void {
    if (!this.destinoFuncionarioId) {
      alert('Selecione um funcionário para redirecionar.');
      return;
    }

    // O serviço agora cuida da lógica de atualizar o estado e o funcionário.
    this.solicitacaoSvc.redirecionarManutencao(this.solicitacao.dataHora, this.destinoFuncionarioId)
      .subscribe({
        next: () => {
          alert('Solicitação redirecionada com sucesso!');
          this.router.navigate(['/paginainicialfuncionario']);
        },
        error: (err) => {
          alert('Erro ao redirecionar a solicitação.');
          console.error(err);
        }
      });
  }

  public cancelar(): void {
    this.router.navigate(['/paginainicialfuncionario']);
  }
}