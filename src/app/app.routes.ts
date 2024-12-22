import { Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { SignUpComponent } from './components/sign-up-form/sign-up-form.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sign-in', loadComponent :()=>import('./components/sign-in-form/sign-in-form.component').then((m)=>m.SignInFormComponent) },  // Path for SignIn form
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'restaurants',
    children: [
      { path: '', component: RestaurantListComponent },
      { path: 'add', component: RestaurantFormComponent }
    ]
  },
  {
    path: 'reservations',
    loadComponent: () => import('./components/reservation/reservation.component')
      .then(m => m.ReservationsComponent)
  }
];
