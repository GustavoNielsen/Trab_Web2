import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly BASE_URL = 'http://localhost:8080';
  
  private httpOptions = {
    observe: 'response' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private _cpfLogado = '';
  set cpfLogado(cpf: string) { this._cpfLogado = cpf; }
  get cpfLogado(): string { return this._cpfLogado; }

  constructor(private http: HttpClient) {}

  /** GET /clientes **/
  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `${this.BASE_URL}/clientes`,
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Cliente[]>) => resp.status === 200 ? resp.body || [] : []),
      catchError(err => {
        if (err.status === 404) return of([]);
        return throwError(() => err);
      })
    );
  }

  /** POST /login **/
  getCliente(email: string, senha: string): Observable<Cliente | null> {
    const body = { login: email, senha };
    return this.http.post<Cliente>(
      `${this.BASE_URL}/login`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Cliente>) => resp.status === 200 ? resp.body : null),
      catchError(err => {
        if (err.status === 401) return of(null);
        return throwError(() => err);
      })
    );
  }

  /** POST /clientes **/
  inserir(cliente: Cliente): Observable<Cliente | null> {
    return this.http.post<Cliente>(
      `${this.BASE_URL}/clientes`,
      JSON.stringify(cliente),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Cliente>) => resp.status === 200 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }

  /** PUT /clientes/{id} **/
  atualizar(cliente: Cliente): Observable<Cliente | null> {
    return this.http.put<Cliente>(
      `${this.BASE_URL}/clientes/${cliente.cpf}`,
      JSON.stringify(cliente),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Cliente>) => resp.status === 200 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }

  /** DELETE /clientes/{id} **/
  remover(id: number): Observable<Cliente | null> {
    return this.http.delete<Cliente>(
      `${this.BASE_URL}/clientes/${id}`,
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Cliente>) => resp.status === 200 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }

  /** Busca cliente por CPF (filtra o resultado de listarTodos) **/
  buscarPorcpf(cpf: string): Observable<Cliente | null> {
    return this.listarTodos().pipe(
      map(clientes => clientes.find(c => c.cpf === cpf) || null)
    );
  }
}
