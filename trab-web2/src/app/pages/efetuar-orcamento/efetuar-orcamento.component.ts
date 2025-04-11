import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EfetuarOrcamentoService, Servico } from '../../services';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent {
  novoServico: string = '';
  novoValor: string = '';
  servicos: Servico[] = [];
  total: number = 0;

  constructor(private orcamentoService: EfetuarOrcamentoService) {}

  adicionarServico() {
    const nome = this.novoServico.trim();
    const valor = parseFloat(this.novoValor.replace(',', '.'));

    if (!nome || isNaN(valor) || valor <= 0) {
      alert('Por favor, preencha os campos corretamente.');
      return;
    }

    this.orcamentoService.adicionarServico(nome, valor);
    this.atualizarLista();

    this.novoServico = '';
    this.novoValor = '';
  }

  removerServico(index: number) {
    this.orcamentoService.removerServico(index);
    this.atualizarLista();
  }  

  atualizarLista() {
    this.servicos = this.orcamentoService.obterServicos();
    this.total = this.orcamentoService.calcularTotal();
  }

  finalizarOrcamento() {
    alert(`Orçamento finalizado com sucesso! Total: R$ ${this.total.toFixed(2).replace('.', ',')}`);
  }  
}