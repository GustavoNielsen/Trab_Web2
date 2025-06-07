// src/app/shared/services/solicitacao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Solicitacao } from '../shared/models';
import { Historicosolicitacao } from '../shared/models';

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

 redirecionarManutencao(dataHoraISO: string, novoFuncionarioId: string): Observable<void> {
    const solicitacao = this.buscarSolicitacaoPorDataHora(dataHoraISO);
    if (solicitacao) {
      solicitacao.idFuncionario = novoFuncionarioId;
      solicitacao.estado = 'Redirecionada'; 
      this.atualizar(solicitacao);
    }
    return of(undefined); // Sinaliza que a operação terminou
  }

  finalizarSolicitacao(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/finalizar`;
    return this.http.patch<void>(url, null);
  }

  recuperarSolicitacoes(): Solicitacao[] {
    const data = localStorage.getItem('solicitacoes');
    return data ? JSON.parse(data) : [];
  }
  
  buscarSolicitacaoPorDataHora(dataHoraISO: string): Solicitacao | undefined {
    const solicitacoes = this.recuperarSolicitacoes();
    return solicitacoes.find(s => s.dataHora === dataHoraISO);
  }

  atualizar(solicitacaoAtualizada: Solicitacao): Observable<Solicitacao> {
    const solicitacoes = this.recuperarSolicitacoes();
    const index = solicitacoes.findIndex(s => s.dataHora === solicitacaoAtualizada.dataHora);
    
    if (index !== -1) {
      solicitacoes[index] = solicitacaoAtualizada;
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
    }
    return of(solicitacaoAtualizada);
  }

  
}
