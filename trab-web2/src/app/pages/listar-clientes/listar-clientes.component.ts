import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastraclienteComponent } from '../modal-cadastracliente/modal-cadastracliente.component';
import { ModalEditarclienteComponent } from '../modal-editarcliente/modal-editarcliente.component';
import { ModalVerclienteComponent } from '../modal-vercliente/modal-vercliente.component';
import { Cliente } from '../../shared/models';
import { ClienteService } from '../../services/cliente.service';
import { NavbarFuncionarioComponent } from "../navbarfuncionario/navbarfuncionario.component";
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-listar-clientes',
  imports: [NgbModalModule, CommonModule, NavbarFuncionarioComponent],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
// Implementar a interface OnInit
export class ListarClientesComponent implements OnInit {
  public listaClientes: Cliente[] = [];
  public isLoading = false; // Variável para controlar o estado de carregamento

  constructor(private modalService: NgbModal, private clienteService: ClienteService) {}

  // O Angular executa o ngOnInit() assim que o componente é inicializado.
  ngOnInit(): void {
    this.carregarLista();
  }

  /**
   * CORRIGIDO: Este método agora se inscreve no Observable retornado pelo serviço.
   * Os dados da lista de clientes só são atribuídos quando a resposta da API chega.
   */
  carregarLista(): void {
    this.isLoading = true;
    this.clienteService.listarTodos()
      .pipe(
        // O `finalize` garante que `isLoading` se torne `false` no final,
        // tanto em caso de sucesso quanto de erro.
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (clientes) => {
          this.listaClientes = clientes;
        },
        error: (err) => {
          console.error('Erro ao carregar a lista de clientes', err);
          alert('Não foi possível carregar os clientes. Tente novamente mais tarde.');
        }
      });
  }

  /**
   * CORRIGIDO: O método agora espera a operação de remoção ser concluída
   * antes de recarregar a lista, evitando uma condição de corrida (race condition).
   * @param cpf O CPF do cliente a ser removido.
   */
  removerCliente(cpf: string): void {
    // Confirmação com o usuário é uma boa prática
    if (!confirm('Tem certeza que deseja remover este cliente?')) {
      return;
    }

    this.isLoading = true;
    this.clienteService.remover(cpf).subscribe({
      next: () => {
        alert('Cliente removido com sucesso!');
        // Recarrega a lista apenas após a remoção bem-sucedida.
        this.carregarLista();
      },
      error: (err) => {
        console.error('Erro ao remover o cliente', err);
        alert('Falha ao remover o cliente.');
        this.isLoading = false;
      }
    });
  }

  abrirModalVer(cliente: Cliente): void {
    const modalRef = this.modalService.open(ModalVerclienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

  abriModalEditar(cliente: Cliente): void {
    const modalRef = this.modalService.open(ModalEditarclienteComponent);
    modalRef.componentInstance.cliente = cliente;
    
    // Opcional: recarregar a lista se o modal de edição fizer alterações.
    modalRef.result.then(
      (result) => {
        if (result === 'clienteEditado') {
          this.carregarLista();
        }
      },
      () => {} // Lidar com o fechamento do modal sem ação
    );
  }

  abrirModalCliente(): void {
    const modalRef = this.modalService.open(ModalCadastraclienteComponent);

    modalRef.result.then(
      (result) => {
        // Se o modal for fechado com sucesso (ex: cliente cadastrado), recarregamos a lista.
        if (result === 'clienteCadastrado') {
          console.log('Modal indicou que um cliente foi cadastrado. Atualizando a lista...');
          this.carregarLista();
        }
      },
      (reason) => {
        // O modal foi dispensado (clicou fora, apertou ESC, etc.)
        console.log('Modal dispensado com motivo:', reason);
      }
    );
  }
}