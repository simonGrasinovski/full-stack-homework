import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import StatusAlert from './ui/StatusAlert';
import useApiState from '../hooks/useApiState';
import ErrorBoundary from './ErrorBoundary';
import FormErrorFallback from './FormErrorFallback';

interface NumberFormProps {
  onSubmit: (value: number) => Promise<void>;
}

export default function NumberForm({ onSubmit }: NumberFormProps) {
  const [number, setNumber] = useState('');
  
  const { loading, error, success, handleApiCall } = useApiState({
    onSuccess: () => {
      setNumber('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const value = parseInt(number);
    if (isNaN(value)) {
      return;
    }

    await handleApiCall(
      () => onSubmit(value),
      `Number ${value} added successfully!`
    );
  };

  return (
    <ErrorBoundary fallback={FormErrorFallback}>
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label='Integer Value'
          type='number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          size='small'
          helperText='Enter any positive or negative integer'
        />
        <Button
          type='submit'
          variant='contained'
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Number'}
        </Button>
      </Box>

      <StatusAlert error={error} success={success} />
    </ErrorBoundary>
  );
}
