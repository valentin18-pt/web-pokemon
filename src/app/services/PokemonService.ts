import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(page: number = 0, pageSize: number = 20): Observable<PokemonListResponse> {
    const offset = page * pageSize;
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?offset=${offset}&limit=${pageSize}`);
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        imageUrl: response.sprites.front_default,
        types: response.types.map((type: any) => type.type.name),
        height: response.height,
        weight: response.weight,
        abilities: response.abilities.map((ability: any) => ability.ability.name),
        stats: {
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[2].base_stat,
          specialAttack: response.stats[3].base_stat,
          specialDefense: response.stats[4].base_stat,
          speed: response.stats[5].base_stat
        }
      })),
      catchError(this.handleError)
    );
  }

  searchPokemon(name: string): Observable<Pokemon> {
    return this.getPokemonDetails(name.toLowerCase());
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}