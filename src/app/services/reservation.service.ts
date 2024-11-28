import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../models/ReservationDTO';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservations';

  constructor(private http: HttpClient) { }

  createReservation(reservation: ReservationDTO): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  validateReservation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate/${id}`, {});
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
