import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mostrar-orcamento',
  imports: [CommonModule, RouterOutlet, MostrarOrcamentoComponent],
=======
import { Component, OnInit  } from '@angular/core';
import { RouterLink, RouterOutlet,  ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-orcamento',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MostrarOrcamentoComponent, RouterLink, NavbarComponent, FormsModule],
>>>>>>> Stashed changes
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})
export class MostrarOrcamentoComponent {

<<<<<<< Updated upstream
=======
  solicitacao!: Solicitacao;
  motivoRejeicao: string = '';
  mostrarModalRejeicao: boolean = false;

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

  // Limpa o motivo anterior
  rejeitarServico(): void {
    this.motivoRejeicao = '';
  }

  // Atualiza o atributo 'aprovado' para "Rejeitado", atualiza o armazenamento e navega para a página inicial do cliente.
  confirmarRejeicao(): void {
    if (this.solicitacao) {
      this.solicitacao.estado = 'Rejeitada';
      this.solicitacao.motivoRecusa = this.motivoRejeicao;
      this.atualizarSolicitacao();
      alert("Serviço rejeitado");
    }
  }

  abrirModalRejeicao() {
    this.mostrarModalRejeicao = true;
  }

  fecharModalRejeicao() {
    this.mostrarModalRejeicao = false;
  }
>>>>>>> Stashed changes
}
