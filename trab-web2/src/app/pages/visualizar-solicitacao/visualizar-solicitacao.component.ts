import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente'; // Importar o modelo Cliente
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';

@Component({
  selector: 'app-visualizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarFuncionarioComponent
  ],
  templateUrl: './visualizar-solicitacao.component.html',
  styleUrls: ['./visualizar-solicitacao.component.css']
})
export class VisualizarSolicitacaoComponent implements OnInit {
  // Armazena a lista completa de solicitações vinda da API
  private todasSolicitacoes: Solicitacao[] = [];
  // Lista que será exibida na tela após a aplicação dos filtros
  public solicitacoesFiltradas: Solicitacao[] = [];
  // Mapa para consulta rápida de nomes de clientes (CPF -> Nome)
  private mapaNomesClientes: Map<string, string> = new Map();

  // Controles do formulário de filtro
  public filtroTipo: 'hoje' | 'periodo' | 'todas' = 'todas';
  public dataInicio = '';
  public dataFim = '';
  public isLoading = true;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  /**
   * Carrega todos os dados necessários (solicitações e clientes) em paralelo.
   */
  private carregarDadosIniciais(): void {
    this.isLoading = true;
    forkJoin({
      solicitacoes: this.solicitacaoService.listarTodas(),
      clientes: this.clienteService.listarTodos()
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (resultado) => {
        // Cria o mapa de clientes para consulta de nome otimizada
        resultado.clientes.forEach(cliente => this.mapaNomesClientes.set(cliente.cpf, cliente.nome));
        
        this.todasSolicitacoes = resultado.solicitacoes;
        this.aplicarFiltro(); // Aplica o filtro inicial ('todas')
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
        alert('Não foi possível carregar as informações. Tente novamente.');
      }
    });
  }

  /**
   * CORRIGIDO: Filtra a lista de solicitações localmente, sem chamar o serviço.
   */
  public aplicarFiltro(): void {
    let resultado = this.todasSolicitacoes;

    switch (this.filtroTipo) {
      case 'hoje':
        const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        resultado = this.todasSolicitacoes.filter(s => s.dataHora.startsWith(hoje));
        break;
      
      case 'periodo':
        if (this.dataInicio && this.dataFim) {
          const inicio = new Date(this.dataInicio).getTime();
          const fim = new Date(this.dataFim).getTime() + (24 * 60 * 60 * 1000 - 1); // Inclui o dia final inteiro
          resultado = this.todasSolicitacoes.filter(s => {
            const dataSol = new Date(s.dataHora).getTime();
            return dataSol >= inicio && dataSol <= fim;
          });
        }
        break;
        
      case 'todas':
      default:
        // Não faz nada, já que 'resultado' já é a lista completa.
        break;
    }
    this.solicitacoesFiltradas = resultado;
  }

  /**
   * CORRIGIDO: Finaliza a solicitação de forma assíncrona.
   */
  public finalizarSolicitacao(solicitacao: Solicitacao): void {
    if (typeof solicitacao.id !== 'number') {
      alert('Erro: Solicitação com ID inválido.');
      return;
    }

    if (!confirm('Tem certeza que deseja finalizar esta solicitação?')) return;

    this.isLoading = true;
    this.solicitacaoService.finalizarSolicitacao(solicitacao.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Solicitação finalizada com sucesso!');
          // Atualiza o estado na tela para feedback imediato.
          solicitacao.estado = 'Finalizada';
        },
        error: (err) => {
          console.error('Erro ao finalizar solicitação:', err);
          alert('Falha ao finalizar a solicitação.');
        }
      });
  }

  /**
   * CORRIGIDO: Busca o nome do cliente de forma síncrona e performática.
   */
  public getNomeCliente(cpf: string): string {
    return this.mapaNomesClientes.get(cpf) || 'Cliente não encontrado';
  }
}
