// src/app/signin.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="signin-container">
      <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
        <h2>Sign In</h2>

        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="Enter your email"
          />
          <div *ngIf="signinForm.get('email')?.invalid && signinForm.get('email')?.touched">
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
          <div *ngIf="signinForm.get('password')?.invalid && signinForm.get('password')?.touched">
            <small>Password is required.</small>
          </div>
        </div>

        <div *ngIf="errorMessage">
          <small class="error">{{ errorMessage }}</small>
        </div>
        <div *ngIf="successMessage">
          <small class="success">{{ successMessage }}</small>
        </div>

        <button type="submit" [disabled]="signinForm.invalid">Sign In</button>
      </form>
    </div>
  `,
  styles: [
    `
      .signin-container {
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
        background-color: #007bff;
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
export class SignInFormComponent {
  signinForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const credentials = this.signinForm.value;
      this.authService.signin(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Store token
          this.successMessage = 'Login successful! Redirecting...';
          console.log(localStorage.getItem('token')); 
          setTimeout(() => this.router.navigate(['/add-restaurant']), 2000); // Redirect to dashboard
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        },
      });
    }
  }
}
