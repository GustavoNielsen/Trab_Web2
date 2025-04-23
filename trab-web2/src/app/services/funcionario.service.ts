import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario';
import { Solicitacao } from '../shared/models/solicitacao';

const LS_CHAVE = "funcionarios";
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private funcionarios: Funcionario[] = []; 
  private dataNascimento: string =''
  public idLogado: string = '';

  constructor() { }

  set dataNascimentoLogado(dataNascimento: string) {
    this.idLogado = dataNascimento;
  }


  listarTodos(): Funcionario[] {
      const funcionarios = localStorage.getItem(LS_CHAVE);
      return funcionarios ? JSON.parse(funcionarios) : [];
    }
  
    getFuncionario(email: string, senha: string): Funcionario | undefined {
      this.funcionarios = this.listarTodos();
      const funcionario = this.funcionarios.find(c => c.email === email && c.senha === senha);
  
      return funcionario;
    }

     inserir(funcionario: Funcionario): void {
        const clientes = this.listarTodos();
        clientes.push(funcionario);
        localStorage.setItem(LS_CHAVE, JSON.stringify(clientes));
      }

      remover(email: string): void {
        let lista = this.listarTodos();
        lista = lista.filter(f => f.email !== email);
        localStorage.setItem(LS_CHAVE, JSON.stringify(lista));
      }

      atualizar(emailAntigo: string, funcAtualizado: Funcionario): void {
        const lista = this.listarTodos();
        const idx = lista.findIndex(f => f.email === emailAntigo);
        if (idx !== -1) {
          lista[idx] = funcAtualizado;
          localStorage.setItem(LS_CHAVE, JSON.stringify(lista));
        }
      }
}