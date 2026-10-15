import { useEffect, useState, useCallback } from 'react';
import { DashboardView } from './DashboardView';
import type { Account, Transaction } from '@/types';
import { api } from '@/services/api';

interface DashboardData {
  accounts: Account[];
  recentTransactions: Transaction[];
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function DashboardContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [accountsResponse, transactionsResponse] = await Promise.all([
        api.get<Account[]>('/accounts'),
        api.get<Transaction[]>('/transactions?limit=5&sort=date:desc')
      ]);

      const accounts = accountsResponse.data;
      const recentTransactions = transactionsResponse.data;

      const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyTransactions = recentTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });

      const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);

      setData({
        accounts,
        recentTransactions,
        totalBalance,
        monthlyIncome,
        monthlyExpenses
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <DashboardView isLoading={true} />;
  }

  if (error) {
    return <DashboardView error={error} onRetry={handleRefresh} />;
  }

  return (
    <DashboardView
      accounts={data?.accounts ?? []}
      recentTransactions={data?.recentTransactions ?? []}
      totalBalance={data?.totalBalance ?? 0}
      monthlyIncome={data?.monthlyIncome ?? 0}
      monthlyExpenses={data?.monthlyExpenses ?? 0}
      onRefresh={handleRefresh}
    />
  );
}