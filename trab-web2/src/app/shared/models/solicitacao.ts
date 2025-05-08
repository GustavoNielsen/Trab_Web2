import { Historicosolicitacao } from "./historicosolicitacao";

export class Solicitacao {
    constructor(
    public dataHora: string,
    public descricaoEquipamento: string,
    public categoriaEquipamento: string,
    public descricaoDefeito: string,
    public estado: string, 
    public cpfCliente: string,
    public idFuncionario: string,
    public valorOrcamento: number,
    public dataHoraOrcamento: string,
    public funcionarioOrcamentoId: string,
    public observacoesOrcamento: string,
    public descricaoManutencao: string,
    public orientacaoCliente: string,
    public historicoSolicitacao: Historicosolicitacao[],
    public horarioAprovacao: string,
    public dataHoraManutencao: string,
    public dataHoraRedirecionada: string,
    public dataHoraFinalizada: string,
    public dataHoraPagamento: string
    )
    {}
}
