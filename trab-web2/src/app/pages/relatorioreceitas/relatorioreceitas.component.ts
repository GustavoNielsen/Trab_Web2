import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";

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

  atualizarRelatorio(): void {
    const todas = this.solicitacaoService.recuperarSolicitacoes();
    const filtradas = todas.filter(s => {
      if (!s.dataHoraPagamento) return false;
      const dt = new Date(s.dataHoraPagamento);
      if (this.dataInicial) {
        const start = new Date(this.dataInicial);
        if (dt < start) return false;
      }
      if (this.dataFinal) {
        const end = new Date(this.dataFinal);
        end.setHours(23,59,59,999);
        if (dt > end) return false;
      }
      return true;
    });

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

  gerarPDFCategoria(): void {
    // Filtra e agrupa por categoria dentro do período
    const todas = this.solicitacaoService.recuperarSolicitacoes()
      .filter(s => s.dataHoraPagamento)
      .filter(s => {
        const dt = new Date(s.dataHoraPagamento!);
        if (this.dataInicial) {
          const start = new Date(this.dataInicial);
          if (dt < start) return false;
        }
        if (this.dataFinal) {
          const end = new Date(this.dataFinal);
          end.setHours(23,59,59,999);
          if (dt > end) return false;
        }
        return true;
      });

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