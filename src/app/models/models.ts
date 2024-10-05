// src/app/models/models.ts

export interface Customer {
  customerNumber: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Transaction {
  id?: string;
  reference: string;
  customerNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  transferAmount: number;
  transferCurrency: string;
  beneficiaryBank: string;
  beneficiaryAccountNumber: string;
  paymentDetails: string;
  cardDetails: string;
  region: string;
}
