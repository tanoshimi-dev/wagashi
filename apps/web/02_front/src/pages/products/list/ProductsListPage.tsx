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
  getProducts, createProduct,
  fetchStatus, createStatus,
  deleteStatus, deleteProduct,
  products,
  updateProduct,
} from "@/lib/redux/slices/productSlice";
import { ApiArgsLogin } from "@/lib/types/api_args";

import CircularProgress from "@mui/material/CircularProgress";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// import { DataGrid, GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LooksIcon from '@mui/icons-material/Looks';
import { useRouter } from "next/dist/client/components/navigation";


// Define columns

const columns = [
  { accessorKey: "id", header: "ID", size: 32 },
  { accessorKey: "name", header: "商品名", size: 180  },
  { accessorKey: "description", header: "詳細", size: 300 },
  { accessorKey: "price", header: "価格", size: 100 },
  { accessorKey: "category_name", header: "カテゴリ", size: 90 },
  { accessorKey: "created_at", header: "登録日時", size: 120 },
];

const imageUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}${process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? ""}`;

export default function CategoryListPage() {
  
  const router = useRouter();
  const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResProducts = useSelector(products);
  const apiResDeleteStatus = useSelector(deleteStatus);

  console.log("apiResProducts ", apiResProducts);
  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  const table = useReactTable({
    data: apiResProducts ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


    // data fetch
    useEffect(() => {
      // console.log("data fetch ");
      dispatch(getProducts());
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
        dispatch(deleteProduct(id)).then(() => {
          dispatch(getProducts());
        });
      }
    };
    
    const handleSave = () => {

      const editingProduct = apiResProducts?.find(cat => String(cat.id) === String(editRowId));

      console.log(editingProduct, editRowId, editName); // { id: ..., category_name: ..., ... }

      // console.log("save id ", editRowId, editName);
      // dispatch(updateProduct({ id: editRowId, product_name: editName })).then(() => {
      //   dispatch(getProducts());
      //   setEditRowId(null);
      // });
    };

    const handleDetail = (id: string) => {
      router.push(`/product/edit?pid=${id}`);
    };

    return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>

      <Box sx={{ 
        padding: 2, backgroundColor: '#fff2ed', height: '60px',
        color: '#868686ff', fontSize: '1.2rem', fontWeight: 'bold'}}
      >
        商品一覧
      </Box>

      <Box sx={{ p: 2, mb: 2 }}>
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
                          }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {cell.column.id === "name" && (
                                <img src={`${imageUrl}storage/products/${row.getValue('id')}.png?${Date.now()}`} alt="Ice Cream Cup" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }} />
                              )}
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