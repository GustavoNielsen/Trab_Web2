import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { LoginComponent } from './pages/login/login.component';
import { CrudCategoriaEquipamentoComponent } from './pages/crud-categoria-equipamento/crud-categoria-equipamento.component';
import { VisualizarSolicitacaoComponent } from './pages/visualizar-solicitacao/visualizar-solicitacao.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component'
import { PagaServicoComponent } from './pages/paga-servico';
import { ResgataServicoComponent } from './pages/resgata-servico';
import { RelatorioReceitasComponent } from './pages/relatorio-receitas';

export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent},
    {path: 'paga-servico', component: PagaServicoComponent},
    {path: 'resgata-servico', component: ResgataServicoComponent},
    {path: 'solicitamanutecao', component: SolicitaManutencaoComponent},
    {path: 'relatorio-receita', component:RelatorioReceitasComponent},
    {path: 'login', component: LoginComponent},
    {path: 'crudcategoriaequipamento', component: CrudCategoriaEquipamentoComponent},
    {path: 'visualizarsolicitacao', component: VisualizarSolicitacaoComponent},
    {path: 'efetuarorcamento', component: EfetuarOrcamentoComponent}

];
    //{path: 'login', component: LoginComponent}

