import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';
import { LoginComponent } from './pages/login/login.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutocadastroComponent, PaginaInicialClienteComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trab-web2';
}
