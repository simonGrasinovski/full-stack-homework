'use client';

import { useCallback } from 'react';

export function useErrorHandler() {
  const throwError = useCallback((error: Error | string) => {
    const errorToThrow = typeof error === 'string' ? new Error(error) : error;
    throw errorToThrow;
  }, []);

  return { throwError };
}

export function useAsyncErrorHandler() {
  const handleAsyncError = useCallback((error: Error | string) => {
    console.error('Async error caught:', error);
    
    const errorToHandle = typeof error === 'string' ? new Error(error) : error;

    setTimeout(() => {
      throw errorToHandle;
    }, 0);
  }, []);

  return { handleAsyncError };
}

export function withErrorBoundary<T>(
  promise: Promise<T>,
  onError?: (error: Error) => void
): Promise<T> {
  return promise.catch((error) => {
    const errorToThrow = error instanceof Error ? error : new Error(String(error));
    
    if (onError) {
      onError(errorToThrow);
    }

    throw errorToThrow;
  });
}
