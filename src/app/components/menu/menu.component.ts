import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-utensils"></i> Restaurant Admin
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/restaurants" routerLinkActive="active">
                <i class="fas fa-store"></i> Restaurants
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/restaurants/add" routerLinkActive="active">
                <i class="fas fa-plus-circle"></i> Nouveau Restaurant
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/reservations" routerLinkActive="active">
                <i class="fas fa-calendar-check"></i> Réservations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      padding: 1rem 0;
      box-shadow: 0 2px 15px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .navbar-brand {
      color: white;
      font-weight: 600;
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
      transition: all 0.3s ease;
    }

    .navbar-brand:hover {
      transform: translateY(-2px);
      color: #fff;
    }

    .nav-link {
      color: rgba(255,255,255,0.9) !important;
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: rgba(255,255,255,0.2);
      color: white !important;
      font-weight: 500;
    }

    .fas {
      margin-right: 0.5rem;
    }
  `]
})
export class MenuComponent {}