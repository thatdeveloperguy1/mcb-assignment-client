// src/app/login/login.component.ts

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div style="height: 100vh; width:500px; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 40px;">
      <img src="/mcb-logo.png" alt="MCB Logo" style="width: 200px; height: 100px;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%;">
      <mat-card style="padding: 20px; width:100%;">
      <form (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%;">

        <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 10px; align-items: center;">
          <mat-label>Username</mat-label>
          <mat-form-field appearance="outline" style="height: 60px; margin-top: 15px;">
            <input matInput type="text" id="username" [(ngModel)]="username" name="username" required>
          </mat-form-field>
        </div>

        <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 10px; align-items: center;">
          <label for="password">Password</label>
          <mat-form-field appearance="outline" style="height: 60px; margin-top: 15px;">
            <input matInput type="password" id="password" [(ngModel)]="password" name="password" required>
          </mat-form-field>
        </div>
        <button mat-flat-button color="primary" type="submit">Login</button>

      </form>

      @if (errorMessage()) {
        <p class="error">{{ errorMessage() }}</p>
      }
      </mat-card>
      </div>

    </div>

  `,
  styles: [`
    .login-container {
      max-width: 300px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .error {
      color: red;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = signal<string>('');

  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage.set('Invalid credentials');
        }
      },
      error: (err) => {
        this.errorMessage.set('An error occurred. Please try again.');
        console.error('Login error:', err);
      }
    });
  }
}
