import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true, // Garante que o componente seja standalone
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule], // Adiciona os módulos necessários para standalone
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  isLoading = false; // Adiciona um estado de carregamento para feedback visual

  constructor(
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) {}

  /**
   * CORRIGIDO: O método agora lida com o fluxo assíncrono dos serviços.
   */
  logar(): void {
    if (this.isLoading) {
      return; // Previne múltiplos cliques enquanto uma requisição está em andamento
    }
    this.isLoading = true;

    // 1. Tenta fazer login como Funcionário primeiro
    this.funcionarioService.buscarPorCredenciais(this.email, this.senha)
      .pipe(
        // `finalize` garante que o `isLoading` será desativado ao final da operação,
        // seja com sucesso ou erro.
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (funcionario) => {
          if (funcionario) {
            // SUCESSO COMO FUNCIONÁRIO
            console.log('Login como funcionário bem-sucedido:', funcionario);
            this.funcionarioService.simularLogin(funcionario.id!); // Usa o método do serviço para "logar"
            this.router.navigate(['/paginainicialfuncionario']);
          } else {
            // 2. Se não for funcionário, tenta fazer login como Cliente
            this.logarComoCliente();
          }
        },
        error: (err) => {
          console.error('Erro na API ao buscar funcionário:', err);
          alert('Ocorreu uma falha na comunicação com o servidor. Tente novamente.');
        }
      });
  }

  /**
   * Método auxiliar para tentar o login como cliente.
   * É chamado apenas se o login como funcionário não for bem-sucedido.
   */
  private logarComoCliente(): void {
    this.isLoading = true;
    // Assumindo que ClienteService também tem um método `buscarPorCredenciais`
    this.clienteService.buscarPorCredenciais(this.email, this.senha)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (cliente) => {
          if (cliente) {
            // SUCESSO COMO CLIENTE
            console.log('Login como cliente bem-sucedido:', cliente);
            this.clienteService.cpfLogado = cliente.cpf; // Define o cliente logado no serviço
            this.router.navigate(['/paginainicialcliente']);
          } else {
            // FALHA FINAL: Não é funcionário nem cliente
            alert('Email ou senha inválidos!');
          }
        },
        error: (err) => {
          console.error('Erro na API ao buscar cliente:', err);
          alert('Ocorreu uma falha na comunicação com o servidor. Tente novamente.');
        }
    });
  }

  irParaCadastro(): void {
    this.router.navigate(['/autocadastro']);
  }
}
