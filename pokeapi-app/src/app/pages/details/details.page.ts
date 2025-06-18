import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonList, IonItem, IonButton, IonIcon, IonButtons  } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonChip, IonList, IonItem, IonButton, IonIcon, IonButtons]
})
export class DetailsPage implements OnInit {
  pokemon: any;
  id!: number;
  public isFav = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoritesService
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonById(this.id).subscribe((data) => {
      this.pokemon = data;
      this.isFav = this.favoriteService.isFavorite(data.id)
    });
  }
  
  checkFavorite(){
    this.isFav = this.favoriteService.isFavorite(this.pokemon.id);
  }

  toggleFavorite(){
    this.favoriteService.toggleFavorite(this.pokemon);
    this.checkFavorite();
  }
}