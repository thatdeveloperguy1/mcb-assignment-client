// src/app/services/customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const customers = [
  {
    customerNumber: '123',
    customerName: 'John Doe',
    customerAddress: '123 Main St, Anytown, USA',
    customerPhone: '5551234',
    region: 'USA'
  },
  {
    customerNumber: '456',
    customerName: 'Jane Doe',
    customerAddress: '456 Main St, Anytown, USA',
    customerPhone: '5551235',
    region: 'USA'
  }
];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  private loadCustomers() {
    return of(customers);
  }

  getCustomerDetails(customerNumber: string): Observable<any> {
    return of(customers.find(c => c.customerNumber == customerNumber));
  }
}
