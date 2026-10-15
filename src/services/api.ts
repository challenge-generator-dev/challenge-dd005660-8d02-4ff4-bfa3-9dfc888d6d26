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