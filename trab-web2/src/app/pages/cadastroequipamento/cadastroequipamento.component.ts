import { Component, OnInit } from '@angular/core';
import { Equipamento } from '../../shared/models/equipamento';
import { EquipamentoService } from '../../services/equipamento.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cadastroequipamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarFuncionarioComponent],
  templateUrl: './cadastroequipamento.component.html',
  styleUrls: ['./cadastroequipamento.component.css']
})
export class CadastroequipamentoComponent implements OnInit {
  public equipamentos: Equipamento[] = [];
  public equipamentoSelecionado: Equipamento | null = null;
  public equipamento: Equipamento = new Equipamento('');
  public exibirFormAtualizacao = false;
  public exibirConfirmacaoRemocao = false;
  public originalCategoria = '';
  public categoriaParaEdicao = '';
  public isLoading = false;

  constructor(private equipamentoService: EquipamentoService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  /**
   * CORRIGIDO: Se inscreve no Observable para obter a lista de equipamentos.
   */
  private refreshList(): void {
    this.isLoading = true;
    this.equipamentoService.listarTodos()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (listaEquipamentos) => {
          this.equipamentos = listaEquipamentos;
        },
        error: (err) => {
          console.error('Erro ao carregar a lista de equipamentos:', err);
          alert('Não foi possível carregar os equipamentos.');
        }
      });
  }

  /**
   * CORRIGIDO: Espera a conclusão da inserção antes de atualizar a lista.
   */
  public inserir(): void {
    this.isLoading = true;
    this.equipamentoService.inserir(this.equipamento)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Equipamento cadastrado com sucesso');
          this.equipamento = new Equipamento('');
          this.refreshList();
        },
        error: (err) => {
          console.error('Erro ao inserir equipamento:', err);
          alert('Falha ao cadastrar o equipamento.');
        }
      });
  }

  public selecionar(eq: Equipamento): void {
    this.equipamentoSelecionado = eq;
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }

  public abrirAtualizacao(): void {
    if (this.equipamentoSelecionado) {
      this.originalCategoria = this.equipamentoSelecionado.categoria;
      this.categoriaParaEdicao = this.originalCategoria;
      this.exibirFormAtualizacao = true;
    }
  }

  /**
   * CORRIGIDO: Espera a conclusão da atualização antes de limpar e recarregar.
   */
  public atualizar(): void {
    if (!this.equipamentoSelecionado) return;

    this.isLoading = true;
    const equipamentoAtualizado = { ...this.equipamentoSelecionado, categoria: this.categoriaParaEdicao };
    this.equipamentoService.atualizar(this.originalCategoria, equipamentoAtualizado)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Equipamento atualizado com sucesso');
          this.novo();
          this.refreshList();
        },
        error: (err) => {
          console.error('Erro ao atualizar equipamento:', err);
          alert('Falha ao atualizar o equipamento.');
        }
      });
  }

  public abrirRemocao(): void {
    this.exibirConfirmacaoRemocao = true;
  }

  /**
   * CORRIGIDO: Espera a conclusão da remoção antes de limpar e recarregar.
   */
  public remover(): void {
    if (!this.equipamentoSelecionado) return;
    
    // Confirmação com o usuário é uma boa prática
    if (!confirm('Tem certeza que deseja remover este tipo de equipamento?')) {
        return;
    }

    this.isLoading = true;
    this.equipamentoService.remover(this.equipamentoSelecionado.categoria)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Equipamento removido com sucesso');
          this.novo();
          this.refreshList();
        },
        error: (err) => {
          console.error('Erro ao remover equipamento:', err);
          alert('Falha ao remover o equipamento.');
        }
      });
  }

  public novo(): void {
    this.equipamentoSelecionado = null;
    this.equipamento = new Equipamento('');
    this.exibirFormAtualizacao = false;
    this.exibirConfirmacaoRemocao = false;
  }
}
