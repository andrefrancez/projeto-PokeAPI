import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetailsPage } from './pages/details/details.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'details',
    loadComponent: () => import('./pages/details/details.page').then( m => m.DetailsPage)
  },

  {path: '', component: HomePage},
  {path: '', component: DetailsPage}
];
