import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-modal-cadastracliente',
  standalone: true,
  imports: [NgxMaskPipe],
  templateUrl: './modal-cadastracliente.component.html',
  styleUrl: './modal-cadastracliente.component.css'
})
export class ModalCadastraclienteComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
