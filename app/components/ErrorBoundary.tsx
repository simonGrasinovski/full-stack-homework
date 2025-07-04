'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert, 
  AlertTitle,
  Container 
} from '@mui/material';
import { RefreshOutlined, ReportProblemOutlined } from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetError: () => void;
    errorId: string;
  }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
            errorId={this.state.errorId}
          />
        );
      }

      return (
        <Container maxWidth='md' sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <ReportProblemOutlined 
                sx={{ fontSize: 64, color: 'error.main', mb: 2 }} 
              />
              <Typography variant='h4' component='h1' gutterBottom color='error'>
                Something went wrong
              </Typography>
              <Typography variant='body1' color='text.secondary' paragraph>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </Typography>
            </Box>
            <Alert severity='error' sx={{ mb: 3 }}>
              <AlertTitle>Error Details</AlertTitle>
              <Typography variant='body2' component='div'>
                <strong>Error ID:</strong> {this.state.errorId}
              </Typography>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Typography variant='body2' component='div' sx={{ mt: 1 }}>
                  <strong>Message:</strong> {this.state.error.message}
                </Typography>
              )}
            </Alert>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant='contained'
                startIcon={<RefreshOutlined />}
                onClick={this.resetError}
                size='large'
              >
                Try Again
              </Button>
              <Button
                variant='outlined'
                onClick={() => window.location.reload()}
                size='large'
              >
                Refresh Page
              </Button>
            </Box>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 4 }}>
                <Typography variant='h6' gutterBottom>
                  Development Error Details
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant='body2' component='pre' sx={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error.stack}
                  </Typography>
                  {this.state.errorInfo && (
                    <Typography variant='body2' component='pre' sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
                      Component Stack: {this.state.errorInfo.componentStack}
                    </Typography>
                  )}
                </Paper>
              </Box>
            )}
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;