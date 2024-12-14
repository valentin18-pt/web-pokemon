import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './PokemonLista/pokemon-list.component';
import { PokemonDetailComponent } from './PokemonDetalle/pokemon-detail.component';
import { PokemonSearchComponent } from './PokemonBusqueda/pokemon-search.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent
  },
  {
    path: 'busqueda',
    component: PokemonSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }