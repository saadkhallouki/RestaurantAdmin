import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        console.log('Reservations data:', data); // Add this debug line
        this.reservations = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réservations:', error);
      }
    });
  }

  validateReservation(id: number) {
    this.reservationService.validateReservation(id).subscribe({
      next: () => {
        this.loadReservations();
        Swal.fire({
          title: 'Réservation Confirmée!',
          text: 'L\'email de confirmation a été envoyé.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Erreur lors de la validation:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la confirmation de la réservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.loadReservations();
        Swal.fire({
          title: 'Réservation Refusée!',
          text: 'L\'email de refus a été envoyé.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors du refus de la réservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'badge bg-warning';
      case 'RESERVED':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }
}
