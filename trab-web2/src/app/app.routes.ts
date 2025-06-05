import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { LoginComponent } from './pages/login/login.component';
import { VisualizarSolicitacaoComponent } from './pages/visualizar-solicitacao/visualizar-solicitacao.component';
import { PaginaInicialFuncionarioComponent } from './pages/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';
import { EfetuarManutencaoComponent } from './pages/efetuar-manutencao/efetuar-manutencao.component';
import { PagarservicoComponent } from './pages/pagarservico/pagarservico.component';
import { CadastrofuncionarioComponent } from './pages/cadastrofuncionario/cadastrofuncionario.component';
import { VisualizarservicoComponent } from './pages/visualizarservico/visualizarservico.component';
import { CadastroequipamentoComponent } from './pages/cadastroequipamento/cadastroequipamento.component';
import { RelatorioreceitasComponent } from './pages/relatorioreceitas/relatorioreceitas.component';
import { AuthGuard } from './auth/auth.guard';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

export const routes: Routes = [
  { path: '',                redirectTo: 'login',             pathMatch: 'full' },
  { path: 'login',           component: LoginComponent },
  { path: 'autocadastro',    component: AutocadastroComponent },
  
  // -- todas as demais rotas protegidas --
  { path: 'paginainicialcliente',           component: PaginaInicialClienteComponent,      canActivate: [AuthGuard]},
  { path: 'paginainicialfuncionario',       component: PaginaInicialFuncionarioComponent,  canActivate: [AuthGuard]},
  { path: 'solicitamanutecao',              component: SolicitaManutencaoComponent,        canActivate: [AuthGuard]},
  { path: 'visualizarsolicitacao',          component: VisualizarSolicitacaoComponent,     canActivate: [AuthGuard]},
  { path: 'mostrar-orcamento/:dataHora',    component: MostrarOrcamentoComponent,          canActivate: [AuthGuard]},
  { path: 'manutencao/:dataHora',           component: EfetuarManutencaoComponent,         canActivate: [AuthGuard]},
  { path: 'pagarservico/:dataHora',         component: PagarservicoComponent,              canActivate: [AuthGuard]},
  { path: 'cadastrofuncionario',            component: CadastrofuncionarioComponent,       canActivate: [AuthGuard]},
  { path: 'visualizar-servico/:dataHora',   component: VisualizarservicoComponent,         canActivate: [AuthGuard]},
  { path: 'cadastrarequipamento',           component: CadastroequipamentoComponent,       canActivate: [AuthGuard]},
  { path: 'relatorioreceita',               component: RelatorioreceitasComponent,         canActivate: [AuthGuard]},
  { path: 'listarclientes',                 component: ListarClientesComponent,           canActivate: [AuthGuard] },

  // qualquer outra
  { path: '**', redirectTo: 'login' }
];