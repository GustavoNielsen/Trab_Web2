import { User } from "./user";

export class Funcionario extends User{
    constructor(
        email: string,
        senha: string,
        nome: string,
        public dataNascimento: string,
        tipo: string
    ){
        super(email, senha, nome, tipo)
    }
}
