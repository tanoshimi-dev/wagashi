

import { Box } from '@mui/material';
import LoginForm from '@/components/LoginForm';
// Update the import path if the file is named 'DashboardLayout.tsx'
import DashboardLayout from '../../../layouts/DashboardLayout';


export default function LoginPage() {


  return (
    <DashboardLayout>
      <LoginForm />
    </DashboardLayout>
  );
}   
