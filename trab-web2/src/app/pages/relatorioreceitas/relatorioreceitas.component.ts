// relatorioreceitas.component.ts
import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';
import { Solicitacao } from '../../shared/models/solicitacao';

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

  /** Agora com parsing local completo */
  private obterSolicitacoesFiltradas(comFiltroData: boolean): Solicitacao[] {
    const todas = this.solicitacaoService.recuperarSolicitacoes();
    return todas.filter(s => {
      if (!s.dataHoraPagamento) return false;
      const d = new Date(s.dataHoraPagamento);

      if (comFiltroData && this.dataInicial) {
        const inicio = new Date(`${this.dataInicial}T00:00:00`);
        if (d < inicio) return false;
      }
      if (comFiltroData && this.dataFinal) {
        const fim = new Date(`${this.dataFinal}T23:59:59.999`);
        if (d > fim) return false;
      }
      return true;
    });
  }

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

  gerarPDFCategoria(): void {
    // aqui não usamos filtro de data para RF020
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
