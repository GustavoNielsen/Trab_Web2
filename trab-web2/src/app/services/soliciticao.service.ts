import { Injectable } from '@angular/core';
import { Solicitacao } from '../shared/models/solicitacao';
import { Historicosolicitacao } from '../shared/models/historicosolicitacao';
import { FuncionarioService } from './funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly STORAGE_KEY = 'solicitacoes';

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  recuperarSolicitacoes(): Solicitacao[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) as Solicitacao[] : [];
  }

  private salvarSolicitacoes(solicitacoes: Solicitacao[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(solicitacoes));
  }

  listarSolicitacoesPorCpf(cpf: string): Solicitacao[] {
    return this.recuperarSolicitacoes()
      .filter(s => s.cpfCliente === cpf);
  }

  listarSolicitacoesPorId(id: string): Solicitacao[] {
    return this.recuperarSolicitacoes()
      .filter(s => s.idFuncionario === id);
  }

  listarSolicitacoesPorEstado(estado: string): Solicitacao[] {
    return this.recuperarSolicitacoes()
      .filter(s => s.estado === estado);
  }

  adicionarSolicitacao(solicitacao: Solicitacao): void {
    const lista = this.recuperarSolicitacoes();
    lista.push(solicitacao);
    this.salvarSolicitacoes(lista);
  }

  buscarSolicitacaoPorDataHora(dataHoraParam: string): Solicitacao | undefined {
    return this.recuperarSolicitacoes()
      .find(s => new Date(s.dataHora).toISOString() === dataHoraParam);
  }

  registrarOrcamento(
    dataHoraParam: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): void {
    const agora = new Date().toISOString();
    const lista = this.recuperarSolicitacoes();
    const idx = lista.findIndex(s => new Date(s.dataHora).toISOString() === dataHoraParam);
    if (idx === -1) return;

    const s = lista[idx];
    s.valorOrcamento = valor;
    s.observacoesOrcamento = observacoes;
    s.dataHoraOrcamento = agora;
    s.idFuncionario = funcionarioId;
    s.estado = 'Orçada';

    s.historicoSolicitacao.push(
      new Historicosolicitacao(agora, 'Orçada', s.idFuncionario, 'Solicitação orçada')
    );

    this.salvarSolicitacoes(lista);
  }

  registrarPagamento(
    dataHoraParam: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): void {
    const lista = this.recuperarSolicitacoes();
    const idx = lista.findIndex(s => new Date(s.dataHora).toISOString() === dataHoraParam);
    if (idx === -1) return;

    const s = lista[idx];
    const agora = new Date().toISOString();
    s.estado = 'Paga';
    s.dataHoraPagamento = agora;
    s.historicoSolicitacao.push(
      new Historicosolicitacao(agora, 'Paga', funcionarioId, observacoes)
    );

    this.salvarSolicitacoes(lista);
  }

  resgatarSolicitacao(
    dataHoraParam: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): void {
    const lista = this.recuperarSolicitacoes();
    const idx = lista.findIndex(s => new Date(s.dataHora).toISOString() === dataHoraParam);
    if (idx === -1) return;

    const s = lista[idx];
    s.estado = 'Aprovada';
    s.horarioAprovacao = new Date().toISOString();
    s.historicoSolicitacao.push(
      new Historicosolicitacao(s.horarioAprovacao!, 'Aprovada', funcionarioId, observacoes)
    );

    this.salvarSolicitacoes(lista);
  }

  redirecionarManutencao(
    dataHoraParam: string,
    novoIdFuncionario: string
  ): void {
    const lista = this.recuperarSolicitacoes();
    const idx = lista.findIndex(s => new Date(s.dataHora).toISOString() === dataHoraParam);
    if (idx === -1) {
      throw new Error('Solicitação não encontrada.');
    }

    const s = lista[idx];
    const agora = new Date().toISOString();
    s.idFuncionario = novoIdFuncionario;
    s.estado = 'Redirecionada';
    s.dataHoraRedirecionada = agora;
    s.historicoSolicitacao.push(
      new Historicosolicitacao(agora, 'Redirecionada', novoIdFuncionario, s.observacoesOrcamento || '')
    );

    this.salvarSolicitacoes(lista);
  }

  finalizarSolicitacao(
    dataHoraParam: string,
    valor: number,
    observacoes: string,
    funcionarioId: string
  ): void {
    const lista = this.recuperarSolicitacoes();
    const idx = lista.findIndex(s => new Date(s.dataHora).toISOString() === dataHoraParam);
    if (idx === -1) return;

    const s = lista[idx];
    const agora = new Date().toISOString();
    s.estado = 'Finalizada';
    s.dataHoraFinalizada = agora;
    s.historicoSolicitacao.push(
      new Historicosolicitacao(agora, 'Finalizada', funcionarioId, observacoes)
    );

    this.salvarSolicitacoes(lista);
  }

  /**
   * RF013 – Visualização de solicitações:
   * ∘ filtra por hoje / período / todas
   * ∘ ordena por data/hora crescente
   * ∘ só inclui REDIRECIONADA se for para este funcionário
   */
  listarParaVisualizacao(
    funcionarioId: string,
    filtroTipo: 'hoje' | 'periodo' | 'todas',
    dataInicio?: string,
    dataFim?: string
  ): Solicitacao[] {
    let list = this.recuperarSolicitacoes();
    const hoje = new Date();

    // filtrar por data
    if (filtroTipo === 'hoje') {
      list = list.filter(s => {
        const d = new Date(s.dataHora);
        return d.getFullYear() === hoje.getFullYear()
            && d.getMonth()    === hoje.getMonth()
            && d.getDate()     === hoje.getDate();
      });
    } else if (filtroTipo === 'periodo' && dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      const fim    = new Date(dataFim);
      list = list.filter(s => {
        const d = new Date(s.dataHora);
        return d >= inicio && d <= fim;
      });
    }
    // filtroTipo === 'todas' → não altera

    // aplicar regra RF013
    list = list.filter(s =>
      s.estado !== 'Redirecionada'
      || s.idFuncionario === funcionarioId
    );

    // ordenar por data/hora crescente
    list.sort((a, b) =>
      new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );

    return list;
  }
}
