import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitacao } from '../models/solicitacao.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiUrl = 'https://sua-api.com/api/servicos'; // ajuste conforme necessário

  constructor(private http: HttpClient) {}

  // Buscar uma solicitação com histórico completo
  getSolicitacaoCompleta(id: number): Observable<Solicitacao> {
    return this.http.get<Solicitacao>(`${this.apiUrl}/${id}/detalhes`);
  }
}
