import { useState, useCallback } from 'react';

interface UseApiStateOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export default function useApiState(options: UseApiStateOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  const handleApiCall = useCallback(async (
    apiCall: () => Promise<any>,
    successMessage?: string
  ) => {
    clearMessages();
    setLoading(true);

    try {
      const result = await apiCall();
      
      if (successMessage) {
        setSuccess(successMessage);
      }
      
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [options, clearMessages]);

  return {
    loading,
    error,
    success,
    clearMessages,
    handleApiCall,
  };
}
