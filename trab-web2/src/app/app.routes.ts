import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';
<<<<<<< Updated upstream

export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent}
    //{path: 'login', component: LoginComponent}
=======
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { LoginComponent } from './pages/login/login.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';

export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrarorcamento', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent},
    {path: 'solicitamanutecao', component: SolicitaManutencaoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'efetuarorcamento', component: EfetuarOrcamentoComponent}
>>>>>>> Stashed changes
];