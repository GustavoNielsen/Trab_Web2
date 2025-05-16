import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';

interface ReceitaPorDia {
  data: string;
  total: number;
}

@Component({
  selector: 'app-relatorioreceitas',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarFuncionarioComponent],
  templateUrl: './relatorioreceitas.component.html',
  styleUrls: ['./relatorioreceitas.component.css']
})
export class RelatorioreceitasComponent implements OnInit {
  dataInicial: string | null = null;
  dataFinal: string | null = null;
  receitasPorDia: ReceitaPorDia[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
    this.atualizarRelatorio();
  }

  /** Retorna somente as solicitações com pagamento, aplicando filtro de data se solicitado */
  private obterSolicitacoesFiltradas(comFiltroData: boolean): any[] {
    const todas = this.solicitacaoService.recuperarSolicitacoes();
    return todas.filter(s => {
      if (!s.dataHoraPagamento) return false;
      const dt = new Date(s.dataHoraPagamento);
      if (comFiltroData && this.dataInicial) {
        const start = new Date(this.dataInicial);
        if (dt < start) return false;
      }
      if (comFiltroData && this.dataFinal) {
        const end = new Date(this.dataFinal);
        end.setHours(23,59,59,999);
        if (dt > end) return false;
      }
      return true;
    });
  }

  /** Atualiza a tabela HTML de receitas por dia */
  atualizarRelatorio(): void {
    const filtradas = this.obterSolicitacoesFiltradas(true);
    const mapa = new Map<string, number>();

    filtradas.forEach(s => {
      const dia = new Date(s.dataHoraPagamento!).toLocaleDateString('pt-BR');
      const prev = mapa.get(dia) || 0;
      mapa.set(dia, prev + (s.valorOrcamento || 0));
    });

    this.receitasPorDia = Array.from(mapa.entries())
      .map(([data, total]) => ({ data, total }))
      .sort((a, b) => {
        const da = new Date(a.data.split('/').reverse().join('-'));
        const db = new Date(b.data.split('/').reverse().join('-'));
        return da.getTime() - db.getTime();
      });
  }

  /** Gera PDF com agrupamento por dia (RF019) */
  gerarPDFDiario(): void {
    const dados = this.obterSolicitacoesFiltradas(true);
    const mapa = new Map<string, number>();

    dados.forEach(s => {
      const dia = new Date(s.dataHoraPagamento!).toLocaleDateString('pt-BR');
      const prev = mapa.get(dia) || 0;
      mapa.set(dia, prev + (s.valorOrcamento || 0));
    });

    const body = Array.from(mapa.entries())
      .map(([data, total]) => [data, total.toFixed(2)]);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Receitas por Dia', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Data', 'Total (R$)']],
      body
    });
    doc.save('relatorio-receitas-dia.pdf');
  }

  /** Gera PDF com agrupamento por categoria desde sempre (RF020) */
  gerarPDFCategoria(): void {
    // Sempre considera todas as solicitações pagas, ignorando filtro de data
    const todas = this.obterSolicitacoesFiltradas(false);
    const mapaCat = new Map<string, number>();

    todas.forEach(s => {
      const cat = s.categoriaEquipamento;
      const prev = mapaCat.get(cat) || 0;
      mapaCat.set(cat, prev + (s.valorOrcamento || 0));
    });

    const body = Array.from(mapaCat.entries())
      .map(([categoria, total]) => [categoria, total.toFixed(2)]);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Receitas por Categoria', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Categoria', 'Receita (R$)']],
      body
    });
    doc.save('relatorio-receitas-categoria.pdf');
  }
}