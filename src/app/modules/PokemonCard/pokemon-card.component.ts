import { Component, Input } from '@angular/core';
import { Pokemon } from '../../services/PokemonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }
}