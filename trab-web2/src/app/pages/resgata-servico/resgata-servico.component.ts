import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { AuthService } from '../../services/auth.service'; // Assumindo que este servi�o existe
import { Solicitacao } from '../../shared/models/solicitacao';
// import { NavbarClienteComponent } from '../navbarcliente/navbarcliente.component'; // Descomente se o componente existir

@Component({
  selector: 'app-resgata-servico',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    // NavbarClienteComponent, // Descomente se o componente existir
  ],
  templateUrl: './resgata-servico.component.html',
  styleUrl: './resgata-servico.component.css'
})
export class ResgataServicoComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  mensagem: string | null = null;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService, // Injete o servi�o de autentica��o
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    const usuarioLogado = this.authService.getUsuarioLogado();
    if (!usuarioLogado || !usuarioLogado.cpf) {
      this.mensagem = "Usu�rio n�o autenticado. Redirecionando para o login...";
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    this.solicitacaoService.listarPorCliente(usuarioLogado.cpf).subscribe({
      next: (data) => {
        // Filtra para mostrar apenas as solicita��es com estado 'Finalizada'
        this.solicitacoes = data.filter(s => s.estado === 'Finalizada');
        if (this.solicitacoes.length === 0) {
          this.mensagem = "Nenhum servi�o finalizado dispon�vel para resgate.";
        } else {
          this.mensagem = null;
        }
      },
      error: (err) => {
        console.error('Erro ao buscar solicita��es:', err);
        this.mensagem = "Ocorreu um erro ao buscar suas solicita��es.";
      }
    });
  }

  resgatar(solicitacao: Solicitacao): void {
    if (confirm(`Tem certeza que deseja resgatar o servi�o para o equipamento "${solicitacao.equipamento}"?`)) {
      this.solicitacaoService.resgatarServico(solicitacao.id!).subscribe({
        next: () => {
          alert('Servi�o resgatado com sucesso!');
          this.carregarSolicitacoes(); // Atualiza a lista
        },
        error: (err) => {
          console.error('Erro ao resgatar servi�o:', err);
          alert('Erro ao resgatar servi�o. Tente novamente.');
          this.mensagem = "Ocorreu um erro ao resgatar o servi�o.";
        }
      });
    }
  }

  getTotalOrcamento(): number {
    return this.solicitacoes.reduce((total, s) => total + (s.valorOrcamento || 0), 0);
  }

  getTotalPago(): number {
    // Como n�o temos uma propriedade espec�fica para valor pago, usaremos valorOrcamento
    // que representa o valor que foi or�ado e pago pelos servi�os finalizados
    return this.solicitacoes.reduce((total, s) => total + (s.valorOrcamento || 0), 0);
  }

  voltar(): void {
    this.router.navigate(['/paginainicialcliente']); // Rota para a p�gina inicial do cliente
  }
}
