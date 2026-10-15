# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/routes.tsx` — `RouteConfig.map`: Se invoca `map` sobre `RouteConfig`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee

### Brecha de conocimiento
Identifica claramente los estilos y tácticas de arquitectura y los ha aplicado en varios contextos, lo cuál debe incluir la nube.

### Misión / candidato
Candidato en etapa inicial de aprendizaje, trabajando en desarrollo frontend con React

### Reto
- Tema: aplicación de estilos y tácticas de arquitectura en contextos de desarrollo frontend con React, incluyendo cloud
- Seniority: trainee-l1
- Tipo: practical
- Título: Diseño de arquitectura para aplicación frontend en React
- Tiempo estimado: 3 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Identificación de estilos y tácticas de arquitectura — objetivo: Seleccionar y justificar los estilos y tácticas de arquitectura adecuados para la aplicación frontend en React. — entregable (NO resolver): Documento que detalla los estilos y tácticas de arquitectura seleccionados y su justificación.
- Fase 2: Aplicación de estilos y tácticas en un mockup de la aplicación — objetivo: Aplicar los estilos y tácticas de arquitectura seleccionados en un diseño conceptual de la aplicación frontend. — entregable (NO resolver): Mockup de la aplicación frontend con una explicación detallada de cómo se han aplicado los estilos y tácticas de arquitectura.
- Fase 3: Evaluación y ajuste de la arquitectura — objetivo: Evaluar la arquitectura propuesta y realizar ajustes basados en feedback y consideraciones adicionales. — entregable (NO resolver): Versión actualizada del mockup y la explicación de la arquitectura, con los ajustes realizados y una explicación de los cambios.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "banking-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "test": "vitest",
    "test:watch": "vitest watch"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.22.3",
    "@tanstack/react-query": "5.28.0",
    "zustand": "4.5.2",
    "axios": "1.6.8"
  },
  "devDependencies": {
    "vite": "5.2.8",
    "@vitejs/plugin-react": "4.2.1",
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "typescript": "5.4.5",
    "eslint": "8.57.0",
    "@typescript-eslint/eslint-plugin": "7.7.1",
    "@typescript-eslint/parser": "7.7.1",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-react-refresh": "0.4.6",
    "prettier": "3.2.5",
    "vitest": "1.5.0",
    "@testing-library/react": "15.0.2",
    "jsdom": "24.0.0"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": [
      "react-refresh",
      "@typescript-eslint"
    ],
    "rules": {
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// === ARCHIVO: src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: src/app/App.tsx ===
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

// === ARCHIVO: src/types/index.ts ===
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

// === ARCHIVO: src/features/dashboard/DashboardContainer.tsx ===
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

// === ARCHIVO: src/features/dashboard/DashboardView.tsx ===
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

// === ARCHIVO: src/features/accounts/AccountsContainer.tsx ===
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

// === ARCHIVO: src/features/accounts/AccountsView.tsx ===
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

// === ARCHIVO: src/services/api.ts ===
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, PaginatedResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.banking.example.com';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

class ApiClient {
  private readonly instance: AxiosInstance;
  private readonly retryAttempts: number;
  private readonly retryDelay: number;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.retryAttempts = 3;
    this.retryDelay = 1000;

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        config.headers['X-Request-ID'] = requestId;

        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error: AxiosError) => {
        console.error('[API] Error en solicitud:', error.message);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[API] Respuesta ${response.status} de ${response.config.url}`);
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (!originalRequest) {
          return Promise.reject(this.formatError(error));
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshed = await this.refreshToken();
            if (refreshed && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${this.getAuthToken()}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            this.clearAuthToken();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        if (this.shouldRetry(error) && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.retryRequest(originalRequest);
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      return true;
    } catch {
      return false;
    }
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.response) {
      return true;
    }

    const retryableCodes = [408, 429, 500, 502, 503, 504];
    return retryableCodes.includes(error.response.status);
  }

  private async retryRequest(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      await this.delay(this.retryDelay * attempt);

      try {
        return await this.instance(config);
      } catch (error) {
        if (attempt === this.retryAttempts) {
          throw error;
        }
      }
    }

    throw new Error('Max retry attempts reached');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private formatError(error: AxiosError): Error {
    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      const message = (data?.message as string) || error.message;
      return new Error(message);
    }

    if (error.request) {
      return new Error('No se recibió respuesta del servidor. Verifica tu conexión.');
    }

    return new Error(error.message || 'Error desconocido');
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async getPaginated<T>(
    url: string,
    page: number = 1,
    limit: number = 10,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T>> {
    const params = { ...config?.params, page, limit };
    const response = await this.instance.get<PaginatedResponse<T>>(url, {
      ...config,
      params,
    });
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  clearSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }
}

export const api = new ApiClient();
export default api;

// === ARCHIVO: src/hooks/useFetch.ts ===
import { useState, useEffect, useCallback, useRef } from 'react';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseFetchState<T> {
  data: T | null;
  error: Error | null;
  status: FetchStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retryAttempts?: number;
  retryDelay?: number;
  cacheTime?: number;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  execute: (params?: Record<string, unknown>) => Promise<T | null>;
  reset: () => void;
  cancel: () => void;
}

export function useFetch<T>(
  fetcher: (params?: Record<string, unknown>) => Promise<T>,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const {
    immediate = true,
    onSuccess,
    onError,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const execute = useCallback(
    async (params?: Record<string, unknown>): Promise<T | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      retryCountRef.current = 0;
      setStatus('loading');
      setError(null);

      const attemptFetch = async (): Promise<T | null> => {
        try {
          const result = await fetcher(params);

          if (!isMountedRef.current) {
            return null;
          }

          setData(result);
          setStatus('success');
          retryCountRef.current = 0;

          if (onSuccess) {
            onSuccess(result);
          }

          return result;
        } catch (err) {
          if (!isMountedRef.current) {
            return null;
          }

          const isAborted =
            err instanceof Error && err.name === 'AbortError';

          if (isAborted) {
            return null;
          }

          const fetchError = err instanceof Error ? err : new Error('Unknown error');

          if (retryCountRef.current < retryAttempts) {
            retryCountRef.current += 1;
            console.log(`[useFetch] Reintentando... intento ${retryCountRef.current}/${retryAttempts}`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCountRef.current));
            return attemptFetch();
          }

          setError(fetchError);
          setStatus('error');

          if (onError) {
            onError(fetchError);
          }

          return null;
        }
      };

      return attemptFetch();
    },
    [fetcher, onSuccess, onError, retryAttempts, retryDelay]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus('idle');
    retryCountRef.current = 0;
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setStatus('idle');
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    if (immediate) {
      execute();
    }

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset,
    cancel,
  };
}

interface UseFetchManyOptions<T> extends Omit<UseFetchOptions<T>, 'immediate'> {
  concurrent?: boolean;
  maxConcurrent?: number;
}

export function useFetchMany<T>(
  fetchers: Array<() => Promise<T>>,
  options: UseFetchManyOptions<T> = {}
): UseFetchState<T[]> & { executeAll: () => Promise<T[]> } {
  const { concurrent = false, maxConcurrent = 3, onSuccess, onError } = options;

  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const executeAll = useCallback(async (): Promise<T[]> => {
    setStatus('loading');
    setError(null);

    try {
      let results: T[];

      if (concurrent) {
        const chunks: Array<Array<() => Promise<T>>> = [];
        for (let i = 0; i < fetchers.length; i += maxConcurrent) {
          chunks.push(fetchers.slice(i, i + maxConcurrent));
        }

        results = [];
        for (const chunk of chunks) {
          const chunkResults = await Promise.all(chunk.map((f) => f()));
          results = [...results, ...chunkResults];
        }
      } else {
        results = await Promise.all(fetchers.map((f) => f()));
      }

      setData(results);
      setStatus('success');

      if (onSuccess) {
        onSuccess(results);
      }

      return results;
    } catch (err) {
      const fetchError = err instanceof Error ? err : new Error('Unknown error');
      setError(fetchError);
      setStatus('error');

      if (onError) {
        onError(fetchError);
      }

      return [];
    }
  }, [fetchers, concurrent, maxConcurrent, onSuccess, onError]);

  return {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    executeAll,
  };
}

export type { UseFetchState, UseFetchOptions, UseFetchReturn };

// === ARCHIVO: src/shared/components/Button.tsx ===
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent',
  outline: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 border-blue-600',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;

// === ARCHIVO: src/shared/components/Card.tsx ===
import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'bordered';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  headerAction?: React.ReactNode;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-sm',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border-2 border-gray-200',
  bordered: 'bg-white border border-gray-200',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'md',
  className = '',
  headerAction,
  onClick,
  role,
  ariaLabel,
}) => {
  const baseClasses = `
    rounded-xl transition-shadow duration-200
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const Component = onClick ? 'button' : 'div';
  const isInteractive = Boolean(onClick);

  const cardContent = (
    <>
      {(title || subtitle || headerAction) && (
        <div className={`flex ${headerAction ? 'justify-between items-start' : 'flex-col'} mb-4`}>
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="ml-4">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </>
  );

  if (Component === 'button') {
    return (
      <button
        type="button"
        className={`${baseClasses} text-left w-full`}
        onClick={onClick}
        role={role || 'button'}
        aria-label={ariaLabel}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div
      className={baseClasses}
      role={role}
      aria-label={ariaLabel}
    >
      {cardContent}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;

// === ARCHIVO: src/utils/formatters.ts ===
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

// === ARCHIVO: src/app/routes.tsx ===
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

// === ARCHIVO: public/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Banking App - Aplicación de banca digital segura para gestionar tus finanzas" />
    <meta name="keywords" content="banca digital, finanzas, transferencias, gestión de cuentas, banco online" />
    <meta name="author" content="Banking Team" />
    <meta name="theme-color" content="#1a73e8" />
    <meta name="robots" content="index, follow" />
    
    <meta property="og:title" content="Banking App - Tu banco digital" />
    <meta property="og:description" content="Gestiona tus finanzas de manera segura y eficiente con nuestra aplicación de banca digital." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://banking-app.example.com" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:site_name" content="Banking App" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Banking App - Tu banco digital" />
    <meta name="twitter:description" content="Gestiona tus finanzas de manera segura y eficiente." />
    <meta name="twitter:image" content="/og-image.png" />
    
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    
    <title>Banking App - Tu banco digital</title>
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .loading-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #1a73e8;
        color: white;
        padding: 8px 16px;
        z-index: 100;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 0;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  </head>
  <body>
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
    
    <noscript>
      <div style="padding: 20px; text-align: center; background: #ffebee; color: #c62828;">
        <h1>JavaScript requerido</h1>
        <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilita JavaScript en tu navegador.</p>
      </div>
    </noscript>
    
    <div id="root">
      <div class="loading-screen">
        <div class="loading-spinner" role="status" aria-label="Cargando aplicación"></div>
        <p style="margin-top: 16px;">Cargando Banking App...</p>
      </div>
    </div>
    
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: README.md ===
# Banking Frontend - Aplicación de Banca Digital

## Descripción del Proyecto

Aplicación frontend construida con React 19 y TypeScript para un cliente de banca digital. La aplicación permite a los usuarios gestionar sus cuentas bancarias, visualizar transacciones y realizar operaciones financieras de manera segura.

## Características Principales

- **Gestión de Cuentas**: Consulta de saldos, historial de transacciones y detalles de cuenta
- **Panel Principal**: Dashboard con resumen de actividad financiera
- **Diseño Responsivo**: Adaptable a dispositivos desktop y móviles
- **Arquitectura Escalable**: Separación de responsabilidades con componentes contenedores y presentacionales
- **Optimización de Rendimiento**: Lazy loading de módulos y código splittin

## Requisitos del Sistema

- Node.js 20.x o superior
- npm 10.x o superior
- Navegador moderno con soporte para ES2020

## Instalación

```bash
# Instalar dependencias
npm install
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en modo hot-reload |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la versión de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` | Ejecuta las pruebas unitarias |
| `npm run test:watch` | Ejecuta pruebas en modo watch |

## Estructura del Proyecto

```
banking-frontend/
├── public/                    # Archivos estáticos públicos
│   ├── index.html            # Punto de entrada HTML
│   ├── favicon.svg           # Favicon de la aplicación
│   └── manifest.json         # Manifiesto PWA
├── src/
│   ├── app/                  # Configuración de la aplicación
│   │   ├── App.tsx           # Componente raíz
│   │   └── routes.tsx        # Definición de rutas
│   ├── features/             # Módulos de funcionalidad
│   │   ├── dashboard/        # Componentes del dashboard
│   │   │   ├── DashboardContainer.tsx
│   │   │   └── DashboardView.tsx
│   │   └── accounts/         # Componentes de gestión de cuentas
│   │       ├── AccountsContainer.tsx
│   │       └── AccountsView.tsx
│   ├── shared/               # Componentes compartidos
│   │   └── components/       # Componentes reutilizables
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Spinner.tsx
│   ├── services/             # Servicios de API
│   │   └── api.ts            # Cliente HTTP con Axios
│   ├── hooks/                # Custom hooks
│   │   └── useFetch.ts       # Hook para fetching de datos
│   ├── types/                # Definiciones de tipos TypeScript
│   │   └── index.ts
│   ├── utils/                # Utilidades
│   │   └── formatters.ts
│   └── main.tsx              # Punto de entrada React
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración TypeScript
├── vite.config.ts            # Configuración Vite
└── README.md                 # Este archivo
```

## Tecnologías y Dependencias

### Dependencias de Producción

- **React 19** - Biblioteca de interfaces de usuario
- **React Router DOM 6** - Enrutamiento de aplicaciones
- **TanStack Query 5** - Gestión de estado de servidor
- **Zustand 4** - Gestión de estado global
- **Axios 1** - Cliente HTTP

### Dependencias de Desarrollo

- **Vite 5** - Build tool y servidor de desarrollo
- **TypeScript 5** - Tipado estático
- **ESLint 8** - Linting de código
- **Prettier 3** - Formateo de código
- **Vitest 1** - Framework de testing
- **Testing Library** - Utilidades de testing

## Arquitectura del Proyecto

### Patrón de Componentes

El proyecto sigue el patrón de separación de responsabilidades entre componentes:

- **Contenedores (Container)**: Encargados de la lógica de negocio, gestión de estado y fetching de datos
- **Presentacionales (View)**: Encargados exclusivamente de la renderización de la interfaz de usuario

### Lazy Loading

Las rutas principales utilizan lazy loading para optimizar el tiempo de carga inicial:

```typescript
const DashboardContainer = lazy(() =>
  import('@features/dashboard/DashboardContainer').then(module => ({
    default: module.DashboardContainer
  }))
);
```

### Gestión de Estado

- **Estado del servidor**: TanStack Query para caching y sincronización
- **Estado global**: Zustand para estado de aplicación
- **Estado local**: React useState/useReducer para estado de componentes

## Configuración de Path Aliases

El proyecto utiliza aliases de path para imports más limpios:

| Alias | Ruta |
|-------|------|
| `@/*` | `src/*` |
| `@features/*` | `src/features/*` |
| `@shared/*` | `src/shared/*` |
| `@services/*` | `src/services/*` |
| `@types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |
| `@hooks/*` | `src/hooks/*` |

## Convenciones de Código

- **Componentes**: PascalCase (ej. `DashboardView.tsx`)
- **Hooks y tests**: camelCase (ej. `useFetch.ts`)
- **Estilos CSS**: Metodología BEM para clases
- **Tipos TypeScript**: Interfaces para objetos y tipos primitivos

## SEO y Accesibilidad

El proyecto incluye:

- Meta tags para SEO (description, keywords, Open Graph, Twitter Cards)
- Soporte para lectores de pantalla (ARIA labels, skip links)
- Tema de color con `meta theme-color`
- Manifiesto PWA para instalación
- Soporte para `prefers-reduced-motion`

## Contribuir al Proyecto

1. Fork del repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Proprietario - Todos los derechos reservados
```
