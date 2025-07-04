import { Alert } from '@mui/material';

interface StatusAlertProps {
  error?: string;
  success?: string;
}

export default function StatusAlert({ error, success }: StatusAlertProps) {
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (success) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        {success}
      </Alert>
    );
  }

  return null;
}
