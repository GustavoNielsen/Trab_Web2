import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente';

const LS_CHAVE = "clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = []; 
  private _cpfLogado: string = '';
  constructor() { }

  set cpfLogado(cpf: string) {
    this._cpfLogado = cpf;
  }

  get cpfLogado(): string {
    return this._cpfLogado;
  }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  buscarPorCpf(cpf: string): Observable<Cliente> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.get<Cliente>(url);
  }

  getCliente(email: string, senha: string): Cliente | undefined {
    this.clientes = this.listarTodos();
    const cliente = this.clientes.find(c => c.email === email && c.senha === senha);

    return cliente;
  }

  inserir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

    remover(cpf: string): Observable<void> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.delete<void>(url);
  }

    atualizar(cpf: string, cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.put<Cliente>(url, cliente);
  }

}