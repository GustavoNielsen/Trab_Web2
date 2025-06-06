// src/app/shared/services/solicitacao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitacao } from '../models/solicitacao';
import { Historicosolicitacao } from '../models/historicosolicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private baseUrl = 'http://localhost:8080/api/solicitacoes';

  constructor(private http: HttpClient) { }


  inserir(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.baseUrl, solicitacao);
  }

  listarTodas(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.baseUrl);
  }

  listarPorCliente(cpf: string): Observable<Solicitacao[]> {
    const url = `${this.baseUrl}/cliente/${cpf}`;
    return this.http.get<Solicitacao[]>(url);
  }

  listarPorFuncionario(idFuncionario: number): Observable<Solicitacao[]> {
    const url = `${this.baseUrl}/funcionario/${idFuncionario}`;
    return this.http.get<Solicitacao[]>(url);
  }

  registrarOrcamento(id: number, valor: number, observacoes: string): Observable<void> {
    const url = `${this.baseUrl}/${id}/orcamento`;
    return this.http.patch<void>(url, { valor, observacoes });
  }


  registrarPagamento(id: number, valor: number, observacoes: string): Observable<void> {
    const url = `${this.baseUrl}/${id}/pagamento`;
    return this.http.patch<void>(url, { valor, observacoes });
  }

 
  resgatarServico(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/resgatar`;
    return this.http.patch<void>(url, null);
  }

  redirecionarManutencao(id: number, novoFuncionario: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/redirecionar`;
    const params = new HttpParams().set('novoFuncionario', novoFuncionario.toString());
    return this.http.patch<void>(url, null, { params });
  }

  finalizarSolicitacao(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/finalizar`;
    return this.http.patch<void>(url, null);
  }
}
