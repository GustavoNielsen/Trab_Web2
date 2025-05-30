import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskPipe } from 'ngx-mask';
import { Cliente } from '../../shared/models';
import { ClienteService } from '../../services/cliente.service';
import { ViaCep } from '../../shared/models';

@Component({
  selector: 'app-modal-cadastracliente',
  standalone: true,
  imports: [NgxMaskPipe,FormsModule, CommonModule],
  templateUrl: './modal-cadastracliente.component.html',
  styleUrl: './modal-cadastracliente.component.css',
  //providers: [NgbActiveModal]
})
export class ModalCadastraclienteComponent {
  cliente: Cliente = new Cliente(0,'', '', '', 'cliente', '', '', '', '', '', '', '', '','');
  constructor(public activeModal: NgbActiveModal, private clienteService: ClienteService) {}

  inserir(): void {
    this.clienteService.inserir(this.cliente);
    alert('Cliente cadastrado com sucesso!');       
    this.activeModal.close('clienteCadastrado');
  } //end inserir

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

  fechar() {
  //console.log('Fechar clicado');
  this.activeModal.close();
}  
}
