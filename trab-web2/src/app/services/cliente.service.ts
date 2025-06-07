import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViaCep } from '../shared/models/via-cep';
import { map } from 'rxjs/operators'; // IMPORTANTE: Importar o operador 'map'

const LS_CHAVE = "clientes"; // Esta constante não está sendo usada. Pode remover se não for usar Local Storage.

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // NOVO: Definir a URL base da sua API para clientes
  private readonly baseUrl = 'http://localhost:3000/clientes';
  
  // URL da API ViaCep permanece a mesma
  private url_API = 'https://viacep.com.br/ws/';
  
  private _cpfLogado: string = '';

  constructor(private http: HttpClient) { }

  set cpfLogado(cpf: string) {
    this._cpfLogado = cpf;
  }

  get cpfLogado(): string {
    return this._cpfLogado;
  }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }
  
  // IMPORTANTE: Seus métodos de busca/remoção/atualização usam o CPF na URL.
  // Isso só funciona porque no db.json fizemos o "id" ser igual ao "cpf".
  buscarPorCpf(cpf: string): Observable<Cliente> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.get<Cliente>(url);
  }

  // CORRIGIDO: Este método agora é assíncrono e retorna um Observable.
  // Renomeado para maior clareza.
  buscarPorCredenciais(email: string, senha: string): Observable<Cliente | undefined> {
    return this.listarTodos().pipe(
      map(clientes => clientes.find(c => c.email === email && c.senha === senha))
    );
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

  viaCep(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.url_API}${cep}/json`);
  }
}