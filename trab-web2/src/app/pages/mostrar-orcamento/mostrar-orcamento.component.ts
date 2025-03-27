import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mostrar-orcamento',
  imports: [CommonModule, RouterOutlet, MostrarOrcamentoComponent],
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})
export class MostrarOrcamentoComponent {

}
