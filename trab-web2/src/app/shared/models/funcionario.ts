import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario';
import { Solicitacao } from '../shared/models/solicitacao';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const LS_CHAVE = "funcionarios";
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly BASE_URL = 'http://localhost:8080/api';
  private httpOptions = {
    observe: 'response' as const,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private funcionarios: Funcionario[] = []; 
  private dataNascimento: string =''
  public idLogado: string = '';
   private _dataNascimentoLogado = '';
  set dataNascimentoLogado(dn: string) { this._dataNascimentoLogado = dn; }
  get dataNascimentoLogado(): string { return this._dataNascimentoLogado; }

  constructor(private http: HttpClient) { }



  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(
      `${this.BASE_URL}/funcionarios`,
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Funcionario[]>) => resp.status === 200 ? resp.body || [] : []),
      catchError(err => err.status === 404 ? of([]) : throwError(() => err))
    );
  }
  
 getFuncionarios(email: string, senha: string): Observable<Funcionario | null> {
    const body = { login: email, senha };
    return this.http.post<Funcionario>(
      `${this.BASE_URL}/login`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Funcionario>) => resp.status === 200 ? resp.body : null),
      catchError(err => err.status === 401 ? of(null) : throwError(() => err))
    );
  }

  inserir(func: Funcionario): Observable<Funcionario | null> {
    return this.http.post<Funcionario>(
      `${this.BASE_URL}/funcionarios`,
      JSON.stringify(func),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Funcionario>) => resp.status === 200 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }

  remover(dataNascimento: string): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}/funcionarios/${dataNascimento}`,
      this.httpOptions
    ).pipe(
      // map to void explicitly
      map(() => undefined),
      catchError(err => throwError(() => err))
    );
  }

  buscarPorId(dataNascimento: string): Observable<Funcionario | null> {
    return this.http.get<Funcionario>(
      `${this.BASE_URL}/funcionarios/${dataNascimento}`,
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Funcionario>) => resp.status === 200 ? resp.body : null),
      catchError(err => err.status === 404 ? of(null) : throwError(() => err))
    );
  }

  atualizar(func: Funcionario): Observable<Funcionario | null> {
    return this.http.put<Funcionario>(
      `${this.BASE_URL}/funcionarios/${func.dataNascimento}`,
      JSON.stringify(func),
      this.httpOptions
    ).pipe(
      map((resp: HttpResponse<Funcionario>) => resp.status === 200 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }
}
