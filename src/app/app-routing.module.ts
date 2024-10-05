import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTransactionComponent } from './transaction/new-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new-transaction', component: NewTransactionComponent },
      { path: 'view-transactions', component: TransactionListComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
