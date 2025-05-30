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
import { CadastroequipamentoComponent } from './pages/cadastroequipamento/cadastroequipamento.component';
import { RelatorioreceitasComponent } from './pages/relatorioreceitas/relatorioreceitas.component';
import { AuthGuard } from './auth/auth.guard';
import { VisualizarservicoComponent } from './pages/visualizarservico/visualizarservico.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

export const routes: Routes = [
    {path:'', redirectTo: 'login', pathMatch:'full'},
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento/:dataHora', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent},
    {path: 'solicitamanutecao', component: SolicitaManutencaoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'visualizarsolicitacao', component: VisualizarSolicitacaoComponent},
    {path: 'paginainicialfuncionario', component: PaginaInicialFuncionarioComponent},
    {path: 'orcamento/:dataHora/:id', component: EfetuarOrcamentoComponent },
    {path: 'manutencao/:dataHora', component: EfetuarManutencaoComponent},
    {path: 'pagarservico/:dataHora', component: PagarservicoComponent },
    {path: 'cadastrofuncionario', component: CadastrofuncionarioComponent},
    {path: 'visualizar-servico/:dataHora', component: VisualizarservicoComponent },
    {path: 'cadastrarequipamento', component: CadastroequipamentoComponent},
    {path: 'relatorioreceita', component: RelatorioreceitasComponent},
    {path: 'listarclientes', component: ListarClientesComponent}
];