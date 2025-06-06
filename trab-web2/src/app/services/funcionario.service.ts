import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Solicitacao } from '../shared/models/solicitacao';

const LS_CHAVE = "funcionarios";
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'http://localhost:8080/api/funcionarios';
  private funcionarios: Funcionario[] = []; 
  private dataNascimento: string =''
  public idLogado: string = '';

  constructor(private http: HttpClient) { }

  set dataNascimentoLogado(dataNascimento: string) {
    this.idLogado = dataNascimento;
  }


  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl);
  }
  
  buscarPorCpf(cpf: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.get<Funcionario>(url);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario);
  }

  remover(cpf: string): Observable<void> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.delete<void>(url);
  }

  atualizar(cpf: string, funcionario: Funcionario): Observable<Funcionario> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.put<Funcionario>(url, funcionario);
  }


        buscarPorId(id: string): Funcionario | undefined {
          return this.listarTodos().find(f => f.dataNascimento === id);
        }
}