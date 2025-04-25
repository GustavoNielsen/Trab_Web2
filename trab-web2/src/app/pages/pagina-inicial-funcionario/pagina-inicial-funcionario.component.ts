// src/app/pages/pagina-inicial-funcionario/pagina-inicial-funcionario.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { FuncionarioService } from '../../services/funcionario.service';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';

import { Solicitacao } from '../../shared/models/solicitacao';

@Component({
  selector: 'app-pagina-inicial-funcionario',
  standalone: true,
  imports: [
    NavbarFuncionarioComponent,
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css']
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.solicitacoes = this.solicitacaoService.listarSolicitacoesPorEstado('Aberta');
    this.solicitacoes.sort((a, b) =>
      new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );
  }

  getNomeCliente(cpf: string): string {
    const cli = this.clienteService.buscarPorcpf(cpf);
    return cli ? cli.nome : '—';
  }

  getDataHoraParaRota(s: Solicitacao): string {
    const dataHora = new Date(s.dataHora).toISOString();
    const idFuncionario = this.funcionarioService.idLogado;
    return `${dataHora}/${idFuncionario}`;
  }
}
