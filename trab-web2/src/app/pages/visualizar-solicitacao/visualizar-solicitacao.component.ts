import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService }      from '../../services/cliente.service';
import { FuncionarioService }  from '../../services/funcionario.service';
import { Solicitacao }         from '../../shared/models/solicitacao';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';

@Component({
  selector: 'app-visualizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    NavbarFuncionarioComponent
  ],
  templateUrl: './visualizar-solicitacao.component.html',
  styleUrls: ['./visualizar-solicitacao.component.css']
})
export class VisualizarSolicitacaoComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];

  filtroTipo: 'hoje' | 'periodo' | 'todas' = 'todas';
  dataInicio = '';
  dataFim    = '';

  constructor(
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.aplicarFiltro()
  }

  aplicarFiltro(): void {
    const idLogado = this.funcionarioService.idLogado;
    this.solicitacoesFiltradas = this.solicitacaoService.listarParaVisualizacao(
      idLogado,
      this.filtroTipo,
      this.dataInicio,
      this.dataFim
    );
  }

  finalizarSolicitacao(s: Solicitacao): void {
    this.solicitacaoService.finalizarSolicitacao(
      s.dataHora,
      s.valorOrcamento!,
      s.observacoesOrcamento!,
      this.funcionarioService.idLogado
    );
    s.estado = 'Finalizada';
  }

  getNomeCliente(cpf: string): string {
    const cli = this.clienteService.buscarPorcpf(cpf);
    return cli ? cli.nome : '—';
  }
}
