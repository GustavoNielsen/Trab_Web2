import { User } from "./user";

export class Cliente extends User{
    constructor(
      email: string,
      senha: string,
      nome: string,
      tipo: string,
      public cpf: string,
      public cep: string,
      public rua: string,
      public numero: string,
      public complemento: string,
      public bairro: string,
      public cidade: string,
      public estado: string,
      public telefone: string,
    ) {
      super(email, senha, nome, tipo)
    }
  }
  