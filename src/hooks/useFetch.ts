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