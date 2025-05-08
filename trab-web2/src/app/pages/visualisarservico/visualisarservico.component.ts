// src/app/pages/visualisarservico/visualisarservico.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-visualisarservico',
  standalone: true,
  imports: [
    CommonModule,      // para *ngIf, date pipe, etc.
    RouterModule,      // para [routerLink] e directives de rota
    NavbarComponent    // seu componente de navbar
  ],
  templateUrl: './visualisarservico.component.html',
  styleUrls: ['./visualisarservico.component.css']  // note o plural
})
export class VisualisarservicoComponent implements OnInit {
  solicitacao?: Solicitacao;

  constructor(
    private route: ActivatedRoute,          // só injetado, não listado em imports
    private service: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const dataHora = params.get('dataHora');
      if (!dataHora) return;
      this.solicitacao = this.service.buscarSolicitacaoPorDataHora(dataHora);
    });
  }

  resgatar(): void {
    if (!this.solicitacao) return;
    this.service.resgatarSolicitacao(
      this.solicitacao.dataHora,
      this.solicitacao.valorOrcamento,
      this.solicitacao.observacoesOrcamento,
      this.solicitacao.idFuncionario
    );
    this.solicitacao = this.service.buscarSolicitacaoPorDataHora(this.solicitacao.dataHora);
  }
}
