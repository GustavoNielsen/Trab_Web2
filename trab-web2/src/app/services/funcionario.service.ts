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
}