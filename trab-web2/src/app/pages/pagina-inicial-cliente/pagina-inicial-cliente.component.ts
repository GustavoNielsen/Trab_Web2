import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // Adicione RouterLink

@Component({
  selector: 'app-pagina-inicial-cliente',
  standalone: true, // Certifique-se que está marcado como standalone
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink // ← Adicione esta linha
  ],
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrl: './pagina-inicial-cliente.component.css'
})
export class PaginaInicialClienteComponent {
  // Seu código existente
}
