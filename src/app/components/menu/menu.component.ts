import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Restaurant Admin</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/restaurants" routerLinkActive="active">
                Restaurants
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/restaurants/add" routerLinkActive="active">
                Ajouter Restaurant
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/reservations" routerLinkActive="active">
                Réservations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      margin-bottom: 2rem;
    }
    .active {
      font-weight: bold;
    }
  `]
})
export class MenuComponent {}