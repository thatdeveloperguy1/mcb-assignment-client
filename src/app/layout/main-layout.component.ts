import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class MainLayoutComponent {}
