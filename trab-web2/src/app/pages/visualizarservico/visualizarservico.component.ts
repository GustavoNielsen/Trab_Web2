import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';

import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-visualizarservico',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './visualizarservico.component.html',
  styleUrls: ['./visualizarservico.component.css']
})
export class VisualizarservicoComponent implements OnInit {
  public solicitacao?: Solicitacao;
  public nomeFuncionarioOrcamento?: string; // Armazena o nome do funcionário que fez o orçamento
  public nomeFuncionarioResponsavel?: string; // Armazena o nome do funcionário atual responsável
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    const dataHora = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHora) {
      alert('Identificador da solicitação não encontrado.');
      this.isLoading = false;
      return;
    }
    
    // 1. Busca a solicitação pelo método síncrono que usa localStorage
    const solicitacaoEncontrada = this.solicitacaoService.buscarSolicitacaoPorDataHora(dataHora);
    if (!solicitacaoEncontrada) {
      alert('Solicitação não encontrada.');
      this.isLoading = false;
      return;
    }
    this.solicitacao = solicitacaoEncontrada;

    // 2. Após encontrar a solicitação, busca os nomes dos funcionários associados
    // de forma assíncrona e otimizada.
    forkJoin({
      // Busca o funcionário responsável (o último que mexeu na solicitação)
      responsavel: this.funcionarioService.buscarPorId(this.solicitacao.idFuncionario),
      // Se houver um ID de quem fez o orçamento, busca ele também
      orcamento: this.solicitacao.funcionarioOrcamentoId 
                 ? this.funcionarioService.buscarPorId(this.solicitacao.funcionarioOrcamentoId) 
                 : of(null) // Se não houver, retorna um Observable nulo
    })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (nomes) => {
        this.nomeFuncionarioResponsavel = nomes.responsavel?.nome || 'Não encontrado';
        this.nomeFuncionarioOrcamento = nomes.orcamento?.nome || 'N/A';
      },
      error: (err) => {
        console.error('Erro ao buscar nomes de funcionários:', err);
        this.nomeFuncionarioResponsavel = 'Erro ao carregar';
        this.nomeFuncionarioOrcamento = 'Erro ao carregar';
      }
    });
  }

  /**
   * CORRIGIDO: O método agora chama 'resgatarServico' com o ID correto e espera a resposta.
   */
  public resgatar(): void {
    if (!this.solicitacao || typeof this.solicitacao.id !== 'number') {
      alert('Erro: Não é possível resgatar uma solicitação sem ID.');
      return;
    }

    if (!confirm('Tem certeza que deseja aprovar o orçamento e solicitar o conserto?')) {
      return;
    }

    this.isLoading = true;
    this.solicitacaoService.resgatarServico(this.solicitacao.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Serviço aprovado com sucesso!');
          // Atualiza o estado na tela para feedback imediato
          if (this.solicitacao) {
            this.solicitacao.estado = 'Aprovada';
          }
        },
        error: (err) => {
          console.error('Erro ao resgatar o serviço:', err);
          alert('Falha ao aprovar o serviço. Tente novamente.');
        }
      });
  }
}
