'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { RefreshOutlined, HomeOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface PageErrorFallbackProps {
  error: Error;
  resetError: () => void;
  errorId: string;
}

export default function PageErrorFallback({ error, resetError, errorId }: PageErrorFallbackProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom color="error">
          Page Error
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          This page encountered an error and couldn't load properly.
        </Typography>

        <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="body2">
            <strong>Error ID:</strong> {errorId}
          </Typography>
          {process.env.NODE_ENV === 'development' && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Message:</strong> {error.message}
            </Typography>
          )}
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<RefreshOutlined />}
            onClick={resetError}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeOutlined />}
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
