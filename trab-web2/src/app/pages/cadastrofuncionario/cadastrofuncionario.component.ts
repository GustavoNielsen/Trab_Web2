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
  originalEmail = '';
  originalNome ='';
  OriginalData ='';
  OriginalSenha='';
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
    this.funcionarioService.inserir(this.funcionario);
    alert('Funcionário cadastrado com sucesso!');
    this.novo();
    this.refreshList();
  }

  selecionar(f: Funcionario): void {
    this.funcionarioSelecionado = f;
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }


  abrirAtualizacao(): void {
    if (this.funcionarioSelecionado) {
      this.originalEmail = this.funcionarioSelecionado.email
      this.originalNome = this.funcionarioSelecionado.nome
      this.OriginalData = this.funcionarioSelecionado.dataNascimento
      this.OriginalSenha = this.funcionarioSelecionado.senha
      this.emailParaEdicao = this.originalEmail;
      this.nomeParaEdicao = this.originalNome
      this.dataNascimentoParaEdicao = this.OriginalData
      this.senhaParaEdicao = this.OriginalSenha
      this.exibirFormAtualizacao = true;
    }
  }

  atualizar(): void {
    if (!this.funcionarioSelecionado) return;
    this.funcionarioSelecionado.email = this.emailParaEdicao;
    this.funcionarioSelecionado.nome = this.nomeParaEdicao;
    this.funcionarioSelecionado.dataNascimento = this.dataNascimentoParaEdicao;
    this.funcionarioSelecionado.senha = this.senhaParaEdicao;

    this.funcionarioService.atualizar(this.originalEmail, this.funcionarioSelecionado);
    alert('Funcionário atualizado com sucesso!');
    this.novo();
    this.refreshList();
  }

  abrirRemocao(): void {
    this.exibirConfirmacaoRemocao = true;
  }

  remover(): void {
    if (this.funcionarioSelecionado) {
      this.funcionarioService.remover(this.funcionarioSelecionado.email);
      alert('Funcionário removido com sucesso!');
      this.novo();
      this.refreshList();
    }
  }

  novo(): void {
    this.funcionarioSelecionado = null;
    this.funcionario = new Funcionario('', '', '', '', 'funcionario');
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }
}
