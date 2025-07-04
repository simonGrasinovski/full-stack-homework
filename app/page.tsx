'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import ErrorBoundaryDemo from './components/ErrorBoundaryDemo';

const Home = () => {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      {process.env.NODE_ENV === 'development' && (
        <ErrorBoundaryDemo />
      )}
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom align='center'>
          Full Stack Developer Homework
        </Typography>
        <Typography variant='h6' component='h2' gutterBottom sx={{ mt: 4 }}>
          Available Pages
        </Typography>    
        <Box component='ul' sx={{ ml: 2 }}>
          <Typography component='li' variant='body1'>
            <strong>Numbers:</strong> Submit integers and view adjacent number pairs with their sums
          </Typography>
          <Typography component='li' variant='body1'>
            <strong>Grades:</strong> Manage grades for Math, Science, and History classes
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
