// src/app/services/auth.service.ts

import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  role: 'admin' | 'normal';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private currentUser = signal<User | null>(this.getUser());

  login(username: string, password: string): Observable<User | null> {
    // Mock login logic - replace with actual API call
    if (username === 'admin' && password === 'admin') {
      const user: User = { username: 'admin', role: 'admin' };
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    } else if (username === 'user' && password === 'user') {
      const user: User = { username: 'user', role: 'normal' };
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    } else if(username === 'john' && password === 'john') {
      const user: User = { username: 'John Doe', role: 'admin' };
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    }
    return of(null);
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  getUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
