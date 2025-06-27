import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../shared/models';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.scss'
})
export class ModalUsuarioComponent {
@Input() usuario: Usuario = new Usuario(); // permite que outro componente acesse essa variável
constructor(public activeModal: NgbActiveModal) {}
}
