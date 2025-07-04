import { Container, Typography, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
}
