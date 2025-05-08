import { Injectable } from '@angular/core';
import { Equipamento } from '../shared/models/equipamento';

const LS_CHAVE = 'equipamentos'

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor() { }

  listarTodos(): Equipamento[] {
      const equipamentos = localStorage.getItem(LS_CHAVE);
      return equipamentos ? JSON.parse(equipamentos) : [];
    }


  inserir(equipamento: Equipamento): void {
          const equipamentos = this.listarTodos();
          equipamentos.push(equipamento);
          localStorage.setItem(LS_CHAVE, JSON.stringify(equipamentos));
        }

  remover(categoria: string): void {
    let equipamentos = this.listarTodos();
    equipamentos = equipamentos.filter(equipamento => equipamento.categoria !== categoria);
    localStorage.setItem(LS_CHAVE, JSON.stringify(equipamentos));
  }

  atualizar(categoriaAntiga: string, equipamentoAtualizado: Equipamento): void {
    const equipamentos = this.listarTodos();
    const idx = equipamentos.findIndex(eq => eq.categoria === categoriaAntiga);
    if (idx !== -1) {
      equipamentos[idx] = equipamentoAtualizado;
      localStorage.setItem(LS_CHAVE, JSON.stringify(equipamentos));
    }
  }
}
