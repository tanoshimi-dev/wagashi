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
  getIngredients, createIngredient,
  fetchStatus, createStatus,
  deleteStatus, deleteIngredient,
  ingredients,
  updateIngredient,
} from "@/lib/redux/slices/ingredientSlice";
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


// Define columns

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "ingredient", header: "材料" },
  { accessorKey: "created_at", header: "登録日時" },
];

export default function IngredientListPage() {

const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResIngredients = useSelector(ingredients);
  const apiResDeleteStatus = useSelector(deleteStatus);

  console.log("apiResIngredients ", apiResIngredients);
  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  const table = useReactTable({
    data: apiResIngredients ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


    // data fetch
    useEffect(() => {
      // console.log("data fetch ");
      dispatch(getIngredients());
    }, []);

    const { register, handleSubmit, reset } = useForm<{ ingredient: string }>();

    const onSubmit = (data: { ingredient: string }) => {
      dispatch(createIngredient(data.ingredient)).then(() => {
        dispatch(getIngredients());
        reset();
      });
    };

    const handleDelete = (id: string) => {
      if (confirm("本当に削除しますか？")) {
        console.log("delete id ", id);
        dispatch(deleteIngredient(id)).then(() => {
          dispatch(getIngredients());
        });
      }
    };
    
    const handleSave = () => {

      const editingIngredient = apiResIngredients?.find(cat => String(cat.id) === String(editRowId));

      console.log(editingIngredient, editRowId, editName); // { id: ..., ingredient: ..., ... }

      // console.log("save id ", editRowId, editName);
      dispatch(updateIngredient({ id: editRowId, ingredient: editName })).then(() => {
        dispatch(getIngredients());
        setEditRowId(null);
      });
    };

    return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <Box sx={{ 
        padding: 2, backgroundColor: '#fff2ed', height: '60px',
        color: '#868686ff', fontSize: '1.2rem', fontWeight: 'bold'}}
      >
        材料一覧
      </Box>

      <Box sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '70vw' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <OutlinedInput
              size="small"
              {...register("ingredient", { required: true })}
              placeholder="新しい材料名"
              sx={{ mr: 2, width: 240, mb: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4d4007ff',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4d4007ff',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4d4007ff',
                  },
               }}
            />        
            <Button 
              type="submit" 
              variant="outlined" 
              startIcon={<AddIcon />}
              sx={{
                lineHeight: '1.75rem',
                borderColor: '#4d4007ff', color: '#4d4007ff', 
                '&:hover': { borderColor: '#4d4007ff', backgroundColor: '#fff2ed' }
              }}
            >
              追加
            </Button>
            <Paper sx={{ width: "100%", overflowX: "auto" }}>
              <Table>
                <TableHead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableCell key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                      <TableCell>
                        操作
                      </TableCell>                      
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          
                          {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                          {editRowId === row.getValue('id') && cell.column.id === "ingredient" ? (
                            <OutlinedInput
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              size="small"
                              sx={{ width: 140 }}
                            />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}

                        </TableCell>
                      ))}
                      <TableCell>
                        {editRowId === row.getValue('id')  ? (
                          <>
                            {/* <OutlinedInput
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              size="small"
                              sx={{ width: 140, mr: 1 }}
                            /> */}
                            <Button
                              startIcon={<SaveIcon />}
                              onClick={() => handleSave()}
                              sx={{ color: '#eb8d00ff' }}
                            >
                              保存
                            </Button>
                            <Button
                              color="inherit"
                              startIcon={<CancelIcon />}
                              onClick={() => setEditRowId(null)}
                            >
                              キャンセル
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              startIcon={<EditIcon />}
                              onClick={() => {
                                // setEditRowId(row.id);
                                setEditRowId(row.getValue('id') as string);
                                setEditName(row.getValue('ingredient') as string);
                              }}
                              sx={{ color: '#573605ff' }}
                            >
                              編集
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(row.getValue('id') as string)}
                              sx={{ color: '#eb3700ff' }}
                            >
                              削除
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </form>
        </Box>
      </Box>



    </Box>
  );
}