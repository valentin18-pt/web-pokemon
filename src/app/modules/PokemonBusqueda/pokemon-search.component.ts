import { Component } from '@angular/core';
import { PokemonService, Pokemon } from '../../services/PokemonService';
import { ErrorService } from '../../services/ErrorService';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent {
  searchTerm = '';
  searchResult: Pokemon | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private errorService: ErrorService
  ) {}

  searchPokemon() {
    if (!this.searchTerm) return;

    this.loading = true;
    this.searchResult = null;
    this.error = null;

    this.pokemonService.searchPokemon(this.searchTerm).subscribe({
      next: (pokemon) => {
        this.searchResult = pokemon;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Pokémon no encontrado';
        this.errorService.setError(this.error);
        this.loading = false;
      }
    });
  }
}