import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface DataSectionProps {
  title: string;
  children: ReactNode;
}

export default function DataSection({ title, children }: DataSectionProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Paper>
  );
}
