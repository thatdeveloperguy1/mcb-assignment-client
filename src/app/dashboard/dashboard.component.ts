// src/app/dashboard/dashboard.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h1>Welcome, {{ authService.getUser()?.username }}!</h1>
      <nav>
        <ul>
          <li><a routerLink="/new-transaction">New Transaction</a></li>
          <li><a routerLink="/view-transactions">View Submitted Transactions</a></li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 80vh;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    nav ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
    nav ul li {
      margin-bottom: 10px;
      min-width: 250px;
      text-align: center;
    }
    nav ul li a {
      display: block;
      padding: 10px;
      background-color: #f0f0f0;
      text-decoration: none;
      color: #333;
      border-radius: 5px;
    }
    nav ul li a:hover {
      background-color: #e0e0e0;
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
}
