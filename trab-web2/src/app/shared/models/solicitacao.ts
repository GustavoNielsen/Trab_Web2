import { Historicosolicitacao } from "./historicosolicitacao";

export class Solicitacao {
  // 1. PROPRIEDADES DECLARADAS EXPLICITAMENTE
  // O ID é a chave primária do backend, opcional na criação.
  public id?: number;

  // Propriedades essenciais, definidas na criação
  public dataHora: string;
  public descricaoEquipamento: string;
  public categoriaEquipamento: string;
  public descricaoDefeito: string;
  public estado: string;
  public cpfCliente: string;
  public idFuncionario: string; // ID do funcionário que recebeu a solicitação
  public historicoSolicitacao: Historicosolicitacao[];

  // Propriedades do Orçamento (opcionais)
  public valorOrcamento?: number;
  public dataHoraOrcamento?: string;
  public funcionarioOrcamentoId?: string;
  public observacoesOrcamento?: string;
  public horarioAprovacao?: string;
  public motivoRecusa?: string;

  // Propriedades da Manutenção (opcionais)
  public descricaoManutencao?: string;
  public orientacaoCliente?: string;
  public dataHoraManutencao?: string;
  public dataHoraRedirecionada?: string;

  // Propriedades de Finalização (opcionais)
  public dataHoraPagamento?: string;
  public dataHoraFinalizada?: string;
  static id: any;


  /**
   * 2. CONSTRUTOR SIMPLIFICADO
   * Agora, ele requer apenas os dados necessários para abrir um novo chamado.
   */
  constructor(
    // Parâmetros mínimos para uma nova solicitação
    cpfCliente: string,
    descricaoEquipamento: string,
    categoriaEquipamento: string,
    descricaoDefeito: string,
    idFuncionarioInicial: string,
  ) {
    // 3. INICIALIZAÇÃO DE VALORES PADRÃO
    this.cpfCliente = cpfCliente;
    this.descricaoEquipamento = descricaoEquipamento;
    this.categoriaEquipamento = categoriaEquipamento;
    this.descricaoDefeito = descricaoDefeito;
    this.idFuncionario = idFuncionarioInicial;

    this.dataHora = new Date().toISOString();
    this.estado = 'Pendente'; // Estado inicial padrão
    this.historicoSolicitacao = [];
  }
}
