import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';
import { PagaServicoComponent } from './pages/paga-servico';
import { ResgataServicoComponent } from './pages/resgata-servico';
import { RelatorioReceitasComponent } from './pages/relatorio-receitas';

export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent},
    {path: 'paga-servico', component: PagaServicoComponent},
    {path: 'resgata-servico', component: ResgataServicoComponent},
    {path: 'relatorio-receita', component:RelatorioReceitasComponent}

    //{path: 'login', component: LoginComponent}
];