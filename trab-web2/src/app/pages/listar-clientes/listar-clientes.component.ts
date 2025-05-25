import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastraclienteComponent } from '../modal-cadastracliente/modal-cadastracliente.component';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-listar-clientes',
  imports: [NgxMaskPipe],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent {
  
  constructor( private modalService: NgbModal){}
  
  abrirModalCliente() {
    const modalRef = this.modalService.open(ModalCadastraclienteComponent);

  }
}
