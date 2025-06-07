import { Component, OnInit } from '@angular/core';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FuncionarioService } from '../../services/funcionario.service';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';

import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';

@Component({
  selector: 'app-pagina-inicial-funcionario',
  standalone: true,
  imports: [
    NavbarFuncionarioComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css']
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  public solicitacoes: Solicitacao[] = [];
  public isLoading = true;

  // Mapa para armazenar os nomes dos clientes (CPF -> Nome) para consulta rápida.
  private mapaNomesClientes: Map<string, string> = new Map();

  constructor(
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService,
    public funcionarioService: FuncionarioService // Tornando público para uso no template
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  private carregarDados(): void {
    this.isLoading = true;
    
    // forkJoin executa ambas as chamadas de serviço em paralelo.
    forkJoin({
      solicitacoes: this.solicitacaoService.listarTodas(),
      clientes: this.clienteService.listarTodos()
    })
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: (resultado) => {
        // 1. Cria o mapa de clientes para consulta rápida.
        resultado.clientes.forEach(cliente => {
          this.mapaNomesClientes.set(cliente.cpf, cliente.nome);
        });

        // 2. Filtra as solicitações por estado e ordena por data.
        this.solicitacoes = resultado.solicitacoes
          .filter(s => s.estado === 'Pendente' || s.estado === 'Aprovada') // Filtra por um ou mais estados
          .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
      },
      error: (err) => {
        console.error('Erro ao carregar dados iniciais:', err);
        alert('Não foi possível carregar as solicitações.');
      }
    });
  }

  /**
   * CORRIGIDO: Este método agora faz uma busca síncrona e performática no mapa.
   * Não há mais chamadas à API dentro de um loop.
   */
  public getNomeCliente(cpf: string): string {
    return this.mapaNomesClientes.get(cpf) || 'Cliente não encontrado';
  }

  /**
   * Mantém a lógica para criar a rota, mas agora o idLogado
   * é acessado diretamente pelo serviço público no template.
   */
  public getDataHoraParaRota(solicitacao: Solicitacao): string {
    return new Date(solicitacao.dataHora).toISOString();
  }
}
