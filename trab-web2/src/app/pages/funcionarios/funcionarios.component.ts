import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  funcionarios: any[] = [];
  apiUrl = 'http://localhost:3000/funcionarios';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.funcionarios = data;
    });
  }

  adicionarFuncionario(): void {
    Swal.fire({
      title: 'Adicionar Funcionário',
      html: `
        <input id="nome" class="swal2-input" placeholder="Nome">
        <input id="email" class="swal2-input" placeholder="E-mail">
        <input id="dataNascimento" class="swal2-input" placeholder="Data de Nascimento" type="date">
        <input id="senha" class="swal2-input" placeholder="Senha" type="password">
      `,
      confirmButtonText: 'Adicionar',
      showCancelButton: true,
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const dataNascimento = (document.getElementById('dataNascimento') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;

        if (!nome || !email || !dataNascimento || !senha) {
          Swal.showValidationMessage('Todos os campos são obrigatórios!');
          return null;
        }

        return { nome, email, dataNascimento, senha };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.http.post<any>(this.apiUrl, result.value).subscribe(() => {
          this.listarFuncionarios();
          Swal.fire('Sucesso', 'Funcionário adicionado com sucesso!', 'success');
        });
      }
    });
  }

  atualizarFuncionario(id: number): void {
    const funcionario = this.funcionarios.find((f) => f.id === id);

    Swal.fire({
      title: 'Atualizar Funcionário',
      html: `
        <input id="nome" class="swal2-input" placeholder="Nome" value="${funcionario.nome}">
        <input id="email" class="swal2-input" placeholder="E-mail" value="${funcionario.email}">
        <input id="dataNascimento" class="swal2-input" placeholder="Data de Nascimento" type="date" value="${funcionario.dataNascimento}">
        <input id="senha" class="swal2-input" placeholder="Senha" type="password" value="${funcionario.senha}">
      `,
      confirmButtonText: 'Atualizar',
      showCancelButton: true,
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const dataNascimento = (document.getElementById('dataNascimento') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;

        if (!nome || !email || !dataNascimento || !senha) {
          Swal.showValidationMessage('Todos os campos são obrigatórios!');
          return null;
        }

        return { nome, email, dataNascimento, senha };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.http.put<any>(`${this.apiUrl}/${id}`, result.value).subscribe(() => {
          this.listarFuncionarios();
          Swal.fire('Sucesso', 'Funcionário atualizado com sucesso!', 'success');
        });
      }
    });
  }

  removerFuncionario(id: number): void {
    if (this.funcionarios.length === 1) {
      Swal.fire('Erro', 'Não é possível remover o único funcionário.', 'error');
      return;
    }

    const funcionarioAtual = this.funcionarios.find((f) => f.id === id);
    if (funcionarioAtual && funcionarioAtual.email === 'seu-email@exemplo.com') {
      Swal.fire('Erro', 'Você não pode remover a si mesmo.', 'error');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(() => {
          this.listarFuncionarios();
          Swal.fire('Removido!', 'O funcionário foi removido com sucesso.', 'success');
        });
      }
    });
  }
}