// src/app/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="signup-container">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <h2>Sign Up</h2>

        <div>
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            placeholder="Enter your name"
          />
          <div *ngIf="signupForm.get('name')?.invalid && signupForm.get('name')?.touched">
            <small>Name is required.</small>
          </div>
        </div>

        <div>
          <label for="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            formControlName="lastName"
            placeholder="Enter your last name"
          />
          <div *ngIf="signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched">
            <small>Last Name is required.</small>
          </div>
        </div>

        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="Enter your email"
          />
          <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched">
            <small>Email is required and must be valid.</small>
          </div>
        </div>



        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="Enter your password"
          />
          <div *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched">
            <small>Password is required (minimum 6 characters).</small>
          </div>
        </div>

        <div *ngIf="errorMessage">
          <small class="error">{{ errorMessage }}</small>
        </div>
        <div *ngIf="successMessage">
          <small class="success">{{ successMessage }}</small>
        </div>

        <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
      </form>
    </div>
  `,
  styles: [
    `
      .signup-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-align: center;
        margin-bottom: 20px;
      }

      label {
        font-weight: bold;
      }

      input {
        width: 100%;
        padding: 8px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        width: 100%;
        padding: 10px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:disabled {
        background-color: #ccc;
      }

      .error {
        color: red;
        font-size: 0.875rem;
      }

      .success {
        color: green;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class SignUpComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.authService.signup(userData).subscribe({
        next: (response) => {
          setTimeout(() => this.router.navigate(['/sign-in']), 2000);
          this.successMessage = response;
           // Redirect after signup
        },        error: (err) => {
          this.errorMessage = 'Signup failed. Please try again.';
        },
      });
    }
  }
}
