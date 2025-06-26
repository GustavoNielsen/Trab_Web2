import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao';
import { Historicosolicitacao } from '../shared/models/historicosolicitacao';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError, map as rxMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FuncionarioService } from './funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly BASE = 'http://localhost:8080/solicitacoes';
  private readonly STORAGE_KEY = 'solicitacoes';  // agora só para compatibilidade, não usado
  private httpOpts = {
    observe: 'response' as const,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,     private funcionarioService: FuncionarioService ) {}

  listarTodos(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.BASE, this.httpOpts).pipe(
      map(r => r.status === 200 ? r.body || [] : []),
      catchError(err => err.status === 404 ? of([]) : throwError(() => err))
    );
  }

  recuperarSolicitacoes(): Solicitacao[] {
    // permanece para compatibilidade, mas delega ao HTTP síncrono:
    let result: Solicitacao[] = [];
    this.listarTodos().subscribe(list => result = list, () => result = []);
    return result;
  }

  private salvarSolicitacoes(_: Solicitacao[]): void {
    // não faz nada, só para manter o método
  }

listarSolicitacoesPorCpf(cpf: string): Observable<Solicitacao[]> {
  return this.http
    .get<Solicitacao[]>(
      `${this.BASE}/cliente/${encodeURIComponent(cpf)}`,
      this.httpOpts
    )
    .pipe(
      map(r => (r.status === 200 ? r.body || [] : [])),
      catchError(() => of([]))
    );
}

  listarSolicitacoesPorId(id: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.BASE}?funcionarioId=${encodeURIComponent(id)}`, this.httpOpts).pipe(
      map(r => r.status === 200 ? r.body || [] : []),
      catchError(() => of([]))
    );
  }

  listarSolicitacoesPorEstado(estado: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.BASE}?estado=${encodeURIComponent(estado)}`, this.httpOpts).pipe(
      map(r => r.status === 200 ? r.body || [] : []),
      catchError(() => of([]))
    );
  }

adicionarSolicitacao(solicitacao: Solicitacao): void {
  // monta o payload injetando o id do funcionário logado
  const payload: Solicitacao = {
    ...solicitacao,
    idFuncionario: this.funcionarioService.idLogado
  };

  this.http
    .post<Solicitacao>(
      this.BASE,
      JSON.stringify(payload),
      this.httpOpts
    )
    .subscribe({
      next: () => {
        // opcional: aqui você poderia emitir um evento, exibir toast, etc.
      },
      error: err => {
        console.error('Falha ao criar solicitação:', err);
      }
    });
}

  buscarSolicitacaoPorDataHora(dataHora: string): Observable<Solicitacao | null> {
    return this.http.get<Solicitacao>(`${this.BASE}/${dataHora}`, this.httpOpts).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(err => err.status === 404 ? of(null) : throwError(() => err))
    );
  }

  registrarOrcamento(
    dataHora: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): Observable<Solicitacao | null> {
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/orcamento`,
      JSON.stringify({ valor, observacoes, funcionarioId }),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(err => throwError(() => err))
    );
  }

  registrarPagamento(
    dataHora: string,
    observacoes: string,
    funcionarioId: string
  ): Observable<Solicitacao | null> {
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/pagamento`,
      JSON.stringify({ observacoes, funcionarioId }),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(err => throwError(() => err))
    );
  }

  resgatarSolicitacao(
    dataHora: string,
    observacoes: string
  ): Observable<Solicitacao | null> {
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/resgatar`,
      JSON.stringify({ observacoes }),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(() => of(null))
    );
  }

  efetuarManutencao(
    dataHora: string,
    dto: { descricaoManutencao: string; orientacaoCliente: string; funcionarioId: string; }
  ): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/manutencao`,
      JSON.stringify(dto),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body! : null!),
      catchError(err => throwError(() => err))
    );
  }

  redirecionarManutencao(
    dataHora: string,
    novoFuncionarioId: string
  ): Observable<Solicitacao | null> {
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/redirecionar`,
      JSON.stringify({ novoFuncionarioId }),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(err => throwError(() => err))
    );
  }

 finalizarSolicitacao(
    dataHora: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): Observable<Solicitacao | null> {
    const body = { valor, observacoes, funcionarioId };
    return this.http.post<Solicitacao>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/finalizar`,
      JSON.stringify(body),
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body : null),
      catchError(err => throwError(() => err))
    );
  }


adicionarHistorico(
  dataHora: string,
  payload: { tipoEvento: string; funcionarioId: string; observacoes: string; }
): Observable<Historicosolicitacao | null> {
  return this.http.post<Historicosolicitacao>(
    `${this.BASE}/${encodeURIComponent(dataHora)}/historico`,
    JSON.stringify(payload),
    this.httpOpts
  ).pipe(
    map(r => r.status === 200 ? r.body : null),
    catchError(err => throwError(() => err))
  );
}


// dentro de SolicitacaoService
  listarHistorico(dataHora: string): Observable<Historicosolicitacao[]> {
    return this.http.get<Historicosolicitacao[]>(
      `${this.BASE}/${encodeURIComponent(dataHora)}/historico`,
      this.httpOpts
    ).pipe(
      map(r => r.status === 200 ? r.body || [] : []),
      catchError(err => err.status === 404 ? of([]) : throwError(() => err))
    );
  }

  aprovarSolicitacao(
  dataHora: string,
  funcionarioId: string,
  observacoes: string
): Observable<Solicitacao|null> {
  return this.http.post<Solicitacao>(
    `${this.BASE}/${encodeURIComponent(dataHora)}/aprovar`,
    JSON.stringify({ funcionarioId, observacoes }),
    this.httpOpts
  ).pipe(
    map(r => r.status === 200 ? r.body : null),
    catchError(err => throwError(() => err))
  );
}

rejeitarSolicitacao(
  dataHora: string,
  funcionarioId: string,
  observacoes: string
): Observable<Solicitacao|null> {
  return this.http.post<Solicitacao>(
    `${this.BASE}/${encodeURIComponent(dataHora)}/rejeitar`,
    JSON.stringify({ funcionarioId, observacoes }),
    this.httpOpts
  ).pipe(
    map(r => r.status === 200 ? r.body : null),
    catchError(err => throwError(() => err))
  );
}

  /**
   * RF013 – Visualização de solicitações:
   * ∘ filtra por hoje / período / todas
   * ∘ ordena por data/hora crescente
   * ∘ só inclui REDIRECIONADA se for para este funcionário
   */
listarParaVisualizacao(
  filtroTipo: 'hoje' | 'periodo' | 'todas',
  dataInicio?: string,
  dataFim?: string,
  todas: Solicitacao[] = []
): Solicitacao[] {
  const idLogado = this.funcionarioService.idLogado; // ex: "2000-05-08"
  let list = [...todas];
  const hoje = new Date();

  // 1) filtra por data (se aplicável)
  if (filtroTipo === 'hoje') {
    list = list.filter(s => {
      const d = new Date(s.dataHora);
      return d.getFullYear() === hoje.getFullYear()
          && d.getMonth()    === hoje.getMonth()
          && d.getDate()     === hoje.getDate();
    });
  } else if (filtroTipo === 'periodo' && dataInicio && dataFim) {
    const inicio = new Date(`${dataInicio}T00:00:00`);
    const fim    = new Date(`${dataFim}T23:59:59.999`);
    list = list.filter(s => {
      const d = new Date(s.dataHora);
      return d >= inicio && d <= fim;
    });
  }
  // se 'todas', não tocamos list

  // 2) manter **sempre** as “abertas” (não têm idFuncionario)
  //    e **só** entregar as demais a quem foi atribuído
  list = list.filter(s => {
    // se não houve atribuição, mostra para todo mundo
    if (!s.idFuncionario) {
      return true;
    }
    // senão, só mostra para quem é o dono
    return String(s.idFuncionario) === idLogado;
  });

  // 3) ordena e retorna
  return list.sort((a, b) =>
    new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
  );
}
}
