import { Component, Input } from '@angular/core';
import { Cliente } from '../../shared/models/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';
import { ViaCep } from '../../shared/models';

@Component({
  selector: 'app-modal-editarcliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-editarcliente.component.html',
  
})
export class ModalEditarclienteComponent {
  @Input() cliente!: Cliente;
      
  constructor(public activeModal: NgbActiveModal, private clienteService: ClienteService) {}
  
  ngOnInit() {
       console.log(this.cliente); // Access the passed object
     }

  pegaEndereco(cep: string): void {
        this.clienteService.viaCep(cep).subscribe((dados: ViaCep) => {
          if (dados && !dados.erro) {
            this.cliente.rua = `${dados.logradouro}`;
            this.cliente.bairro = `${dados.bairro}`;
            this.cliente.cidade = `${dados.localidade}`;
            this.cliente.estado = `${dados.uf}`;
          } else {
            // CEP inválido ou não encontrado
            console.log('Digite um CEP válido.');
            this.cliente.rua = '';
            this.cliente.bairro = '';
            this.cliente.cidade = '';
            this.cliente.estado = '';        
          }
        });
      }
  
  atualizarCliente(){
    this.clienteService.atualizar(this.cliente);
    this.fechar();
  }    
      
  fechar() {
  //console.log('Fechar clicado');
  this.activeModal.close();
}  
}
