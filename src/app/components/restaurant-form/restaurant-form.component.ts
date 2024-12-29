import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RefreshService } from '../../services/refresh-service.service';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./restaurant-form.component.css'],
  templateUrl: './restaurant-form.component.html',
})
export class RestaurantFormComponent {
  name: string = '';
  location: string = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isLoading: boolean = false;
  errorMessages: string[] = []; // Holds error messages

  constructor(
    private restaurantService: RestaurantService,
    private refreshService: RefreshService
  ) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        console.log('Image Preview:', this.imagePreview); // Débogage
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  validateForm(): boolean {
    this.errorMessages = []; // Clear previous error messages

    if (this.name.length < 3) {
      this.errorMessages.push("Le nom doit contenir au moins 3 caractères");
    }

    if (this.location.length < 5) {
      this.errorMessages.push("La localisation doit contenir au moins 5 caractères");
    }

    if (!this.selectedFile) {
      this.errorMessages.push("Veuillez choisir une image");
    } else {
      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
        this.errorMessages.push("Format de fichier non autorisé");
      }
      // Example file size validation (adjust limit as per requirement)
      if (this.selectedFile.size > 5 * 1024 * 1024) { // 5 MB
        this.errorMessages.push("Le fichier est trop volumineux");
      }
    }

    return this.errorMessages.length === 0;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('Name', this.name);
      formData.append('Localisation', this.location);
      formData.append('file', this.selectedFile!);

      this.restaurantService.createRestaurant(formData)
        .subscribe({
          next: (response) => {
            this.refreshService.triggerRefresh();
            this.resetForm();
            Swal.fire({
              title: 'Succès!',
              text: 'Restaurant ajouté avec succès',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Erreur!',
              text: 'Impossible d\'ajouter le restaurant',
              icon: 'error'
            });
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }

  private resetForm(): void {
    this.name = '';
    this.location = '';
    this.selectedFile = null;
    this.imagePreview = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
