import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../shared/models';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.scss'
})

export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  mensagem: string ="";
  mensagem_detalhes: string = "";

  constructor(private usuarioService: UsuarioService,
    private modalService: NgbModal) { }
  ngOnInit(): void {
    this.listarTodos();
  }
  listarTodos(): Usuario[] {
    this.usuarioService.listarTodos().subscribe({
      next: (data: Usuario[] | null) => {
        if (data == null) {
          this.usuarios = [];
        }
        else {
          this.usuarios = data;
        }
      },
      error: (err) => {
        this.mensagem="Erro buscando lista de usuários";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
      }
    });
    return this.usuarios;
  }
  remover($event: any, usuario: Usuario): void {
    $event.preventDefault();
    this.mensagem="";
    this.mensagem_detalhes="";
    if (confirm(`Deseja realmente remover o usuário ${usuario.nome}?`)) {
      this.usuarioService.remover(usuario.id!).
        subscribe({
          complete: () => { this.listarTodos(); },
          error: (err) => {
            this.mensagem = `Erro removendo usuário ${usuario.id}-${usuario.nome}`;
            this.mensagem_detalhes = `[${err.status}] ${err.mensagem}`;
          }
        });
    }
  }
  abrirModal(usuario: Usuario) {
    const modalRef = this.modalService.open(ModalUsuarioComponent);
    modalRef.componentInstance.usuario = usuario;
  }
}
