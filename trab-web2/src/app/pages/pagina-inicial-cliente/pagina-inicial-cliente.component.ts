// pages/pagina-inicial-cliente/pagina-inicial-cliente.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service'; 
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-pagina-inicial-cliente',
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrls: ['./pagina-inicial-cliente.component.css'], 
  imports:[CommonModule, NavbarComponent, RouterLink, RouterModule]
})
export class PaginaInicialClienteComponent implements OnInit {
  cpf: string = '';
  solicitacoes: Solicitacao[] = [];

  constructor(
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService 
  ) {}

  ngOnInit(): void {
    this.cpf = this.clienteService.cpfLogado
    console.log(this.cpf)
    this.solicitacoes = this.solicitacaoService.listarSolicitacoesPorCpf(this.cpf);
    console.log(this.cpf)
    this.solicitacoes.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
  }

  visualizarSolicitacao(solicitacao: Solicitacao): void {
    console.log('Visualizar solicitação', solicitacao);
  }

  acaoSolicitacao(solicitacao: Solicitacao): void {
    console.log('Ação na solicitação', solicitacao);
  }
  resgatarServico(solicitacao: Solicitacao) {
    this.solicitacaoService.resgatarSolicitacao(solicitacao.dataHora, solicitacao.valorOrcamento,solicitacao.observacoesOrcamento, solicitacao.idFuncionario)
    solicitacao.estado = "Aprovada"
  }
}
