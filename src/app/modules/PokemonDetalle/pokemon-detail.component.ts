import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService, Pokemon } from '../../services/PokemonService';
import { ErrorService } from '../../services/ErrorService';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pokemonName = params.get('name');
      if (pokemonName) {
        this.loadPokemonDetails(pokemonName);
      }
    });
  }

  loadPokemonDetails(name: string) {
    this.loading = true;
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información del Pokémon';
        this.errorService.setError(this.error);
        this.loading = false;
      }
    });
  }
}