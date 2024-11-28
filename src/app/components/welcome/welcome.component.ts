import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule,CommonModule],
  template: `
    <div class="container">
      <div class="text-center">
        <h1 class="display-4 mb-4">Bienvenue Admin</h1>
        <p class="lead">
          Gérez vos restaurants facilement à partir du menu de navigation.
        </p>
        <div class="mt-4">
          <a routerLink="/restaurants" class="btn btn-primary me-3">
            Voir les Restaurants
          </a>
          <a routerLink="/restaurants/add" class="btn btn-success">
            Ajouter un Restaurant
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding-top: 5rem;
    }
    
    .display-4 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    
    .lead {
      color: #7f8c8d;
      margin-bottom: 2rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .btn-primary {
      background-color: #3498db;
      border-color: #3498db;
    }
    
    .btn-success {
      background-color: #2ecc71;
      border-color: #2ecc71;
    }
  `]
})
export class WelcomeComponent {}