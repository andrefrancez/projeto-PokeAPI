import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private key = 'favorites';

  getFavorites(): any[] {
    const json = localStorage.getItem(this.key);
    return json ? JSON.parse(json) : [];
  }

  isFavorite(id: number): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((p: any) => p.id === id);
  }

  addFavorite(p: any) {
    const fav = this.getFavorites();
    if (!fav.some(poke => poke.id === p.id)) {
      fav.push(p);
      localStorage.setItem(this.key, JSON.stringify(fav));
    }
  }

  removeFavorite(id: number) {
    const fav = this.getFavorites().filter(p => p.id !== id);
    localStorage.setItem(this.key, JSON.stringify(fav));
  }

  toggleFavorite(pokemon: any) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex((p: any) => p.id === pokemon.id);

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push({ id: pokemon.id, name: pokemon.name });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
