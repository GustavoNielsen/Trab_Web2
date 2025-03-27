import { Routes } from '@angular/router';
import { AutocadastroComponent } from './pages/autocadastro';
import { MostrarOrcamentoComponent } from './pages/mostrar-orcamento';

export const routes: Routes = [//
    {path: 'autocadastro', component: AutocadastroComponent},
    {path: 'mostrar-orcamento', component: MostrarOrcamentoComponent}
];