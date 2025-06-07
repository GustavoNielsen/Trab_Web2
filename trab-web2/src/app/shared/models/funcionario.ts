// Em: src/app/shared/models/funcionario.ts

import { User } from "./user";

export class Funcionario extends User {

    // 1. Declare o 'id' aqui, como uma propriedade pública e opcional.
    public id?: string;

    // 2. Mantenha seu construtor exatamente como era ANTES.
    constructor(
        email: string,
        senha: string,
        nome: string,
        public dataNascimento: string,
        tipo: string = 'funcionario'
    ) {
        super(email, senha, nome, tipo);
    }
}