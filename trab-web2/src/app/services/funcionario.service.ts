import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Funcionario } from '../shared/models/funcionario';
import { Solicitacao } from '../shared/models/solicitacao';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'http://localhost:8080/api/funcionarios';
  private funcionarios$!: Observable<Funcionario[]>;
  private cacheTTL = 300000; // 5 minutos
  private lastFetch = 0;

  private loggedInSubject = new BehaviorSubject<Funcionario | null>(null);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('logged_funcionario');
    if (stored) {
      this.loggedInSubject.next(JSON.parse(stored));
    }
  }

  listarTodos(): Observable<Funcionario[]> {
    const now = Date.now();
    if (!this.funcionarios$ || (now - this.lastFetch) > this.cacheTTL) {
      this.funcionarios$ = this.http.get<Funcionario[]>(this.baseUrl).pipe(
        tap(() => this.lastFetch = now),
        shareReplay(1),
        catchError(err => {
          console.error('Erro ao listar funcionários', err);
          return throwError(() => new Error('Falha ao carregar funcionários'));
        })
      );
    }
    return this.funcionarios$;
  }

  buscarPorCpf(cpf: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${cpf}`).pipe(
      catchError(err => {
        console.error(`Erro ao buscar CPF: ${cpf}`, err);
        return throwError(() => new Error('Funcionário não encontrado'));
      })
    );
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  atualizar(cpf: string, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.baseUrl}/${cpf}`, funcionario).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  remover(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cpf}`).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  login(cpf: string, senha: string): Observable<Funcionario> {
    return this.buscarPorCpf(cpf).pipe(
      tap(func => {
        if (func.senha === senha) {
          this.loggedInSubject.next(func);
          localStorage.setItem('logged_funcionario', JSON.stringify(func));
        } else {
          throw new Error('Credenciais inválidas');
        }
      })
    );
  }

  logout(): void {
    this.loggedInSubject.next(null);
    localStorage.removeItem('logged_funcionario');
  }

  buscarSolicitacoes(cpf: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.baseUrl}/${cpf}/solicitacoes`);
  }

  private clearCache() {
    this.funcionarios$ = null as any;
  }

  private handleError(err: any) {
    console.error('Erro HTTP', err);
    return throwError(() => new Error(err.message || 'Erro desconhecido'));
  }
}
