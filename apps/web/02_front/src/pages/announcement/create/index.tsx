import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';

// Update the import path if the file is named 'DashboardLayout.tsx'
import DashboardLayout from '../../../layouts/DashboardLayout';
import AnnounceCreatePage from './AnnounceCreatePage';

export default function Dashboard() {
  return (
    <DashboardLayout >
      <AnnounceCreatePage />
    </DashboardLayout>
  );
}   
