import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, CommonModule, TitleCasePipe,
    IonCardHeader, IonCardTitle, IonButton],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 0;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe((res) => {
      this.pokemons = res;
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadPokemons;
    }
  }

  goToDetails(id: Number) {
    this.router.navigate(['/details', id]);
  }
}
