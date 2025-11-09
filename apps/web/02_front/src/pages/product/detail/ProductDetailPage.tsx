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
import { useRouter, useSearchParams } from "next/navigation";

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


// Define columns

const columns = [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "product_name", header: "商品名", size: 180  },
  { accessorKey: "product_detail", header: "詳細", size: 300 },
  { accessorKey: "product_price", header: "価格", size: 100 },
  { accessorKey: "created_at", header: "登録日時", size: 200 },
];

const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const imageUrl = url;

export default function ProductDetailPage() {

  const searchParams = useSearchParams();
  const productId = searchParams.get("pid") ?? "";

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

    return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <Box sx={{ 
        padding: 2, backgroundColor: '#fff2ed', height: '60px',
        color: '#868686ff', fontSize: '1.2rem', fontWeight: 'bold'}}
      >
        商品詳細
      </Box>
      
      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '70vw' }}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Paper sx={{ maxWidth: 800, overflowX: "auto" }}>
              { productId }
            </Paper>
          </form>
        </Box>
      </Box>



    </Box>
  );
}