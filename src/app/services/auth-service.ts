// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUrl = 'http://localhost:8080/public/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  signup(userData: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.signUrl}/register`, userData);
  }
  signin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.signUrl}/login`, credentials);
  }
}
