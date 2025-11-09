'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
  use,
  useRef,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  getAnnouncement, createAnnouncement,
  fetchStatus, createStatus,
  deleteStatus, deleteAnnouncement,
  announcements,
  updateAnnouncement,
  getAnnouncements,
} from "@/lib/redux/slices/announcementSlice";



import { ApiArgsCreateAnnouncement, ApiArgsLogin } from "@/lib/types/api_args";

import CircularProgress from "@mui/material/CircularProgress";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// import { DataGrid, GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, styled, Divider, FormLabel, TextField } from "@mui/material";

import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Ingredient } from "@/lib/types/ingredient";
// Define columns



const columns = [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "title", header: "タイトル", size: 180  },
  { accessorKey: "announcement", header: "お知らせ", size: 300 },
];


export default function AnnounceCreatePage() {
  const defaultValues = {
    id: null as string | null,
    title: null as string | null,
    announcement: null as string | null,
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<InputFormData>({
    defaultValues,
    mode: "onChange",
  });


  const searchParams = useSearchParams();
  const productId = searchParams.get("aid") ?? "";

  const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResAnnouncements = useSelector(announcements);
  const apiResDeleteStatus = useSelector(deleteStatus);

  const [title, setTitle] = useState<string>("");
  const [announcement, setAnnouncement] = useState<string>("");

  const submit = (data: InputFormData) => {

    console.log("create product ", data);

    // if (!data.product_name || !data.product_detail || !data.product_price || !data.selected_category_id) {
    //   alert("商品名、詳細、価格、カテゴリは必須です。");
    //   return;
    // }

    dispatch(
      createAnnouncement({
        title: data.title ?? "",
        announcement: data.announcement ?? "",
      } as ApiArgsCreateAnnouncement)
    ).then(() => {
      dispatch(getAnnouncements());
      reset();
    });

  }

  // const handleDelete = (id: string) => {
  //   if (confirm("本当に削除しますか？")) {
  //     console.log("delete id ", id);
  //     dispatch(deleteProduct(id)).then(() => {
  //       dispatch(getProducts());
  //     });
  //   }
  // };
  

  return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <h2>お知らせ詳細</h2>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '80vw' }}>
          <form onSubmit={handleSubmit(submit)}>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              {/* Overview */}
              <Box sx={{ flex: 0.4, backgroundColor: '#eee' }}>
                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                  {getValues("title") || "タイトル未入力"}
                </Box>

                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                  {getValues("announcement") || "詳細未入力"}
                </Box>



              </Box>

              {/* Input area */}
              <Box sx={{ flex: 1, backgroundColor: '#eee'  }}>

                <Paper sx={{ p: 1, mb: 1  }}>
                  
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>タイトル</FormLabel>
                      <OutlinedInput
                        id="title"
                        type="text"
                        size="small" 
                        placeholder="title"
                        {...register("title")}
                        onChange={e => {
                          setTitle(e.target.value);
                          register("title").onChange(e);
                        }}
                      />
                    </Grid>

                  </Grid>

                  <Grid container spacing={2} size={12} sx={{ m: 1 }}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>お知らせ内容</FormLabel>
                      <TextField
                        id="announcement"
                        multiline
                        minRows={8}
                        maxRows={8}
                        variant="filled"
                        required
                        // onChange={e => setDetail(e.target.value)}
                        sx={{
                          width: "100%",
                          "& .MuiFilledInput-root": {
                            paddingTop: "0.5rem",
                            backgroundColor: "hsl(0, 0%, 99%)",
                            border: "1px solid hsla(220, 30%, 96%, 0.40)",
                          },
                        }}
                        {...register("announcement")}
                        onChange={e => {
                          setAnnouncement(e.target.value);
                          register("announcement").onChange(e);
                        }}
                      />
                    </Grid>
                  </Grid>

                </Paper>
                <Paper sx={{ p: 1, mb: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" onClick={handleSubmit(submit)} startIcon={<SaveIcon /> } sx={{ mr: 1 }}>
                    登録
                  </Button>
                </Paper>

              </Box>

            </Box>
          </form>

        </Box>
      </Box>



    </Box>
  );
}

interface InputFormData {
  id?: string | null;
  title?: string | null;
  announcement?: string | null;
  // tag?: string[] | null;
}
