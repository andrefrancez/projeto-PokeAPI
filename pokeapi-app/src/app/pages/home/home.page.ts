import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard,
  IonCardTitle, IonButton, IonIcon, IonCardHeader, IonSearchbar, IonFooter
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, CommonModule, TitleCasePipe, IonFooter,
    IonCardTitle, IonButton, IonIcon, IonCardHeader, IonSearchbar, FormsModule],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  searchTerm: string = '';
  filteredPoke: any[] = [];

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
      this.filterPokemons();
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

  filterPokemons() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPoke = this.pokemons.filter(p => p.name.toLowerCase().includes(term));
  }
}
