import { Injectable } from '@angular/core';

export interface Servico {
  nome: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class EfetuarOrcamentoService {
  private servicos: Servico[] = [];

  adicionarServico(nome: string, valor: number) {
    this.servicos.push({ nome, valor });
  }

  obterServicos(): Servico[] {
    return [...this.servicos]; // retorna uma cópia
  }

  calcularTotal(): number {
    return this.servicos.reduce((acc, s) => acc + s.valor, 0);
  }

  removerServico(index: number) {
    this.servicos.splice(index, 1);
  }
}