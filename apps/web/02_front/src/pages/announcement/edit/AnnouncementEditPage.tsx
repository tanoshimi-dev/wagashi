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
  getAnnouncement, updateAnnouncement,
  fetchStatus, updateStatus,
  deleteStatus, deleteAnnouncement,
  announcement as announcementData
} from "@/lib/redux/slices/announcementSlice";





import { ApiArgsLogin, ApiArgsUpdateAnnouncement } from "@/lib/types/api_args";

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
import LoadingProductPage from "@/components/product/LoadingProductPage";
// Define columns



const columns = [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "title", header: "タイトル", size: 180  },
  { accessorKey: "announcement", header: "お知らせ", size: 300 },
  { accessorKey: "created_at", header: "登録日時", size: 200 },
];

// const url = process.env.NEXT_PUBLIC_API_URL ?? "";
// const imageUrl = url;

const imageUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}${process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? ""}`;

export default function AnnouncementEditPage() {

  const searchParams = useSearchParams();
  const id = searchParams.get("aid") ?? "";


  const defaultValues = {
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



  const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResAnnouncement = useSelector(announcementData);
  const apiResUpdateStatus = useSelector(updateStatus);
  const apiResDeleteStatus = useSelector(deleteStatus);


  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");

  // const table = useReactTable({
  //   data: apiResProducts ?? fallbackData,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });


  // data fetch
  useEffect(() => {
    console.log("data fetch ");

    if (id) {
      console.log("edit announcement id ", id);
      dispatch(getAnnouncement(id)).then((action) => {
        const announcement = (action.payload as any).announcement;
        console.log("announcement ", announcement);

        reset({
          title: announcement.title ?? null,
          announcement: announcement.announcement ?? null,
        }); 

      });
    }

  }, []);

  const submit = (data: InputFormData) => {

    console.log("create product ", data);

    // if (!data.product_name || !data.product_detail || !data.product_price || !data.selected_category_id) {
    //   alert("商品名、詳細、価格、カテゴリは必須です。");
    //   return;
    // }

    dispatch(
      updateAnnouncement({
        id: id,
        title: data.title ?? "",
        announcement: data.announcement ?? "",
      } as ApiArgsUpdateAnnouncement)
    ).then(() => {
      // dispatch(getAnnouncement(announcementId));
      // reset();

      dispatch(getAnnouncement(id)).then((action) => {
        const announcement = (action.payload as any).announcement;
        reset({
          title: announcement.title ?? null,
          announcement: announcement.announcement ?? null,
        });
      });

    });

  }


  

  return (
    <>
      {(id && apiResAnnouncement) &&
        (apiResFetchStatus === "succeeded" || apiResUpdateStatus === "succeeded") ? (
        <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
          <Box sx={{ 
            padding: 2, backgroundColor: '#fff2ed', height: '60px',
            color: '#868686ff', fontSize: '1.2rem', fontWeight: 'bold'}}
          >
            お知らせ編集
          </Box>

          <Box sx={{ p: 2, borderRadius: 2, mb: 2 }}>
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
                  <Box sx={{ flex: 1 }}>

                    <Paper sx={{ p: 1, mb: 1  }}>

                      <Grid container spacing={2} sx={{ m: 1 }}>
                        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <FormLabel required sx={{ ml: 1 }}>タイトル</FormLabel>
                          <OutlinedInput
                            id="title"
                            type="text"
                            size="small" 
                            placeholder="タイトル"
                            {...register("title")}
                            onChange={e => {
                              setTitle(e.target.value);
                              register("title").onChange(e);
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#cfcbb9ff',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4d4007ff',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4d4007ff',
                              }
                            }}
                          />
                        </Grid>

                      </Grid>

                      <Grid container spacing={2} size={12} sx={{ m: 1 }}>
                        <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <FormLabel required sx={{ ml: 1 }}>お知らせ</FormLabel>
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
                              '& .MuiFilledInput-underline:after': {
                                borderBottom: '1px solid #9b8628ff',
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
                      <Button 
                        variant="contained" 
                        onClick={handleSubmit(submit)} 
                        startIcon={<SaveIcon /> } 
                        sx={{ backgroundColor:'#f7d096ff', color: '#4d4007ff' }}
                      >
                        更新
                      </Button>
                    </Paper>

                  </Box>
                </Box>

              </form>

            </Box>
          </Box>

        </Box>
      ) : (
        <LoadingProductPage title="お知らせ編集" />
        
      )}
    </>
  );
}

interface InputFormData {
  title?: string | null;
  announcement?: string | null;
}
