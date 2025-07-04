'use client';

import { useEffect } from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { RefreshOutlined, HomeOutlined, ReportProblemOutlined } from '@mui/icons-material';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Container maxWidth='md' sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <ReportProblemOutlined
              sx={{ fontSize: 80, color: 'error.main', mb: 3 }}
            />
            <Typography variant='h3' component='h1' gutterBottom color='error'>
              Application Error
            </Typography>

            <Typography variant='h6' color='text.secondary' paragraph>
              Something went wrong with the application.
            </Typography>

            <Typography variant='body1' color='text.secondary' paragraph>
              We apologize for the inconvenience. Please try refreshing the page or go back to the home page.
            </Typography>

            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ mt: 3, mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant='body2' color='text.secondary'>
                  <strong>Error:</strong> {error.message}
                </Typography>
                {error.digest && (
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Digest:</strong> {error.digest}
                  </Typography>
                )}
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant='contained'
                size='large'
                startIcon={<RefreshOutlined />}
                onClick={() => reset()}
              >
                Try Again
              </Button>
              <Button
                variant='outlined'
                size='large'
                startIcon={<HomeOutlined />}
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </Box>
          </Paper>
        </Container>
      </body>
    </html>
  );
}

export default GlobalError;
