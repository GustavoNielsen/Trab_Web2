import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class PaginaInicialComponent implements OnInit {

  solicitacoes: any[] = [
    {
      id: 1,
      dataHora: new Date('2024-09-20T10:00:00'),
      nomeCliente: 'João Silva',
      descricaoProduto: 'Notebook Dell Latitude E6420',
      estado: 'ABERTA',
      categoria: 'Notebook',
      defeito: 'Não liga'
    },
    {
      id: 2,
      dataHora: new Date('2024-09-19T15:00:00'),
      nomeCliente: 'Maria Oliveira',
      descricaoProduto: 'PC Optiplex 7080',
      estado: 'FECHADA',
      categoria: 'Desktop',
      defeito: 'Desliga sozinho'
    },
    {
      id: 3,
      dataHora: new Date('2024-09-18T09:00:00'),
      nomeCliente: 'Carlos Souza',
      descricaoProduto: 'PC Dell 7010',
      estado: 'ABERTA',
      categoria: 'Desktop',
      defeito: 'Esquenta muito'
    }
  ];

  solicitacoesAbertas: any[] = [];
  solicitacoesFiltradas: any[] = [];
  filtro: string = 'TODAS';
  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filtrarSolicitacoes();
  }

  listarTodasSolicitacoes(): void {
    this.router.navigate(['/visualizar-servicos-funcionario']);
  }

  listarTodasCategorias(): void {
    this.router.navigate(['/categorias/listar']);
  }

  filtrarSolicitacoes(): void {
    let solicitacoes = this.solicitacoes;

    if (this.filtro === 'HOJE') {
      const hoje = new Date();
      solicitacoes = solicitacoes.filter(solicitacao => {
        const dataSolicitacao = new Date(solicitacao.dataHora);
        return dataSolicitacao.toDateString() === hoje.toDateString();
      });
    } else if (this.filtro === 'PERIODO' && this.dataInicio && this.dataFim) {
      solicitacoes = solicitacoes.filter(solicitacao => {
        const dataSolicitacao = new Date(solicitacao.dataHora);
        return dataSolicitacao >= this.dataInicio! && dataSolicitacao <= this.dataFim!;
      });
    }

    this.solicitacoesFiltradas = solicitacoes.filter(solicitacao => solicitacao.estado === 'ABERTA');
  }

  efetuarOrcamento(solicitacao: any): void {
    console.log('ID da solicitação:', solicitacao.id);
    this.router.navigate(['/orcamento-funcionario', solicitacao.id]);
  }
}
