export class Cliente {
    constructor(
      public cpf: string,
      public nome: string,
      public email: string,
      public cep: string,
      public rua: string,
      public numero: string,
      public complemento: string,
      public bairro: string,
      public cidade: string,
      public estado: string,
      public telefone: string
    ) {}
  }
  