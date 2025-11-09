import { Box, chipClasses, Paper } from '@mui/material';
import React, { useState } from 'react';


import { store as RedusStore } from '@/lib/redux/store'
import { Provider as ReduxProvider } from 'react-redux'


// Update the import path if the file is named 'DashboardLayout.tsx'
import DashboardLayout from '../layouts/DashboardLayout';

export default function Home({ children }: { children?: React.ReactNode }) {
  return (
    <ReduxProvider store={RedusStore}>
      <DashboardLayout>
        {/* Page-specific content here */}
        {/* <Paper sx={{ width: '100%', maxHeight: '90vh', p: 2, overflowY: 'scroll' }}>
          <Box sx={{ p: 2 , bgcolor: 'lightgray', minHeight: '240vh' }} >Welcome to Some Page!</Box>
        </Paper> */}
        {children}
      </DashboardLayout>
    </ReduxProvider>
  );
}

