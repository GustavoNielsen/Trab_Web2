import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../shared/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-modal-vercliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-vercliente.component.html',
  styleUrl: './modal-vercliente.component.css'
})
export class ModalVerclienteComponent {
  
  constructor(public activeModal: NgbActiveModal, private clienteService: ClienteService) {}
  
  @Input() cliente!: Cliente;
  
  fechar() {
  //console.log('Fechar clicado');
  this.activeModal.close();
  }
}