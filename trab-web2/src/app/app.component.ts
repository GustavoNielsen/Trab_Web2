import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
<<<<<<< HEAD
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutocadastroComponent, MostrarOrcamentoComponent],
=======
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutocadastroComponent, PaginaInicialClienteComponent],
>>>>>>> 23551bea3a18e49cf52ef22ee3e9e52c2beb60e6
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'trab-web2';
}
