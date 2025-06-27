import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../shared/models';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-inserir-editar-usuario',
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule],
  templateUrl: './inserir-editar-usuario.component.html',
  styleUrl: './inserir-editar-usuario.component.scss'
})

export class InserirEditarUsuarioComponent implements OnInit {
  @ViewChild('formUsuario') formUsuario!: NgForm;
  novoUsuario: boolean = true;
  usuario: Usuario = new Usuario();
  id: string = "";
  loading: boolean = false;
  senhaAntiga: string = "";
  mensagem: string = "";
  mensagem_detalhes: string = "";
  botaoDesabilitado = false;
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.usuario = new Usuario();
    this.loading = false;

    this.id = this.route.snapshot.params['id'];
    this.novoUsuario = !this.id;

    if (!this.novoUsuario) {
      this.usuarioService.buscarPorId(+this.id).subscribe({
        next: (usuario) => {
          if (usuario == null) {
            this.mensagem = `Erro buscando usuário ${this.id}`;
            this.mensagem_detalhes = `Usuário não encontrado ${this.id}`;
            this.botaoDesabilitado = true;
          } else {
            this.usuario = usuario;
            this.senhaAntiga = usuario.senha ? usuario.senha : "";
            this.usuario.senha = "";
            this.botaoDesabilitado = false;
          }
        },
        error: (err) => {
          this.mensagem = `Erro buscando usuário ${this.id}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          this.botaoDesabilitado = true;
        }
      });
    }
  }
  salvar(): void {
    this.loading = true;
    if (this.formUsuario.form.valid) {
      if (this.novoUsuario) {
        this.usuarioService.inserir(this.usuario).subscribe({
          next: (usuario) => {
            this.loading = false;
            this.router.navigate(["/usuarios"]);
          },
          error: (err) => {
            this.loading = false;
            this.mensagem = `Erro inserindo usuário ${this.usuario.nome}`;
            if (err.status == 409) {
              this.mensagem_detalhes = 'Usuário já existente';
            } else {
              this.mensagem_detalhes = `[${err.status}] ${err.message}`;
            }
          }
        });
      }
      else {
        if (this.usuario.senha === "") {
          this.usuario.senha = this.senhaAntiga;
        }
        this.usuarioService.alterar(this.usuario).subscribe({
          next: (usuario) => {
            this.loading = false;
            this.router.navigate(["/usuarios"]);
          },
          error: (err) => {
            this.loading = false;
            this.mensagem = `Erro alterando usuário ${this.usuario.nome}`;
            this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          }
        });
      }
    } else {
      this.loading = false;
    }
  }
}
