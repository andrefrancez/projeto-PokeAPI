import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListResult[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = "https:pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  getPokemonList(limit = 21, offset = 0): Observable<any[]> {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}?limit=${limit}&offset=${offset}`
    ).pipe(
      switchMap((res) => {
        const requests = res.results.map((p: PokemonListResult) => this.http.get<any>(p.url));
        return forkJoin(requests);
      })
    );
  }

  getPokemonById(id: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
