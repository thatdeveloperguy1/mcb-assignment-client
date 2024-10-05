// src/app/transaction-list/transaction-list.component.ts (continued)

import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="transaction-list-container">
      <h2>Submitted Transactions</h2>
      <mat-table [dataSource]="dataSource" matSort>
        <!-- Customer Name Column -->
        <ng-container matColumnDef="customerName">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Customer Name</mat-header-cell>
          <mat-cell *matCellDef="let transaction">{{transaction.customerName}}</mat-cell>
        </ng-container>

        <!-- Transfer Amount Column -->
        <ng-container matColumnDef="transferAmount">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Amount</mat-header-cell>
          <mat-cell *matCellDef="let transaction">{{transaction.transferAmount}}</mat-cell>
        </ng-container>

        <!-- Transfer Currency Column -->
        <ng-container matColumnDef="transferCurrency">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Currency</mat-header-cell>
          <mat-cell *matCellDef="let transaction">{{transaction.transferCurrency}}</mat-cell>
        </ng-container>

        <!-- Reference Column -->
        <ng-container matColumnDef="reference">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Reference</mat-header-cell>
          <mat-cell *matCellDef="let transaction">{{transaction.reference}}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>

      @if (errorMessage) {
        <div class="error-message">{{ errorMessage }}</div>
      }
    </div>
  `,
  styles: [`
    .transaction-list-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class TransactionListComponent implements OnInit, AfterViewInit {
  private transactionService = inject(TransactionService);

  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['customerName', 'transferAmount', 'transferCurrency', 'reference'];
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadTransactions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.dataSource.data = transactions;
      },
      error: (error: unknown) => {
        this.errorMessage = 'Failed to load transactions. Please try again later.';
        console.error('Error loading transactions:', error);
      }
    });
  }
}
