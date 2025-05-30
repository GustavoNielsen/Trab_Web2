import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../shared/models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';

@Component({
  selector: 'app-cadastrofuncionario',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarFuncionarioComponent],  // importe CommonModule, FormsModule e NavbarFuncionarioComponent conforme necessário
  templateUrl: './cadastrofuncionario.component.html',
  styleUrls: ['./cadastrofuncionario.component.css']
})
export class CadastrofuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado: Funcionario | null = null;
  funcionario: Funcionario = new Funcionario('', '', '', '', 'funcionario');
  exibirFormAtualizacao = false;
  exibirConfirmacaoRemocao = false;
  isLoading = false;
  
  // Standardized variable names
  originalEmail = '';
  originalNome = '';
  originalData = '';
  originalSenha = '';
  emailParaEdicao = '';
  nomeParaEdicao = '';
  dataNascimentoParaEdicao = '';
  senhaParaEdicao = '';

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  private refreshList(): void {
    this.funcionarios = this.funcionarioService.listarTodos();
  }

  inserir(): void {
    if (!this.validarEmail(this.funcionario.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    if (!this.validarDataNascimento(this.funcionario.dataNascimento)) {
      alert('Por favor, insira uma data válida no formato DD/MM/AAAA.');
      return;
    }

    try {
      this.isLoading = true;
      this.funcionarioService.inserir(this.funcionario);
      alert('Funcionário cadastrado com sucesso!');
      this.limparFormulario();
      this.refreshList();
    } catch (error) {
      alert('Erro ao cadastrar funcionário. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

  selecionar(f: Funcionario): void {
    this.funcionarioSelecionado = f;
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }


  abrirAtualizacao(): void {
    if (this.funcionarioSelecionado) {
      this.originalEmail = this.funcionarioSelecionado.email;
      this.originalNome = this.funcionarioSelecionado.nome;
      this.originalData = this.funcionarioSelecionado.dataNascimento;
      this.originalSenha = this.funcionarioSelecionado.senha;
      this.emailParaEdicao = this.originalEmail;
      this.nomeParaEdicao = this.originalNome;
      this.dataNascimentoParaEdicao = this.originalData;
      this.senhaParaEdicao = this.originalSenha;
      this.exibirFormAtualizacao = true;
    }
  }

  atualizar(): void {
    if (!this.funcionarioSelecionado) return;
    
    if (!this.validarEmail(this.emailParaEdicao)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    if (!this.validarDataNascimento(this.dataNascimentoParaEdicao)) {
      alert('Por favor, insira uma data válida no formato DD/MM/AAAA.');
      return;
    }

    try {
      this.isLoading = true;
      this.funcionarioSelecionado.email = this.emailParaEdicao;
      this.funcionarioSelecionado.nome = this.nomeParaEdicao;
      this.funcionarioSelecionado.dataNascimento = this.dataNascimentoParaEdicao;
      this.funcionarioSelecionado.senha = this.senhaParaEdicao;

      this.funcionarioService.atualizar(this.originalEmail, this.funcionarioSelecionado);
      alert('Funcionário atualizado com sucesso!');
      this.novo();
      this.refreshList();
    } catch (error) {
      alert('Erro ao atualizar funcionário. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

  abrirRemocao(): void {
    this.exibirConfirmacaoRemocao = true;
  }

  remover(): void {
    if (this.funcionarioSelecionado) {
      try {
        this.isLoading = true;
        this.funcionarioService.remover(this.funcionarioSelecionado.email);
        alert('Funcionário removido com sucesso!');
        this.novo();
        this.refreshList();
      } catch (error) {
        alert('Erro ao remover funcionário. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  novo(): void {
    this.funcionarioSelecionado = null;
    this.limparFormulario();
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }

  private limparFormulario(): void {
    this.funcionario = new Funcionario('', '', '', '', 'funcionario');
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validarDataNascimento(data: string): boolean {
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(data)) return false;
    
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    
    return dataObj.getDate() === dia && 
           dataObj.getMonth() === mes - 1 && 
           dataObj.getFullYear() === ano &&
           dataObj <= new Date();
  }

  cancelarEdicao(): void {
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }
}