// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) {}

  logar(): void {
    const funcionario = this.funcionarioService.getFuncionario(this.email, this.senha);
    const cliente = this.clienteService.getCliente(this.email, this.senha);

    if (funcionario) {
      this.funcionarioService.dataNascimentoLogado = funcionario.dataNascimento
      console.log(funcionario.dataNascimento)
      console.log(this.funcionarioService.idLogado)
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    else if (cliente) { 
      this.clienteService.cpfLogado = cliente.cpf;
      this.router.navigate(['/paginainicialcliente']);
    } else {
      alert('Email ou senha inválidos!');
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/autocadastro']);
  }
}
