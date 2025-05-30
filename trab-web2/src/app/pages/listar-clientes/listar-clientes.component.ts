import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastraclienteComponent } from '../modal-cadastracliente/modal-cadastracliente.component';
import { Cliente } from '../../shared/models';
import { ClienteService } from '../../services/cliente.service';


@Component({
  standalone: true,
  selector: 'app-listar-clientes',
  imports: [NgbModalModule,CommonModule],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent {
  listaClientes: Cliente[] = [];
  
  constructor( private modalService: NgbModal, private clienteService: ClienteService){}
  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(){
    this.listaClientes = this.clienteService.listarTodos();
  }

  listarCliente(){
    if(this.listaClientes){
      return this.listaClientes;
    }else{
      return [];
    }
  }

  abrirModalCliente(): void {
    const modalRef = this.modalService.open(ModalCadastraclienteComponent);

    modalRef.result.then(
      (result) => {
        // Modal foi fechado com activeModal.close(result)
        if (result === 'clienteCadastrado') {
          console.log('Modal indicou que um cliente foi cadastrado. Atualizando a lista...');
          // ----> ESTA É A PARTE CHAVE <----
          // Chama o método que busca os dados novamente do backend
          // ou atualiza a lista localmente se o modal retornar o novo cliente.
          this.carregarLista();
        } else if (result && typeof result === 'object' && result.id) {
            // Cenário alternativo: O modal retornou o objeto cliente recém-criado
            console.log('Modal retornou o novo cliente. Adicionando à lista local:', result);
            this.listaClientes.push(result as Cliente); // Adiciona o novo cliente à lista existente
            // Força a detecção de mudanças se necessário (geralmente não é para push em array referenciado no template)
        }
      },
      (reason) => {
        // Modal foi dispensado
        console.log('Modal dispensado com motivo:', reason);
      }
    );
  }

}
