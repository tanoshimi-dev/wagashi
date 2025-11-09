'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
  use,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  getAnnouncements, createAnnouncement,
  fetchStatus, createStatus,
  deleteStatus, deleteAnnouncement,
  announcements,
  updateAnnouncement,
} from "@/lib/redux/slices/announcementSlice";
import { ApiArgsLogin } from "@/lib/types/api_args";

import CircularProgress from "@mui/material/CircularProgress";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// import { DataGrid, GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LooksIcon from '@mui/icons-material/Looks';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { useRouter } from "next/dist/client/components/navigation";


// Define columns

const columns = [
  { accessorKey: "id", header: "ID", size: 32 },
  { accessorKey: "title", header: "タイトル", size: 180  },
  { accessorKey: "announcement", header: "詳細", size: 400 },
  { accessorKey: "created_at", header: "登録日時", size: 120 },
];


export default function AnnouncementListPage() {
  
  const router = useRouter();
  const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResAnnouncements = useSelector(announcements);
  const apiResDeleteStatus = useSelector(deleteStatus);

  console.log("apiResAnnouncements ", apiResAnnouncements);
  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  const table = useReactTable({
    data: apiResAnnouncements ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


    // data fetch
    useEffect(() => {
      // console.log("data fetch ");
      dispatch(getAnnouncements());
    }, []);

    const { register, handleSubmit, reset } = useForm<{ category_name: string }>();

    const onSubmit = (data: { category_name: string }) => {
      // dispatch(createProduct(data.category_name)).then(() => {
      //   dispatch(getProducts());
      //   reset();
      // });
    };

    const handleDelete = (id: string) => {
      if (confirm("本当に削除しますか？")) {
        console.log("delete id ", id);
        dispatch(deleteAnnouncement(id)).then(() => {
          dispatch(getAnnouncements());
        });
      }
    };
    
    const handleSave = () => {

      const editingAnnouncement = apiResAnnouncements?.find(cat => String(cat.id) === String(editRowId));

      console.log(editingAnnouncement, editRowId, editName); // { id: ..., category_name: ..., ... }

      // console.log("save id ", editRowId, editName);
      // dispatch(updateProduct({ id: editRowId, product_name: editName })).then(() => {
      //   dispatch(getProducts());
      //   setEditRowId(null);
      // });
    };

    const handleDetail = (id: string) => {
      router.push(`/announcement/edit?aid=${id}`);
    };

    return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <Box sx={{ 
        padding: 2, backgroundColor: '#fff2ed', height: '60px',
        color: '#868686ff', fontSize: '1.2rem', fontWeight: 'bold'}}
      >
        お知らせ一覧
      </Box>

      <Box sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '70vw' }}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Paper sx={{ maxWidth: 1200, overflowX: "auto" }}>
              <Box > 
                <Table>
                  <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <TableCell key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableCell>
                        ))}
                        <TableCell sx={{ minWidth: 120 }}>
                          操作
                        </TableCell>                      
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {table.getRowModel().rows.map(row => (
                      <TableRow key={row.id} sx={{ p:0, m:0 }}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id} 
                            sx={{
                            py: 0,
                            my: 0,
                            width: cell.column.columnDef.size,
                            minWidth: cell.column.columnDef.size,
                            maxWidth: cell.column.columnDef.size,
                                // Add text truncation
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>

                          </TableCell>
                        ))}
                        <TableCell>
                          <>
                            <Button
                              startIcon={<ArrowRightOutlinedIcon />}
                              onClick={() => {
                                handleDetail(row.getValue('id') as string);
                              }}
                              sx={{ color: '#573605ff' }}
                            >
                              確認
                            </Button>
                            <Button
                              startIcon={<EditIcon />}
                              onClick={() => {
                                handleDetail(row.getValue('id') as string);
                              }}
                              sx={{ color: '#eb8d00ff' }}
                            >
                              編集
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </form>
        </Box>
      </Box>



    </Box>
  );
}