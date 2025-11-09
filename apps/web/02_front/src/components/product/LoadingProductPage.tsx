'use client';


// import { DataGrid, GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, styled, Divider, FormLabel, TextField } from "@mui/material";


import Skeleton from '@mui/material/Skeleton';



const url = process.env.NEXT_PUBLIC_API_URL ?? "";


export default function LoadingProductPage(props: { title: string }) {


  return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <h2>{props.title}</h2>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '80vw' }}>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              {/* Overview */}
              <Box sx={{ flex: 0.4, backgroundColor: '#eee' }}>
                <Box sx={{ flexDirection: 'column', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center',
                  minHeight: 160
                 }}>
                  <Box sx={{ m: 1 }}>
                    <Skeleton variant="rectangular" width={210} height={118} />
                  </Box>
                </Box>
                <Divider sx={{ mx: 2 }}/>
                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                </Box>
                <Box sx={{ p: 1, fontSize: 14, color: '#777' }}>
                </Box>
                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                </Box>

                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                </Box>

                <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                </Box>

                <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                </Box>

              </Box>

              {/* Input area */}
              <Box sx={{ flex: 1, backgroundColor: '#eee'  }}>
                <Paper sx={{ p: 1, mb: 1, height: '160px' }}>
                  <Skeleton variant="rectangular"
                    sx={{
                      borderStyle: 'dashed',
                      borderColor: '#ccc',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                  </Skeleton>
                </Paper>
                <Paper sx={{ p: 1, mb: 1  }}>
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} size={12} sx={{ m: 1 }}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                    </Grid>


                  </Grid>
                </Paper>
                <Paper sx={{ p: 1, mb: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="rectangular" width={100} height={24} sx={{ mb: 1 }} />
                </Paper>

              </Box>

            </Box>

        </Box>
      </Box>



    </Box>
  );
}


