import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { PaginaInicialClienteComponent } from './pages/pagina-inicial-cliente';

export const routes: Routes = [
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'paginainicialcliente', component: PaginaInicialClienteComponent}

];
