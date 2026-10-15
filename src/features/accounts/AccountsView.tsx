import React from 'react';
import type { Account, AccountFilters } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

interface AccountsViewProps {
  accounts: Account[];
  filters: AccountFilters;
  onFilterChange: (filters: AccountFilters) => void;
  onSelectAccount: (accountId: string) => void;
  onCreateAccount: () => void;
  onTransfer: (accountId: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  filters,
  onFilterChange,
  onSelectAccount,
  onCreateAccount,
  onTransfer,
  isLoading,
  error,
}) => {
  const handleFilterInputChange = (field: keyof AccountFilters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({ search: '', type: 'all', status: 'all' });
  };

  const filteredAccounts = React.useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        !filters.search ||
        account.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        account.accountNumber.includes(filters.search);
      const matchesType = filters.type === 'all' || account.type === filters.type;
      const matchesStatus = filters.status === 'all' || account.status === filters.status;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [accounts, filters]);

  const getAccountTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      checking: 'Cuenta Corriente',
      savings: 'Cuenta de Ahorros',
      investment: 'Inversión',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string): string => {
    return status === 'active' ? '#22c55e' : status === 'inactive' ? '#ef4444' : '#f59e0b';
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      active: 'Activa',
      inactive: 'Inactiva',
      blocked: 'Bloqueada',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="accounts-view" role="status" aria-live="polite">
        <div className="accounts-view__loading">
          <div className="spinner" aria-hidden="true"></div>
          <p>Cargando cuentas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="accounts-view" role="alert">
        <Card className="accounts-view__error">
          <h2>Error al cargar cuentas</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Reintentar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="accounts-view">
      <header className="accounts-view__header">
        <h1>Cuentas Bancarias</h1>
        <Button onClick={onCreateAccount} variant="primary">
          Nueva Cuenta
        </Button>
      </header>

      <section className="accounts-view__filters" aria-label="Filtros de búsqueda">
        <div className="filter-group">
          <label htmlFor="search-filter">Buscar</label>
          <input
            id="search-filter"
            type="text"
            placeholder="Nombre o número de cuenta..."
            value={filters.search}
            onChange={(e) => handleFilterInputChange('search', e.target.value)}
            className="filter-input"
            aria-describedby="search-help"
          />
          <span id="search-help" className="sr-only">
            Buscar por nombre de cuenta o número
          </span>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Tipo</label>
          <select
            id="type-filter"
            value={filters.type}
            onChange={(e) => handleFilterInputChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los tipos</option>
            <option value="checking">Cuenta Corriente</option>
            <option value="savings">Cuenta de Ahorros</option>
            <option value="investment">Inversión</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterInputChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activa</option>
            <option value="inactive">Inactiva</option>
            <option value="blocked">Bloqueada</option>
          </select>
        </div>

        <Button onClick={handleClearFilters} variant="secondary">
          Limpiar Filtros
        </Button>
      </section>

      <section className="accounts-view__list" aria-label="Lista de cuentas">
        {filteredAccounts.length === 0 ? (
          <Card className="accounts-view__empty">
            <p>No se encontraron cuentas con los filtros aplicados.</p>
          </Card>
        ) : (
          <ul className="accounts-grid" role="list">
            {filteredAccounts.map((account) => (
              <li key={account.id} className="accounts-grid__item">
                <Card className="account-card">
                  <div className="account-card__header">
                    <h3 className="account-card__title">{account.name}</h3>
                    <span
                      className="account-card__status"
                      style={{ backgroundColor: getStatusColor(account.status) }}
                      aria-label={`Estado: ${getStatusLabel(account.status)}`}
                    >
                      {getStatusLabel(account.status)}
                    </span>
                  </div>

                  <div className="account-card__details">
                    <div className="account-card__row">
                      <span className="account-card__label">Número:</span>
                      <span className="account-card__value">{account.accountNumber}</span>
                    </div>
                    <div className="account-card__row">
                      <span className="account-card__label">Tipo:</span>
                      <span className="account-card__value">
                        {getAccountTypeLabel(account.type)}
                      </span>
                    </div>
                    <div className="account-card__row">
                      <span className="account-card__label">Saldo:</span>
                      <span className="account-card__value account-card__balance">
                        {formatCurrency(account.balance)}
                      </span>
                    </div>
                    {account.lastTransactionDate && (
                      <div className="account-card__row">
                        <span className="account-card__label">Última transacción:</span>
                        <span className="account-card__value">
                          {formatDate(account.lastTransactionDate)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="account-card__actions">
                    <Button
                      onClick={() => onSelectAccount(account.id)}
                      variant="secondary"
                      size="small"
                      aria-label={`Ver detalles de ${account.name}`}
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      onClick={() => onTransfer(account.id)}
                      variant="primary"
                      size="small"
                      disabled={account.status !== 'active'}
                      aria-label={`Realizar transferencia desde ${account.name}`}
                    >
                      Transferir
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="accounts-view__footer">
        <p aria-live="polite">
          Mostrando {filteredAccounts.length} de {accounts.length} cuentas
        </p>
      </footer>
    </div>
  );
};