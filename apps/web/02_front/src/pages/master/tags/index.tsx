import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';

// Update the import path if the file is named 'DashboardLayout.tsx'
import DashboardLayout from '../../../layouts/DashboardLayout';
import TagListPage from './TagListPage';

export default function Dashboard() {
  return (
    <DashboardLayout >
      <TagListPage />
    </DashboardLayout>
  );
}   
