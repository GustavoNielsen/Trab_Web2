import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial-cliente',
  imports: [CommonModule, RouterOutlet, PaginaInicialClienteComponent],
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrl: './pagina-inicial-cliente.component.css'
})
export class PaginaInicialClienteComponent {

}

