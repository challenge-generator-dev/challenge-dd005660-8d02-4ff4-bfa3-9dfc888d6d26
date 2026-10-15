import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@shared/components/ErrorFallback';
import LoadingSpinner from '@shared/components/LoadingSpinner';
import Layout from '@shared/components/Layout';

// Lazy-loaded routes
const Dashboard = lazy(() => import('@features/dashboard/DashboardContainer'));
const Accounts = lazy(() => import('@features/accounts/AccountsContainer'));

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;