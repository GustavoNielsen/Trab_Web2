import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente';

const LS_CHAVE = "clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor() { }

  listarTodos(): Cliente[] {
    const clientes = localStorage.getItem(LS_CHAVE);
    return clientes ? JSON.parse(clientes) : [];
  }

  inserir(cliente: Cliente): void {
    const clientes = this.listarTodos();
    // Remova ou ajuste essa linha se não for desejado sobrescrever o CPF vindo do formulário
    // cliente.cpf = '0';
    clientes.push(cliente);
    localStorage.setItem(LS_CHAVE, JSON.stringify(clientes));
  }

  buscarPorcpf(cpf: string): Cliente | undefined {
    const clientes = this.listarTodos();
    return clientes.find(cliente => cliente.cpf === cpf);
  }

  atualizar(cliente: Cliente): void {
    const clientes = this.listarTodos();
    clientes.forEach((obj, index, objs) => {
      if (cliente.cpf === obj.cpf) {
        objs[index] = cliente;
      }
    });
    localStorage.setItem(LS_CHAVE, JSON.stringify(clientes));
  }

  remover(cpf: string): void {
    let clientes = this.listarTodos();
    clientes = clientes.filter(pessoa => pessoa.cpf !== cpf);
    localStorage.setItem(LS_CHAVE, JSON.stringify(clientes));
  }
}
