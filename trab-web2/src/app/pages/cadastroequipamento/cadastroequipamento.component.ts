import { Component, OnInit } from '@angular/core';
import { Equipamento } from '../../shared/models/equipamento';
import { EquipamentoService } from '../../services/equipamento.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";

@Component({
  selector: 'app-cadastroequipamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarFuncionarioComponent],
  templateUrl: './cadastroequipamento.component.html',
  styleUrl: './cadastroequipamento.component.css'
})
export class CadastroequipamentoComponent implements OnInit {
  equipamentos: Equipamento[] = [];
  equipamentoSelecionado: Equipamento | null = null;
  equipamento: Equipamento = new Equipamento('');
  exibirFormAtualizacao = false;
  exibirConfirmacaoRemocao = false;
  originalCategoria: string = '';     
  categoriaParaEdicao: string = '';

  constructor(private equipamentoService: EquipamentoService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  private refreshList(): void {
    this.equipamentos = this.equipamentoService.listarTodos();
  }

  inserir(): void {
    this.equipamentoService.inserir(this.equipamento);
    alert('Equipamento cadastrado com sucesso');
    this.equipamento = new Equipamento('');
    this.refreshList();
  }

  selecionar(eq: Equipamento): void {
    this.equipamentoSelecionado = eq;
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }

  abrirAtualizacao(): void {
    if (this.equipamentoSelecionado) {
      this.originalCategoria = this.equipamentoSelecionado.categoria;  // salva o valor atual
      this.categoriaParaEdicao   = this.originalCategoria;
      this.exibirFormAtualizacao  = true;
    }
  }

  atualizar(): void {
    if (this.equipamentoSelecionado) {
      // atualiza o objeto em memória
      this.equipamentoSelecionado.categoria = this.categoriaParaEdicao;
      // passa a categoria antiga para encontrar o índice certo
      this.equipamentoService.atualizar(
        this.originalCategoria,
        this.equipamentoSelecionado
      );
      alert('Equipamento atualizado com sucesso');
      this.novo();
      this.refreshList();
    }
  }

  abrirRemocao(): void {
    this.exibirConfirmacaoRemocao = true;
  }

  remover(): void {
    if (this.equipamentoSelecionado) {
      this.equipamentoService.remover(this.equipamentoSelecionado.categoria);
      alert('Equipamento removido com sucesso');
      this.novo();
      this.refreshList();
    }
  }

  novo(): void {
    this.equipamentoSelecionado = null;
    this.equipamento = new Equipamento('');
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }
}
