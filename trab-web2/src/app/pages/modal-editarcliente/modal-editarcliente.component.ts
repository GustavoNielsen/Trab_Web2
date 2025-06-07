import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { Cliente } from '../../shared/models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ViaCep } from '../../shared/models';

@Component({
  selector: 'app-modal-editarcliente',
  standalone: true, // Componente standalone
  imports: [FormsModule, CommonModule], // Módulos necessários
  templateUrl: './modal-editarcliente.component.html',
})
export class ModalEditarclienteComponent implements OnInit {
  @Input() cliente!: Cliente;
  
  // Variável para editar uma cópia, preservando o objeto original em caso de cancelamento.
  public clienteEditado!: Cliente;
  public isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Cria uma cópia profunda do cliente para edição.
    // Assim, as alterações só são efetivadas ao salvar.
    this.clienteEditado = JSON.parse(JSON.stringify(this.cliente));
  }

  /**
   * Busca o endereço a partir do CEP e preenche os campos do formulário.
   * @param cep O CEP digitado pelo usuário.
   */
  public pegaEndereco(cep: string): void {
    if (!cep) return;

    this.clienteService.viaCep(cep).subscribe({
      next: (dados: ViaCep) => {
        if (dados && !dados.erro) {
          this.clienteEditado.rua = dados.logradouro;
          this.clienteEditado.bairro = dados.bairro;
          this.clienteEditado.cidade = dados.localidade;
          this.clienteEditado.estado = dados.uf;
        } else {
          alert('CEP não encontrado ou inválido.');
        }
      },
      error: (err) => console.error('Erro ao buscar CEP:', err)
    });
  }

  /**
   * CORRIGIDO: O método agora é assíncrono e aguarda a resposta do serviço.
   */
  public atualizarCliente(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    // O serviço 'atualizar' precisa do identificador (cpf) e do objeto modificado.
    this.clienteService.atualizar(this.clienteEditado.cpf, this.clienteEditado)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          // SUCESSO: Fecha o modal e envia um sinal de sucesso.
          this.activeModal.close('clienteEditado');
        },
        error: (err) => {
          // ERRO: Exibe um alerta e mantém o modal aberto.
          console.error('Erro ao atualizar o cliente:', err);
          alert('Não foi possível atualizar os dados do cliente. Tente novamente.');
        }
      });
  }

  /**
   * Fecha o modal sem salvar (ação de cancelamento).
   */
  public cancelar(): void {
    this.activeModal.dismiss('cancel');
  }
}
