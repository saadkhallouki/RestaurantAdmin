import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RefreshService } from '../../services/refresh-service.service';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFormComponent {
  name: string = '';
  location: string = '';
  selectedFile: File | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private refreshService: RefreshService
  ) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('Name', this.name);
      formData.append('Localisation', this.location);
      formData.append('file', this.selectedFile);

      this.restaurantService.createRestaurant(formData)
        .subscribe({
          next: (response) => {
            console.log('Restaurant created successfully', response);
            // Déclencher le rafraîchissement
            this.refreshService.triggerRefresh();
            // Réinitialiser le formulaire
            this.resetForm();
            // Afficher une notification de succès
            Swal.fire({
              title: 'Succès!',
              text: 'Restaurant ajouté avec succès',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error creating restaurant:', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Impossible d\'ajouter le restaurant',
              icon: 'error'
            });
          }
        });
    }
  }

  private resetForm(): void {
    this.name = '';
    this.location = '';
    this.selectedFile = null;
    // Réinitialiser le champ de fichier
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}