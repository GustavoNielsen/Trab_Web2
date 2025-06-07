import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importe Observable e o operador 'of'
import { Equipamento } from '../shared/models/equipamento';

const LS_CHAVE = 'equipamentos';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor() { }

  /**
   * CORRIGIDO: Agora retorna um Observable<Equipamento[]>, mantendo a consistência.
   */
  listarTodos(): Observable<Equipamento[]> {
    const equipamentos = localStorage.getItem(LS_CHAVE);
    const lista = equipamentos ? JSON.parse(equipamentos) : [];
    // O operador 'of()' transforma o array em um Observable.
    return of(lista);
  }

  /**
   * CORRIGIDO: Retorna um Observable<void> para sinalizar a conclusão.
   */
  inserir(equipamento: Equipamento): Observable<void> {
    // Usamos .subscribe() aqui porque nosso novo listarTodos() é um Observable.
    this.listarTodos().subscribe(equipamentos => {
      equipamentos.push(equipamento);
      localStorage.setItem(LS_CHAVE, JSON.stringify(equipamentos));
    });
    return of(undefined); // Retorna um observable que completa imediatamente.
  }

  /**
   * CORRIGIDO: Retorna um Observable<void>.
   */
  remover(categoria: string): Observable<void> {
    this.listarTodos().subscribe(equipamentos => {
      const novaLista = equipamentos.filter(equipamento => equipamento.categoria !== categoria);
      localStorage.setItem(LS_CHAVE, JSON.stringify(novaLista));
    });
    return of(undefined);
  }

  /**
   * CORRIGIDO: Retorna um Observable<void>.
   */
  atualizar(categoriaAntiga: string, equipamentoAtualizado: Equipamento): Observable<void> {
    this.listarTodos().subscribe(equipamentos => {
      const idx = equipamentos.findIndex(eq => eq.categoria === categoriaAntiga);
      if (idx !== -1) {
        equipamentos[idx] = equipamentoAtualizado;
        localStorage.setItem(LS_CHAVE, JSON.stringify(equipamentos));
      }
    });
    return of(undefined);
  }
}
