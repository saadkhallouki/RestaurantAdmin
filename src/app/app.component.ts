import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RestaurantFormComponent,
    RestaurantListComponent
  ],
  template: `
    <div class="container">
      <app-restaurant-form></app-restaurant-form>
      <app-restaurant-list></app-restaurant-list>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'restaurant-frontend';
}
