import { Component, OnInit } from '@angular/core';
import { PokemonService, Pokemon, PokemonListResponse } from '../../services/PokemonService';
import { ErrorService } from '../../services/ErrorService';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  currentPage = 0;
  pageSize = 20;
  totalPokemons = 0;
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.loading = true;
    this.pokemonService.getPokemonList(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PokemonListResponse) => {
          this.totalPokemons = response.count;
          
          const detailObservables = response.results.map(pokemon => 
            this.pokemonService.getPokemonDetails(pokemon.name)
          );
          
          forkJoin(detailObservables).subscribe({
            next: (details: Pokemon[]) => {
              this.pokemonList = details;
              this.loading = false;
            },
            error: (err) => {
              this.errorService.setError('Error al cargar detalles de Pokémon');
              this.loading = false;
            }
          });
        },
        error: (err) => {
          this.errorService.setError('Error al cargar la lista de Pokémon');
          this.loading = false;
        }
      });
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemonList();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemonList();
    }
  }

  goToSearch() {
    this.router.navigate(['/busqueda']);
  }
}