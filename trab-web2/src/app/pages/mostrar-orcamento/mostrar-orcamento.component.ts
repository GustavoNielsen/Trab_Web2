import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { RouterLink, RouterOutlet,  ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';

@Component({
  selector: 'app-mostrar-orcamento',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MostrarOrcamentoComponent, RouterLink, NavbarComponent],
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})
export class MostrarOrcamentoComponent implements OnInit {

  solicitacao!: Solicitacao;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dataHoraParam = params['dataHora'];
      const solicitacaoOrcada = this.solicitacaoService.buscarSolicitacaoPorDataHora(dataHoraParam);
      if (solicitacaoOrcada) {
        this.solicitacao = solicitacaoOrcada;
      } else {
        console.error('Solicitação não encontrada!');
      }
    });
  }

  private atualizarSolicitacao() {
    const allSolicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]') as Solicitacao[];
    const index = allSolicitacoes.findIndex(s => new Date(s.dataHora).toISOString() === new Date(this.solicitacao.dataHora).toISOString());
    if (index !== -1) {
      allSolicitacoes[index] = this.solicitacao;
      localStorage.setItem('solicitacoes', JSON.stringify(allSolicitacoes));
    }
  }

  // Atualiza o atributo 'aprovado' para "Aprovado", atualiza o armazenamento e navega para a página inicial do cliente.
  aprovarServico(): void {
    this.solicitacao.estado = 'Aprovada';
    this.solicitacao.horarioAprovacao = new Date().toISOString()
    const historico = new Historicosolicitacao(this.solicitacao.horarioAprovacao, this.solicitacao.estado, this.solicitacao.idFuncionario, this.solicitacao.observacoesOrcamento)
    this.solicitacao.historicoSolicitacao.push(historico)
    this.atualizarSolicitacao();
    alert('Serviço Aprovado no Valor R$ '+this.solicitacao.valorOrcamento)
    this.router.navigate(['paginainicialcliente']);
  }

  // Atualiza o atributo 'aprovado' para "Rejeitado", atualiza o armazenamento e navega para a página inicial do cliente.
  rejeitarServico(): void {
    this.solicitacao.estado = 'Rejeitada';
    this.atualizarSolicitacao();
    alert('Serviço Rejeitado ')
    this.router.navigate(['paginainicialcliente']);
  }
}
