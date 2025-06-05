import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastraclienteComponent } from '../modal-cadastracliente/modal-cadastracliente.component';
import { ModalEditarclienteComponent } from '../modal-editarcliente/modal-editarcliente.component';
import { ModalVerclienteComponent } from '../modal-vercliente/modal-vercliente.component';
import { Cliente } from '../../shared/models';
import { ClienteService } from '../../services/cliente.service';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";


@Component({
  standalone: true,
  selector: 'app-listar-clientes',
  imports: [NgbModalModule, CommonModule, NavbarFuncionarioComponent],
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
  removerCliente(cpf: string){
    this.clienteService.remover(cpf);
    this.carregarLista();
  }

  abrirModalVer(cliente: Cliente): void {
    const modalRef = this.modalService.open(ModalVerclienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

  abriModalEditar(cliente: Cliente): void {
    const modalRef = this.modalService.open(ModalEditarclienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

  abrirModalCliente(): void {
    const modalRef = this.modalService.open(ModalCadastraclienteComponent);

    modalRef.result.then(
      (result) => {
        
        if (result === 'clienteCadastrado') {
          console.log('Modal indicou que um cliente foi cadastrado. Atualizando a lista...');
          this.carregarLista();
        } else if (result && typeof result === 'object' && result.id) {
            
            console.log('Modal retornou o novo cliente. Adicionando à lista local:', result);
            this.listaClientes.push(result as Cliente); // Adiciona o novo cliente à lista existente
            
        }
      },
      (reason) => {
        
        console.log('Modal dispensado com motivo:', reason);
      }
    );
  }

}
