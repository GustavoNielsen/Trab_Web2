import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // Adicione RouterLink
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

export interface Item {
  id: number; // Opcional
  dataHora: string;
  equipamento: string;
  estado?: string
  isEditing: boolean;
}

@Component({
  selector: 'app-pagina-inicial-cliente',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterLink,
    FormsModule, 
    NgFor, 
    NgIf    
  ],
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrl: './pagina-inicial-cliente.component.css'
})

export class PaginaInicialClienteComponent implements OnInit {
  itens: Item[] = [];
  
  ngOnInit(): void {
    this.carregaExemplos(); 
  }
  private carregaExemplos(): void {
    this.itens = [
      { id: 1, dataHora: '02/02/2025', equipamento: 'Computador', estado: 'Bom', isEditing: false},
      { id: 2, dataHora: '05/02/2025', equipamento: 'Celular', estado: 'Riscos na tela', isEditing: false }
    ];
    localStorage.setItem('itens', JSON.stringify(this.itens));
  }
    
  }

