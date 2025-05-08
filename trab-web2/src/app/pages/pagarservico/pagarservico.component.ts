import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FuncionarioService } from '../../services/funcionario.service';


@Component({
  selector: 'app-pagarservico',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule, NavbarComponent],
  templateUrl: './pagarservico.component.html',
  styleUrl: './pagarservico.component.css'
})
export class PagarservicoComponent implements OnInit {
  solicitacao!: Solicitacao;
  cliente!: Cliente;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialcliente']);
      return;
    }
    const sol = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!sol) {
      this.router.navigate(['/paginainicialcliente']);
      return;
    }
    this.solicitacao = sol;

    const cli = this.clienteSvc.buscarPorcpf(this.solicitacao.cpfCliente);
    if (!cli) {
      this.router.navigate(['/paginainicialcliente']);
      return;
    }
    this.cliente = cli;
  }

  confirmarPagamento(): void {
    const iso = new Date(this.solicitacao.dataHora).toISOString();
    this.solicitacaoSvc.registrarPagamento(iso, /*valor*/ this.solicitacao.valorOrcamento, /*obs*/ '',this.funcionarioService.idLogado);
    // ou, se quiser um método dedicado:
    // this.solicitacaoSvc.registrarPagamento(this.solicitacao.dataHora, this.solicitacao.valorOrcamento);
    this.router.navigate(['/paginainicialcliente']);
  }

}

