import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [RouterOutlet, CommonModule, VisualizarSolicitacaoComponent],
  templateUrl: './visualizar-solicitacao.component.html',
  styleUrl: './visualizar-solicitacao.component.css'
})
export class VisualizarSolicitacaoComponent {

}
