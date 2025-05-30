import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViaCep } from '../shared/models/via-cep';

const LS_CHAVE = "clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = []; 
  private _cpfLogado: string = '';
  private url_API = 'https://viacep.com.br/ws/';
  viacep!: ViaCep;

  constructor(private http: HttpClient) { }

  set cpfLogado(cpf: string) {
    this._cpfLogado = cpf;
  }

  get cpfLogado(): string {
    return this._cpfLogado;
  }

  listarTodos(): Cliente[] {
    const clientes = localStorage.getItem(LS_CHAVE);
    return clientes ? JSON.parse(clientes) : [];
  }

  getCliente(email: string, senha: string): Cliente | undefined {
    this.clientes = this.listarTodos();
    const cliente = this.clientes.find(c => c.email === email && c.senha === senha);

    return cliente;
  }

  inserir(cliente: Cliente): void {
    cliente.id = new Date().getTime();
    const clientes = this.listarTodos();
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

  viaCep(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.url_API}${cep}/json`);
  }
}
