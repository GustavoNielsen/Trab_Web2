import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { VisualizarSolicitacaoComponent } from './pages/visualizar-solicitacao/visualizar-solicitacao.component';
import { StartButtonComponent } from './components/start-button/start-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutocadastroComponent, PaginaInicialClienteComponent, LoginComponent, MostrarOrcamentoComponent, 
    SolicitaManutencaoComponent, VisualizarSolicitacaoComponent,StartButtonComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'trab-web2';
}
