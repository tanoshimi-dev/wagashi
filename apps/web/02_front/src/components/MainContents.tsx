import { Box, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';


export default function MainContents() {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      backgroundColor: '#f0f0f0',
      minHeight: '90vh',
    }}>
      <Box>
        Main
      </Box>
    </Box>
  );
}   
