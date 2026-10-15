import { memo } from 'react';
import type { Account, Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

interface DashboardViewProps {
  accounts?: Account[];
  recentTransactions?: Transaction[];
  totalBalance?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onRetry?: () => void;
}

export const DashboardView = memo(function DashboardView({
  accounts = [],
  recentTransactions = [],
  totalBalance = 0,
  monthlyIncome = 0,
  monthlyExpenses = 0,
  isLoading = false,
  error = null,
  onRefresh,
  onRetry
}: DashboardViewProps) {
  if (isLoading) {
    return (
      <div className="dashboard-loading" role="status" aria-label="Cargando dashboard">
        <div className="loading-spinner" />
        <p>Cargando información de tu cuenta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error" role="alert">
        <Card>
          <h2>Error al cargar</h2>
          <p>{error}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Reintentar
            </Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Mi Dashboard</h1>
        {onRefresh && (
          <Button onClick={onRefresh} variant="secondary" aria-label="Actualizar datos">
            Actualizar
          </Button>
        )}
      </header>

      <section className="dashboard-summary" aria-label="Resumen de cuentas">
        <Card className="summary-card balance">
          <h3>Balance Total</h3>
          <p className="amount">{formatCurrency(totalBalance)}</p>
        </Card>

        <Card className="summary-card income">
          <h3>Ingresos del Mes</h3>
          <p className="amount positive">{formatCurrency(monthlyIncome)}</p>
        </Card>

        <Card className="summary-card expenses">
          <h3>Gastos del Mes</h3>
          <p className="amount negative">{formatCurrency(monthlyExpenses)}</p>
        </Card>
      </section>

      <section className="dashboard-accounts" aria-label="Cuentas">
        <h2>Mis Cuentas</h2>
        {accounts.length === 0 ? (
          <p className="empty-state">No tienes cuentas registradas</p>
        ) : (
          <ul className="accounts-list">
            {accounts.map(account => (
              <li key={account.id} className="account-item">
                <Card>
                  <div className="account-info">
                    <h4>{account.name}</h4>
                    <span className="account-number">{account.accountNumber}</span>
                  </div>
                  <div className="account-balance">
                    <span className={`balance-amount ${account.balance >= 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(account.balance)}
                    </span>
                    <span className="account-type">{account.type}</span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-transactions" aria-label="Transacciones recientes">
        <h2>Transacciones Recientes</h2>
        {recentTransactions.length === 0 ? (
          <p className="empty-state">No hay transacciones recientes</p>
        ) : (
          <table className="transactions-table" aria-label="Lista de transacciones">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(transaction => (
                <tr key={transaction.id} className={`transaction-${transaction.type}`}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.description}</td>
                  <td>
                    <span className={`transaction-type-badge ${transaction.type}`}>
                      {transaction.type === 'credit' ? 'Ingreso' : 'Gasto'}
                    </span>
                  </td>
                  <td className={`amount ${transaction.type === 'credit' ? 'positive' : 'negative'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
});