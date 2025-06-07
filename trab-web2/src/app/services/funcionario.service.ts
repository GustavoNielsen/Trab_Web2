import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importe o operador 'map'

import { Funcionario } from '../shared/models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly baseUrl = 'http://localhost:3000/funcionarios';

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public idLogado: string | null = null;

  constructor(private http: HttpClient) {
    // Para fins de exemplo, definimos um ID de funcionário logado.
    // Substitua '1' pelo ID de um funcionário que exista no seu db.json.
    this.simularLogin('1');
  }

  public simularLogin(id: string): void {
    this.idLogado = id;
    console.log(`Funcionário com ID: ${id} foi logado.`);
  }

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl);
  }

  /**
   * MÉTODO REATORADO: Busca um funcionário pelas suas credenciais (email e senha).
   * O método agora é assíncrono e retorna um Observable com o funcionário encontrado ou undefined.
   * @param email O email do funcionário.
   * @param senha A senha do funcionário.
   * @returns Observable<Funcionario | undefined>
   */
  buscarPorCredenciais(email: string, senha: string): Observable<Funcionario | undefined> {
    return this.listarTodos().pipe(
      // O operador 'map' transforma o array de funcionários emitido pelo Observable.
      map(funcionarios => 
        // O método 'find' é executado DENTRO do fluxo, após os dados chegarem.
        funcionarios.find(f => f.email === email && f.senha === senha)
      )
    );
  }

  buscarPorId(id: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Funcionario>(url);
  }

  // Se o CPF for usado como ID no seu backend, este método está correto.
  buscarPorCpf(cpf: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/${cpf}`;
    return this.http.get<Funcionario>(url);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario, this.httpOptions);
  }

  atualizar(id: string, funcionario: Funcionario): Observable<Funcionario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Funcionario>(url, funcionario, this.httpOptions);
  }

  remover(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
