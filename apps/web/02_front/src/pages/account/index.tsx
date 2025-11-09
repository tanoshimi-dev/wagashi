import { Box } from '@mui/material';
import React, { useState } from 'react';

import LoginForm from '@/components/LoginForm';

// Update the import path if the file is named 'DashboardLayout.tsx'
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <LoginForm />
    </DashboardLayout>
  );
}   
