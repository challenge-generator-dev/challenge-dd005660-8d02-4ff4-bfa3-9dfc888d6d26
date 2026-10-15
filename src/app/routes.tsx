import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@shared/components/Spinner';

const DashboardContainer = lazy(() =>
  import('@features/dashboard/DashboardContainer').then((module) => ({
    default: module.DashboardContainer,
  }))
);

const AccountsContainer = lazy(() =>
  import('@features/accounts/AccountsContainer').then((module) => ({
    default: module.AccountsContainer,
  }))
);

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  loader?: () => Promise<unknown>;
}

const createLazyRoute = (
  importFn: () => Promise<{ default: React.ComponentType<unknown> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFn);
  return (
    <Suspense fallback={fallback || <Spinner />}>
      <LazyComponent />
    </Suspense>
  );
};

const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: createLazyRoute(
      () => import('@features/dashboard/DashboardContainer'),
      <Spinner message="Cargando panel principal..." />
    ),
  },
  {
    path: '/accounts',
    element: createLazyRoute(
      () => import('@features/accounts/AccountsContainer'),
      <Spinner message="Cargando gestión de cuentas..." />
    ),
  },
];

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route
        path="*"
        element={
          <div className="not-found-container">
            <h1>404 - Página no encontrada</h1>
            <p>La página que buscas no existe o ha sido movida.</p>
            <a href="/dashboard">Volver al inicio</a>
          </div>
        }
      />
    </Routes>
  );
};

export const getRouteInfo = (pathname: string): { title: string; description: string } => {
  const routeTitles: Record<string, { title: string; description: string }> = {
    '/dashboard': {
      title: 'Panel Principal - Banking App',
      description: 'Visualiza el resumen de tu actividad bancaria, transacciones recientes y saldo disponible.',
    },
    '/accounts': {
      title: 'Gestión de Cuentas - Banking App',
      description: 'Administra tus cuentas bancarias, consulta saldos y realiza transferencias.',
    },
  };

  return routeTitles[pathname] || {
    title: 'Banking App - Tu banco digital',
    description: 'Aplicación de banca digital para gestionar tus finanzas de manera segura y eficiente.',
  };
};

export default AppRoutes;