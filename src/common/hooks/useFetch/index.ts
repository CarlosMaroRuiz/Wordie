import { useState, useEffect, useCallback } from 'react';
import type { AsyncResource } from '@common/types/async';

/**
 * Descarga un JSON de `/public/data` y devuelve el contrato `AsyncResource<T>`
 * (`data`, `isLoading`, `error` como `Error | null`, `refetch`).
 */
export const useFetch = <T,>(url: string): AsyncResource<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
