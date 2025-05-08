export class Historicosolicitacao{
    constructor(
        public dataHora: string,
        public estado: string,
        public funcionarioId?: string,
        public observacao?: string 
    ){}
    
}
