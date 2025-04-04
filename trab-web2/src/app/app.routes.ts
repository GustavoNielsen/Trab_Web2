import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';
import { SolicitaManutencaoComponent } from './pages/solicita-manutencao';
import { LoginComponent } from './pages/login/login.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import {CrudCategoriaEquipamentoComponent} from './pages/crud-categoria-equipamento/crud-categoria-equipamento.component';


export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento', component: MostrarOrcamentoComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent},
    {path: 'solicitamanutecao', component: SolicitaManutencaoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'visualizar-servico', component: VisualizarServicoComponent},
    {path: 'crudcategoriaequipamento', component: CrudCategoriaEquipamentoComponent}
];