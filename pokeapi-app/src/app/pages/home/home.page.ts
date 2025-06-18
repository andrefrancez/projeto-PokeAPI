import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, 
  IonCardTitle, IonButton, IonIcon, IonCardHeader } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, CommonModule, TitleCasePipe,
    IonCardTitle, IonButton, IonIcon, IonCardHeader],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;

  constructor(
    private pokemonService: PokemonService, 
    private router: Router,
    public favoriteService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe((res: any) => {
      this.pokemons = res;
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage() {
    this.offset -= this.limit;
    this.loadPokemons();
  }

  goToDetails(id: Number) {
    this.router.navigate(['/details', id]);
  }

  isFav(id: number): boolean {
  return this.favoriteService.isFavorite(id);
}

  toggleFavorite(pokemon: any) {
    this.favoriteService.toggleFavorite(pokemon);
  }
}
