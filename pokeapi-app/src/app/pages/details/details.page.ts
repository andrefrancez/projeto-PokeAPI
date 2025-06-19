import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonBackButton, IonCol, IonRow,
  IonCardTitle, IonCardContent, IonChip, IonList, IonItem, IonButton, IonIcon, IonButtons,
  IonGrid,
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCol, IonCardTitle, IonRow, IonGrid,
    IonCardContent, IonChip, IonList, IonItem, IonButton, IonIcon, IonButtons]
})
export class DetailsPage implements OnInit {
  pokemon: any;
  id!: number;
  public isFav = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadPokemon();
    });
  }

  checkFavorite() {
    this.isFav = this.favoriteService.isFavorite(this.pokemon.id);
  }

  toggleFavorite() {
    this.favoriteService.toggleFavorite(this.pokemon);
    this.checkFavorite();
  }

  goNext() {
    const nextId = this.pokemon.id + 1;
    this.router.navigate(['/details', nextId]);
  }

  goPrevious() {
    const prevId = this.pokemon.id - 1;
    if (prevId > 0) {
      this.router.navigate(['/details', prevId]);
    }
  }

  loadPokemon() {
    this.pokemonService.getPokemonById(this.id).subscribe((data) => {
      this.pokemon = data;
      this.isFav = this.favoriteService.isFavorite(data.id);
    });
  }
}