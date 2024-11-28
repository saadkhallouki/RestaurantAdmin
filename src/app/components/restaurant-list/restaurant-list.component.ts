import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { RefreshService } from '../../services/refresh-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[] = [];
  private refreshSubscription: Subscription;
  editForm: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private refreshService: RefreshService,
    private fb: FormBuilder
  ) {
    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      setTimeout(() => {
        this.loadRestaurants();
      }, 500); // Délai de 500ms
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      localisation: ['', Validators.required],
      file: [null]
    });
  }

  ngOnInit() {
    this.loadRestaurants();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        console.log('Données reçues du backend:', data);
        // Mise à jour des URLs d'images pour les restaurants
        this.restaurants = data.map(restaurant => ({
          ...restaurant,
          imgUrl: restaurant.imgUrl // L'URL complète retournée par le backend
        }));
      },
      error: (error) => {
        console.error('Erreur de chargement:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Impossible de charger les restaurants',
          icon: 'error'
        });
      }
    });
  }
  

  deleteRestaurant(restaurant: Restaurant) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer le restaurant "${restaurant.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.restaurantService.deleteRestaurant(restaurant.restaurantID).subscribe({
          next: () => {
            this.restaurants = this.restaurants.filter(r => r.restaurantID !== restaurant.restaurantID);
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le restaurant a été supprimé avec succès.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Erreur de suppression:', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de la suppression.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  editRestaurant(restaurant: Restaurant) {
    Swal.fire({
      title: 'Modifier le restaurant',
      html: `
        <form id="editForm">
          <input id="name" class="swal2-input" placeholder="Nom" value="${restaurant.name}">
          <input id="localisation" class="swal2-input" placeholder="Localisation" value="${restaurant.location}">
          <input id="file" type="file" class="swal2-file" accept="image/*">
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const formData = new FormData();
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const localisation = (document.getElementById('localisation') as HTMLInputElement).value;
        const fileInput = document.getElementById('file') as HTMLInputElement;
        
        formData.append('Name', name);
        formData.append('Localisation', localisation);
        if (fileInput.files && fileInput.files[0]) {
          formData.append('file', fileInput.files[0]);
        }
        
        return this.restaurantService.updateRestaurant(restaurant.restaurantID, formData).toPromise()
          .then(response => {
            this.loadRestaurants();
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(`Erreur: ${error.message}`);
          });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Succès!',
          text: 'Restaurant modifié avec succès',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}