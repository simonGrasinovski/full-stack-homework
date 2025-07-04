'use client';

import { useState } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  Paper,
  Alert,
  AlertTitle
} from '@mui/material';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function ErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const { throwError } = useErrorHandler();

  if (shouldThrow) {
    throw new Error('Demo error: This is a test error from the Error Boundary Demo');
  }

  const handleRenderError = () => {
    setShouldThrow(true);
  };

  const handleAsyncError = () => {
    try {
      throwError('Demo async error: This is a test async error');
    } catch (error) {
      console.error('Caught async error:', error);
    }
  };

  const handleUncaughtError = () => {
    setTimeout(() => {
      throw new Error('Demo uncaught error: This is an uncaught error');
    }, 100);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant='h6'>Error Boundary Demo</Typography>
      </Box>
      <Alert severity='info' sx={{ mb: 3 }}>
        <AlertTitle>Testing Error Boundaries</AlertTitle>
      </Alert>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant='outlined'
          color='error'
          onClick={handleRenderError}
          size='small'
        >
          Trigger Render Error
        </Button>   
        <Button
          variant='outlined'
          color='warning'
          onClick={handleAsyncError}
          size='small'
        >
          Trigger Async Error
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleUncaughtError}
          size='small'
        >
          Trigger Uncaught Error
        </Button>
      </Box>
    </Paper>
  );
}
