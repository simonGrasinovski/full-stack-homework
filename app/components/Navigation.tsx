'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Numbers', path: '/numbers' },
    { label: 'Grades', path: '/grades' },
  ];

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Full Stack Assessment
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              color='inherit'
              onClick={() => router.push(item.path)}
              variant={pathname === item.path ? 'outlined' : 'text'}
              sx={{
                borderColor: pathname === item.path ? 'white' : 'transparent',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
