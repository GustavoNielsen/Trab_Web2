import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pagina-inicial-cliente',
  standalone: true,
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrls: ['./pagina-inicial-cliente.component.css'],
  imports: [CommonModule, NavbarComponent, RouterLink]
})
export class PaginaInicialClienteComponent implements OnInit {
  public cpf = '';
  public solicitacoes: Solicitacao[] = [];
  public isLoading = true;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cpf = this.clienteService.cpfLogado;
    if (!this.cpf) {
      console.error('Nenhum CPF de cliente logado encontrado.');
      alert('Não foi possível identificar o cliente. Por favor, faça o login novamente.');
      this.isLoading = false;
      return;
    }
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    this.isLoading = true;
    // CORREÇÃO 1: Usa o nome de método correto 'listarPorCliente'.
    // CORREÇÃO 2: Usa .subscribe() para tratar a resposta assíncrona.
    this.solicitacaoService.listarPorCliente(this.cpf)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (listaSolicitacoes) => {
          // A ordenação acontece aqui, depois que os dados chegaram.
          this.solicitacoes = listaSolicitacoes.sort((a, b) => 
            new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
          );
        },
        error: (err) => {
          console.error('Erro ao buscar solicitações do cliente:', err);
          alert('Não foi possível carregar suas solicitações.');
        }
    });
  }

  /**
   * CORREÇÃO 3: O método 'resgatarServico' agora chama o serviço corretamente
   * e só atualiza o estado da solicitação na interface após o sucesso.
   * @param solicitacao A solicitação a ser resgatada.
   */
  resgatarServico(solicitacao: Solicitacao): void {
    if (typeof solicitacao.id !== 'number') {
      alert('Erro: Solicitação sem um ID válido.');
      return;
    }

    if (!confirm('Tem certeza que deseja aprovar o orçamento e solicitar o conserto?')) {
      return;
    }

    this.isLoading = true;
    // O serviço `resgatarServico` espera apenas o ID.
    this.solicitacaoService.resgatarServico(solicitacao.id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          alert('Serviço aprovado com sucesso!');
          // Atualiza o estado localmente para refletir na tela imediatamente.
          solicitacao.estado = 'Aprovada';
        },
        error: (err) => {
          console.error('Erro ao resgatar serviço:', err);
          alert('Houve uma falha ao aprovar o serviço. Tente novamente.');
        }
      });
  }
}
