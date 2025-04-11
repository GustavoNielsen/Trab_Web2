import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  cliente: Cliente = new Cliente('', '', '', '', '', '', '', '', '', '', '');

  constructor(private clienteService: ClienteService) {}

  inserir(): void {
    this.clienteService.inserir(this.cliente);
    alert('Cliente cadastrado com sucesso!');
    // Limpa o formulário após o cadastro
    this.cliente = new Cliente('', '', '', '', '', '', '', '', '', '', '');
  }
}
