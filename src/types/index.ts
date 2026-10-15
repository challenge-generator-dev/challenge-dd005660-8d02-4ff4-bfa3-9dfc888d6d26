/**
 * Tipos principales para la aplicación de banca digital.
 * Incluye entidades del dominio y DTOs para comunicación con la API.
 */

export interface Account {
  id: string;
  accountNumber: string;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  balance: number;
  currency: string;
  lastTransactionDate?: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  description: string;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type AccountFilters = {
  type?: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  minBalance?: number;
  maxBalance?: number;
};

export type TransactionFilters = {
  accountId: string;
  type?: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  minAmount?: number;
  maxAmount?: number;
  dateFrom?: string;
  dateTo?: string;
};

// DTOs para solicitudes a la API
export interface CreateAccountDto {
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  initialBalance: number;
  currency: string;
}

export interface TransferDto {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}