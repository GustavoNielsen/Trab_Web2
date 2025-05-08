import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css'],
  providers: [provideNgxMask()]  // Configuração da máscara
})
export class AutocadastroComponent {
  // Observe a ordem dos parâmetros conforme definido no modelo
  cliente: Cliente = new Cliente('', '', '', 'cliente', '', '', '', '', '', '', '', '','');

  constructor(
    private clienteService: ClienteService,
    private router: Router  // Injeção do serviço Router
  ) {}

  inserir(): void {
    this.clienteService.inserir(this.cliente);
    alert('Cliente cadastrado com sucesso!');
    // Redireciona para a tela de login após o cadastro
    this.router.navigate(['/login']);
  }
}
