import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AutocadastroComponent, MostrarOrcamentoComponent, PaginaInicialClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'trab-web2';
}
