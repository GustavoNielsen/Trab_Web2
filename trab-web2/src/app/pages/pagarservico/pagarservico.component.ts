import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-pagarservico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './pagarservico.component.html',
  styleUrls: ['./pagarservico.component.css']
})
export class PagarservicoComponent implements OnInit {
  solicitacao!: Solicitacao;
  cliente!: Cliente;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService
  ) {}

  ngOnInit(): void {
    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialcliente']);
      return;
    }

    const sol = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!sol) {
      alert('Solicitação não encontrada.');
      this.router.navigate(['/paginainicialcliente']);
      return;
    }
    this.solicitacao = sol;

    this.clienteSvc.buscarPorCpf(this.solicitacao.cpfCliente).subscribe({
      next: (clienteEncontrado) => {
        if (!clienteEncontrado) {
          alert('Cliente da solicitação não foi encontrado.');
          this.router.navigate(['/paginainicialcliente']);
          return;
        }
        this.cliente = clienteEncontrado;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do cliente:', err);
        alert('Não foi possível carregar os dados do cliente.');
        this.isLoading = false;
        this.router.navigate(['/paginainicialcliente']);
      }
    });
  }

  confirmarPagamento(): void {
    if (this.isLoading) return;

    // 1. Verificação para o ID da solicitação
    if (!this.solicitacao || typeof this.solicitacao.id !== 'number') {
      alert('Erro: Não foi possível identificar a solicitação para pagamento.');
      return;
    }

    // 2. CORREÇÃO: Verificação para o valor do orçamento
    if (typeof this.solicitacao.valorOrcamento !== 'number') {
      alert('Erro: O valor do orçamento não está definido. Não é possível continuar.');
      return;
    }

    this.isLoading = true;

    // A partir daqui, TypeScript sabe que .id e .valorOrcamento são do tipo 'number'.
    this.solicitacaoSvc.registrarPagamento(this.solicitacao.id, this.solicitacao.valorOrcamento, 'Pagamento confirmado pelo cliente')
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          alert('Pagamento confirmado com sucesso!');
          this.router.navigate(['/paginainicialcliente']);
        },
        error: (err) => {
          console.error('Erro ao registrar o pagamento:', err);
          alert('Houve uma falha ao processar o pagamento. Tente novamente.');
        }
      });
  }
}
