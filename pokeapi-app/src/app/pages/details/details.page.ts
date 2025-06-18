import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonList, IonItem } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
            IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
            IonCardContent, IonChip, IonList, IonItem]
})
export class DetailsPage implements OnInit {
  pokemon: any;
  id!: number;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonById(this.id).subscribe((data) => {
      this.pokemon = data;
    });
  }

}
