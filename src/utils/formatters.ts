/**
 * Utility functions for formatting data according to banking standards.
 * All formatters handle edge cases and return localized values.
 */

export const CURRENCY_LOCALE = 'es-CO';
export const DATE_LOCALE = 'es-CO';

export interface FormatCurrencyOptions {
  currency?: string;
  showSymbol?: boolean;
  decimals?: number;
  locale?: string;
}

export interface FormatDateOptions {
  format?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
  timeZone?: string;
}

/**
 * Formats a number as currency according to Colombian banking standards.
 * Uses COP (Colombian Peso) with 2 decimal places by default.
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    currency = 'COP',
    showSymbol = true,
    decimals = 2,
    locale = CURRENCY_LOCALE,
  } = options;

  if (!Number.isFinite(amount)) {
    return '$0,00';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
}

/**
 * Formats a number as a percentage with configurable decimals.
 */
export function formatPercentage(
  value: number,
  decimals: number = 2,
  locale: string = CURRENCY_LOCALE
): string {
  if (!Number.isFinite(value)) {
    return '0%';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value / 100);
}

/**
 * Formats a date according to banking standards.
 * Short: dd/MM/yyyy, Medium: dd MMM yyyy, Long: dd MMMM yyyy, Full: full date
 */
export function formatDate(
  date: Date | string | number,
  options: FormatDateOptions = {}
): string {
  const {
    format = 'medium',
    locale = DATE_LOCALE,
    timeZone = 'America/Bogota',
  } = options;

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  }[format];

  return new Intl.DateTimeFormat(locale, {
    ...formatOptions,
    timeZone,
  }).format(dateObj);
}

/**
 * Formats a date with time according to banking standards.
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = DATE_LOCALE,
  timeZone: string = 'America/Bogota'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(dateObj);
}

/**
 * Formats an account number with masking for security.
 * Shows only last 4 digits for sensitive account information.
 */
export function formatAccountNumber(accountNumber: string, masked: boolean = false): string {
  if (!accountNumber || typeof accountNumber !== 'string') {
    return '';
  }

  const cleanNumber = accountNumber.replace(/\D/g, '');
  
  if (masked) {
    const lastFour = cleanNumber.slice(-4);
    return `****${lastFour}`;
  }

  return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Formats a document ID (CC, CE, NIT) with proper separation.
 */
export function formatDocumentId(documentId: string): string {
  if (!documentId || typeof documentId !== 'string') {
    return '';
  }

  const cleanNumber = documentId.replace(/\D/g, '');
  
  if (cleanNumber.length <= 4) {
    return cleanNumber;
  }

  const prefix = cleanNumber.slice(0, -4);
  const suffix = cleanNumber.slice(-4);
  
  return `${Number(prefix).toLocaleString()}-${suffix}`;
}

/**
 * Formats a phone number according to Colombian standards.
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  const cleanNumber = phone.replace(/\D/g, '');
  
  if (cleanNumber.length === 10) {
    return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
  }
  
  if (cleanNumber.length === 7) {
    return `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3)}`;
  }

  return phone;
}

/**
 * Formats a transaction amount with color indication.
 * Returns object with formatted value and sign.
 */
export function formatTransactionAmount(
  amount: number,
  type: 'credit' | 'debit' | 'neutral' = 'neutral'
): { value: string; isPositive: boolean } {
  const isPositive = type === 'credit' || (type === 'neutral' && amount > 0);
  const formattedValue = formatCurrency(Math.abs(amount));
  
  return {
    value: formattedValue,
    isPositive,
  };
}

/**
 * Formats a large number with K, M, B suffixes for compact display.
 */
export function formatCompactNumber(
  value: number,
  locale: string = CURRENCY_LOCALE
): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Parses a currency string to number.
 * Handles various formats including COP with dots and decimals.
 */
export function parseCurrency(value: string): number {
  if (!value || typeof value !== 'string') {
    return 0;
  }

  const cleanValue = value
    .replace(/[^0-9.,\-]/g, '')
    .replace(/,(?=\d{2}$)/, '.')
    .replace(/,/g, '');

  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}