// src/app/transaction/new-transaction.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../services/customer.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  template: `
    <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()">
      <mat-radio-group formControlName="customerType">
        <mat-radio-button value="new">New</mat-radio-button>
        <mat-radio-button value="existing">Existing</mat-radio-button>
      </mat-radio-group>

      <mat-form-field>
      <mat-label>Reference</mat-label>
        <input matInput formControlName="reference" placeholder="Reference" readonly>
      </mat-form-field>

      <mat-form-field>
      <mat-label>Customer Number</mat-label>

        <input matInput formControlName="customerNumber" placeholder="Customer Number" (blur)="fetchCustomerDetails()">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Customer Name</mat-label>
        <input matInput formControlName="customerName" placeholder="Customer Name">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Customer Address</mat-label>

        <input matInput formControlName="customerAddress" placeholder="Customer Address">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Customer Phone Number</mat-label>

        <input matInput formControlName="customerPhone" placeholder="Customer Phone Number">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Transfer Amount </mat-label>
        <input matInput formControlName="transferAmount" placeholder="Transfer Amount">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Transfer Currency </mat-label>

        <mat-select formControlName="transferCurrency" placeholder="Transfer Currency">
          <mat-option value="AED">AED</mat-option>
          <mat-option value="EUR">EUR</mat-option>
          <mat-option value="CHF">CHF</mat-option>
          <mat-option value="MUR">MUR</mat-option>
          <mat-option value="USD">USD</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
      <mat-label>Beneficiary Bank </mat-label>

        <input matInput formControlName="beneficiaryBank" placeholder="Beneficiary Bank">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Beneficiary Account Number</mat-label>

        <input matInput formControlName="beneficiaryAccountNumber" placeholder="Beneficiary Account Number">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Payment Details</mat-label>

        <textarea matInput formControlName="paymentDetails" placeholder="Payment Details"></textarea>
      </mat-form-field>

      <mat-form-field>
      <mat-label>Credit/Debit Card Details</mat-label>

        <input matInput formControlName="cardDetails" placeholder="Credit/Debit Card Details">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Region</mat-label>

        <mat-select formControlName="region" placeholder="Region">
          <mat-option value="Port Louis">Port Louis</mat-option>
          <mat-option value="Curepipe">Curepipe</mat-option>
          <mat-option value="Vacoas">Vacoas</mat-option>
          <mat-option value="Port Mathurin">Port Mathurin</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="transactionForm.invalid">Submit</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;
    }
    mat-form-field {
      margin-bottom: 20px;
    }
  `]
})
export class NewTransactionComponent {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  transactionForm: FormGroup;

  public customPatternValid(config: any): ValidatorFn {
    return (control: any) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
}

  constructor() {
    this.transactionForm = this.fb.group({
      customerType: ['existing', Validators.required],
      reference: ['', Validators.required],
      customerNumber: ['', Validators.required], // We'll set this dynamically
      customerName: ['', Validators.required],
      customerAddress: [''],
      // customerPhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      customerPhone: ['', [this.customPatternValid({pattern: /^\d+$/, msg: 'Please enter a valid phone number'})]],
      transferAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      transferCurrency: ['', Validators.required],
      beneficiaryBank: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      beneficiaryAccountNumber: ['', Validators.required],
      paymentDetails: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      cardDetails: ['', Validators.required],
      region: ['', Validators.required]
    });

    // Set up dynamic validation for customerNumber
    this.transactionForm.get('customerType')?.valueChanges.subscribe(type => {
      const customerNumberControl = this.transactionForm.get('customerNumber');
      if (type === 'existing') {
        customerNumberControl?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      } else {
        customerNumberControl?.clearValidators();
      }
      customerNumberControl?.updateValueAndValidity();
    });
  }

  errorMessage = signal<string>('');

  ngOnInit() {
    this.generateReference();
    this.setConditionalValidators();
  }

  generateReference() {
    const date = new Date();
    const prefix = 'CUS';
    const datePart = date.getFullYear().toString() +
                     (date.getMonth() + 1).toString().padStart(2, '0') +
                     date.getDate().toString().padStart(2, '0');
    const sequencePart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const reference = `${prefix}${datePart}${sequencePart}`;
    this.transactionForm.patchValue({ reference });
  }

  setConditionalValidators() {
    this.transactionForm.get('region')?.valueChanges.subscribe(region => {
      const addressControl = this.transactionForm.get('customerAddress');
      if (region === 'Port Mathurin') {
        addressControl?.clearValidators();
      } else {
        addressControl?.setValidators(Validators.required);
      }
      addressControl?.updateValueAndValidity();
    });

    this.transactionForm.get('customerType')?.valueChanges.subscribe(type => {
      const controls = ['customerNumber', 'customerAddress', 'customerPhone'];
      if (type === 'new') {
        // disable all controls and make them empty
        controls.forEach(control => {
          this.transactionForm.get(control)?.disable();
          this.transactionForm.get(control)?.setValue('');
        });
      } else {
        controls.forEach(control => this.transactionForm.get(control)?.enable());
      }
    });
  }

  fetchCustomerDetails() {
    const customerNumber = this.transactionForm.get('customerNumber')?.value;
    if (customerNumber) {
      this.customerService.getCustomerDetails(customerNumber).subscribe({
        next: (customer) => {
          if (customer) {
            this.transactionForm.patchValue({
              customerName: customer.customerName,
              customerAddress: customer.customerAddress,
              customerPhone: customer.customerPhone
            });
          } else {
            this.errorMessage.set('Customer not found.');
          }
        },
        error: (err) => {
          this.errorMessage.set('Failed to fetch customer details. Please try again.');
          console.error('Error fetching customer details:', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        ...this.transactionForm.value,
        reference: this.transactionForm.get('reference')?.value
      };
      console.log('newTransaction', newTransaction);
      this.transactionService.submitTransaction(newTransaction).subscribe({
        next: () => {
          console.log('transaction submitted successfully');
          this.router.navigate(['/dashboard']);
        },
        error: (err: Error) => {
          this.errorMessage.set('Failed to submit transaction. Please try again.');
          console.error('Error submitting transaction:', err);
        }
      });
    }
  }

  submitTransaction() {
    this.transactionService.submitTransaction(this.transactionForm.value).subscribe({
      next: (response) => {
        // Handle successful submission
      },
      error: (err: Error) => {
        // Handle error
      }
    });
  }
}
