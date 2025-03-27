import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutocadastroComponent, MostrarOrcamentoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'trab-web2';
}
