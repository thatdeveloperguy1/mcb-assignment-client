// Create a navbar component which woule show logo on the left and nav links for dashboard, new transaction, view transactions and logout on the right
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule ],
  template: `
    <mat-toolbar color="primary" style="display: flex; justify-content: space-between; align-items: center;">
      <span style="cursor: pointer;" routerLink="/dashboard"><img src="/mcb-logo.png" alt="MCB Logo" style="width: 100px; height: 50px;"></span>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button mat-button routerLink="/new-transaction">New Transaction</button>
        <button mat-button routerLink="/view-transactions">View Transactions</button>
        <button mat-button (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>
  `,
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  userRole: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUser()?.username || '';
    this.userRole = this.authService.getUser()?.role || '';
  }

  logout() {
    this.authService.logout();
  }

  getUsername(): string {
    return this.username;
  }

  getUserRole(): string {
    return this.userRole;
  }


}
