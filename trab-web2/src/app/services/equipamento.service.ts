import { Injectable } from '@angular/core';
import { Equipamento } from '../shared/models/equipamento';

@Injectable({ providedIn: 'root' })
export class EquipamentoService {
  private key = 'equipamentos';

  listarTodos(): Equipamento[] {
    const json = localStorage.getItem(this.key);
    return json ? JSON.parse(json) : [];
  }

  buscarPorCategoria(categoria: string): Equipamento[] {
    return this.listarTodos().filter(e => e.categoria === categoria);
  }

  buscarDisponiveis(): Equipamento[] {
    return this.listarTodos().filter(e => e.disponivel);
  }

  inserir(e: Equipamento): void {
    if (this.validate(e)) {
      const list = this.listarTodos();
      list.push(e);
      this.save(list);
    }
  }

  atualizar(antiga: string, atualizado: Equipamento): void {
    const list = this.listarTodos();
    const idx = list.findIndex(e => e.categoria === antiga);
    if (idx > -1) {
      list[idx] = atualizado;
      this.save(list);
    }
  }

  remover(categoria: string): void {
    const list = this.listarTodos().filter(e => e.categoria !== categoria);
    this.save(list);
  }

  bulkInsert(items: Equipamento[]): void {
    const list = [...this.listarTodos(), ...items];
    this.save(list);
  }

  softDelete(categoria: string): void {
    const list = this.listarTodos().map(e =>
      e.categoria === categoria ? { ...e, ativo: false } : e
    );
    this.save(list);
  }

  countByCategoria(): Record<string, number> {
    return this.listarTodos().reduce((acc, e) => {
      acc[e.categoria] = (acc[e.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  exportJSON(): string {
    return JSON.stringify(this.listarTodos());
  }

  validate(e: Equipamento): boolean {
    return !!e.nome && !!e.categoria;
  }

  getCategoriasUnicas(): string[] {
    return Array.from(new Set(this.listarTodos().map(e => e.categoria)));
  }

  private save(list: Equipamento[]): void {
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
