'use client';

import React from 'react';
import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import { RefreshOutlined, ReportProblemOutlined } from '@mui/icons-material';

interface FormErrorFallbackProps {
  error: Error;
  resetError: () => void;
  errorId: string;
}

export default function FormErrorFallback({ error, resetError, errorId }: FormErrorFallbackProps) {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <ReportProblemOutlined 
        sx={{ fontSize: 48, color: 'error.main', mb: 2 }} 
      />
      
      <Typography variant='h6' component='h3' gutterBottom color='error'>
        Form Error
      </Typography>
      
      <Typography variant='body2' color='text.secondary' paragraph>
        The form encountered an error and couldn't load properly.
      </Typography>

      <Alert severity='error' sx={{ mb: 2, textAlign: 'left' }}>
        <AlertTitle>Error Details</AlertTitle>
        <Typography variant='body2'>
          <strong>Error ID:</strong> {errorId}
        </Typography>
        {process.env.NODE_ENV === 'development' && (
          <Typography variant='body2' sx={{ mt: 1 }}>
            <strong>Message:</strong> {error.message}
          </Typography>
        )}
      </Alert>

      <Button
        variant='contained'
        startIcon={<RefreshOutlined />}
        onClick={resetError}
        size='small'
      >
        Retry Form
      </Button>
    </Box>
  );
}
