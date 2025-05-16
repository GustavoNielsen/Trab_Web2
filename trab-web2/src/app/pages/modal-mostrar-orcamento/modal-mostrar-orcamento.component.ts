import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitacao } from '../../shared/models/solicitacao';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-mostrar-orcamento',
  imports: [
    CommonModule,
    FormsModule,
   ],
  templateUrl: './modal-mostrar-orcamento.component.html',
  styleUrl: './modal-mostrar-orcamento.component.css'
})

export class ModalMostrarOrcamentoComponent {
  @Input() solicitacao!: Solicitacao;

  motivoRejeicao: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router        
  ) {}

  private atualizarSolicitacao() {
    const allSolicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]') as Solicitacao[];
    const index = allSolicitacoes.findIndex(s => new Date(s.dataHora).toISOString() === new Date(this.solicitacao.dataHora).toISOString());
    if (index !== -1) {
      allSolicitacoes[index] = this.solicitacao;
      localStorage.setItem('solicitacoes', JSON.stringify(allSolicitacoes));
    }
  }

  // Atualiza o atributo 'aprovado' para "Rejeitado", atualiza o armazenamento e navega para a página inicial do cliente.
  confirmarRejeicao(): void {
    if (this.solicitacao) {
      if (!this.motivoRejeicao.trim()) {
        alert("Por favor, informe o motivo da rejeição.");
        return;
      }
      
      this.solicitacao.estado = 'Rejeitada';
      this.solicitacao.motivoRecusa = this.motivoRejeicao;
      this.atualizarSolicitacao();
      alert("Serviço rejeitado");
      this.activeModal.close();
      this.router.navigate(['/paginainicialcliente']);
    }
  }
}
