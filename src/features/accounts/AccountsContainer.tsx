import { useEffect, useCallback, Suspense, lazy } from 'react';
import { useAccountsStore } from './accountsStore';
import type { Account, AccountFilters, CreateAccountDto } from '@/types';
import { api } from '@/services/api';

const AccountsView = lazy(() => import('./AccountsView').then(module => ({ default: module.AccountsView })));

interface AccountsContainerProps {
  initialFilters?: AccountFilters;
  onAccountCreated?: (account: Account) => void;
}

export function AccountsContainer({ initialFilters, onAccountCreated }: AccountsContainerProps) {
  const {
    accounts,
    isLoading,
    error,
    filters,
    pagination,
    setAccounts,
    setLoading,
    setError,
    setFilters,
    setPagination,
    addAccount,
    updateAccount,
    removeAccount
  } = useAccountsStore();

  const fetchAccounts = useCallback(async (page = 1, accountFilters?: AccountFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(pagination.limit));

      if (accountFilters?.type) {
        params.append('type', accountFilters.type);
      }
      if (accountFilters?.status) {
        params.append('status', accountFilters.status);
      }
      if (accountFilters?.search) {
        params.append('search', accountFilters.search);
      }

      const response = await api.get<{ data: Account[]; total: number }>(`/accounts?${params.toString()}`);
      
      setAccounts(response.data.data);
      setPagination({
        ...pagination,
        page,
        total: response.data.total,
        totalPages: Math.ceil(response.data.total / pagination.limit)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit, setAccounts, setLoading, setError, setPagination]);

  useEffect(() => {
    fetchAccounts(1, initialFilters);
  }, []);

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters, setFilters]);

  const handlePageChange = useCallback((newPage: number) => {
    fetchAccounts(newPage, filters);
  }, [fetchAccounts, filters]);

  const handleFilterChange = useCallback((newFilters: AccountFilters) => {
    setFilters(newFilters);
    fetchAccounts(1, newFilters);
  }, [fetchAccounts, setFilters]);

  const handleCreateAccount = useCallback(async (createDto: CreateAccountDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<Account>('/accounts', createDto);
      addAccount(response.data);
      if (onAccountCreated) {
        onAccountCreated(response.data);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addAccount, onAccountCreated, setError, setLoading]);

  const handleUpdateAccount = useCallback(async (id: string, updateDto: Partial<CreateAccountDto>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch<Account>(`/accounts/${id}`, updateDto);
      updateAccount(id, response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateAccount, setError, setLoading]);

  const handleDeleteAccount = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/accounts/${id}`);
      removeAccount(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [removeAccount, setError, setLoading]);

  const handleSearch = useCallback((searchTerm: string) => {
    handleFilterChange({ ...filters, search: searchTerm });
  }, [filters, handleFilterChange]);

  return (
    <Suspense fallback={<div role="status" aria-label="Cargando vista de cuentas">Cargando...</div>}>
      <AccountsView
        accounts={accounts}
        isLoading={isLoading}
        error={error}
        filters={filters}
        pagination={pagination}
        onPageChange={handlePageChange}
        onFilterChange={handleFilterChange}
        onCreateAccount={handleCreateAccount}
        onUpdateAccount={handleUpdateAccount}
        onDeleteAccount={handleDeleteAccount}
        onSearch={handleSearch}
      />
    </Suspense>
  );
}