import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';
import { LoginComponent } from './pages/login/login.component';
@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet,AutocadastroComponent, MostrarOrcamentoComponent, PaginaInicialClienteComponent],
=======
  imports: [RouterOutlet, AutocadastroComponent, PaginaInicialClienteComponent, LoginComponente, MostrarOrcamentoComponent],
>>>>>>> 9bd4b8b6a3e05922684fe320ed7509be979e3884
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'trab-web2';
}
