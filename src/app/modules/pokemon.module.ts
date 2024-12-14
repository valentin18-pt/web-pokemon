import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './PokemonLista/pokemon-list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonCardComponent } from './PokemonCard/pokemon-card.component';
import { PokemonSearchComponent } from './PokemonBusqueda/pokemon-search.component';
import { PokemonDetailComponent } from './PokemonDetalle/pokemon-detail.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    PokemonSearchComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PokemonModule { }