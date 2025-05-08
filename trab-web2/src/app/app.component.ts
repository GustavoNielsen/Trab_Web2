import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./pages/autocadastro/autocadastro.component";
import { MostrarOrcamentoComponent } from "./pages/mostrar-orcamento/mostrar-orcamento.component";
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente/pagina-inicial-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { VisualizarSolicitacaoComponent } from './pages/visualizar-solicitacao/visualizar-solicitacao.component';
import { ClienteService } from './services/cliente.service';
import { PaginaInicialFuncionarioComponent } from './pages/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { Funcionario } from './shared/models/funcionario';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';
import { EfetuarManutencaoComponent } from './pages/efetuar-manutencao/efetuar-manutencao.component';
import { PagarservicoComponent } from './pages/pagarservico/pagarservico.component';
import { CadastrofuncionarioComponent } from './pages/cadastrofuncionario/cadastrofuncionario.component';
import { VisualisarservicoComponent } from './pages/visualisarservico/visualisarservico.component';
import { CadastroequipamentoComponent } from './pages/cadastroequipamento/cadastroequipamento.component';
import { RelatorioreceitasComponent } from './pages/relatorioreceitas/relatorioreceitas.component';
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, AutocadastroComponent, PaginaInicialClienteComponent, LoginComponent, MostrarOrcamentoComponent, SolicitaManutencaoComponent, VisualizarSolicitacaoComponent, PaginaInicialFuncionarioComponent, NavbarComponent, EfetuarOrcamentoComponent, EfetuarManutencaoComponent, PagarservicoComponent, CadastrofuncionarioComponent, VisualisarservicoComponent, CadastroequipamentoComponent, RelatorioreceitasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  ngOnInit(): void {
    const funcionariosCadastrados = localStorage.getItem('funcionarios');
    
    if (!funcionariosCadastrados) {
      const agora = new Date();
      const dataHoraString = agora.toISOString(); 
      const adminFuncionario = new Funcionario('adm@gmail.com', '123', 'Alberto', dataHoraString,'funcionario');

      localStorage.setItem('funcionarios', JSON.stringify([adminFuncionario]));
      console.log('Funcionário administrador inserido no localStorage.');
    }
  }
  title = 'trab-web2';
  exibirNavbar: boolean = true;
  constructor(public clienteService: ClienteService) {}
  get cpf(): string {
    return this.clienteService.cpfLogado;
  }

  mostrarNavbar(): boolean {
    return this.exibirNavbar;
  }
}
