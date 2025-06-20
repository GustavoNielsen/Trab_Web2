import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { AuthService } from '../../services/auth.service'; // Assumindo que este serviço existe
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
    private authService: AuthService, // Injete o serviço de autenticação
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    const usuarioLogado = this.authService.getUsuarioLogado();
    if (!usuarioLogado || !usuarioLogado.cpf) {
      this.mensagem = "Usuário não autenticado. Redirecionando para o login...";
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    this.solicitacaoService.listarPorCliente(usuarioLogado.cpf).subscribe({
      next: (data) => {
        // Filtra para mostrar apenas as solicitações com estado 'Finalizada'
        this.solicitacoes = data.filter(s => s.estado === 'Finalizada');
        if (this.solicitacoes.length === 0) {
          this.mensagem = "Nenhum serviço finalizado disponível para resgate.";
        } else {
          this.mensagem = null;
        }
      },
      error: (err) => {
        console.error('Erro ao buscar solicitações:', err);
        this.mensagem = "Ocorreu um erro ao buscar suas solicitações.";
      }
    });
  }

  resgatar(solicitacao: Solicitacao): void {
    if (confirm(`Tem certeza que deseja resgatar o serviço para o equipamento "${solicitacao.equipamento}"?`)) {
      this.solicitacaoService.resgatarServico(solicitacao.id!).subscribe({
        next: () => {
          alert('Serviço resgatado com sucesso!');
          this.carregarSolicitacoes(); // Atualiza a lista
        },
        error: (err) => {
          console.error('Erro ao resgatar serviço:', err);
          alert('Erro ao resgatar serviço. Tente novamente.');
          this.mensagem = "Ocorreu um erro ao resgatar o serviço.";
        }
      });
    }
  }

  getTotalOrcamento(): number {
    return this.solicitacoes.reduce((total, s) => total + (s.valorOrcamento || 0), 0);
  }

  getTotalPago(): number {
    // Como não temos uma propriedade específica para valor pago, usaremos valorOrcamento
    // que representa o valor que foi orçado e pago pelos serviços finalizados
    return this.solicitacoes.reduce((total, s) => total + (s.valorOrcamento || 0), 0);
  }

  voltar(): void {
    this.router.navigate(['/paginainicialcliente']); // Rota para a página inicial do cliente
  }
}
