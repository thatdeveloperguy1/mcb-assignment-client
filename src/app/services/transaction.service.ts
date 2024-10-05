// src/app/services/transaction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';

const transactions: Transaction[] = [
  {
    reference: '1',
    customerNumber: '1',
    customerName: 'John Doe',
    customerAddress: '123 Main St, Anytown, USA',
    customerPhone: '1234567890',
    transferAmount: 100,
    transferCurrency: 'USD',
    beneficiaryBank: 'Bank of America',
    beneficiaryAccountNumber: '1234567890',
    paymentDetails: 'Payment for goods',
    cardDetails: 'Visa',
    region: 'USA'
  },
  {
    reference: '2',
    customerNumber: '2',
    customerName: 'Jane Doe',
    customerAddress: '456 Main St, Anytown, USA',
    customerPhone: '1234567890',
    transferAmount: 200,
    transferCurrency: 'USD',
    beneficiaryBank: 'Bank of America',
    beneficiaryAccountNumber: '1234567890',
    paymentDetails: 'Payment for services',
    cardDetails: 'MasterCard',
    region: 'USA'
  }
];



@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://api.example.com/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    // return this.http.get<Transaction[]>(this.apiUrl);
    return of(transactions);
  }

  submitTransaction(transaction: Transaction): Observable<Transaction> {
    console.log('submitTransaction called with transaction', transaction);
    // return this.http.post<Transaction>(this.apiUrl, transaction);
    transactions.push(transaction);
    return of(transaction);
  }
}
