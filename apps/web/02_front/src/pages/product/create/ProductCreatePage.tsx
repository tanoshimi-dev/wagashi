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
  getProducts, createProduct,
  fetchStatus, createStatus,
  deleteStatus, deleteProduct,
  products,
  updateProduct,
} from "@/lib/redux/slices/productSlice";

import {
  getCategories, categories, fetchStatus as categoryFetchStatus
} from "@/lib/redux/slices/categorySlice";

import {
  getTags, tags, fetchStatus as tagFetchStatus
} from "@/lib/redux/slices/tagSlice";

// Add Tag type import if not already present
import type { Tag } from "@/lib/types/tag";

import {
  getIngredients, ingredients, fetchStatus as ingredientFetchStatus
} from "@/lib/redux/slices/ingredientSlice";



import { ApiArgsCreateProduct, ApiArgsLogin } from "@/lib/types/api_args";

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
  { accessorKey: "product_name", header: "商品名", size: 180  },
  { accessorKey: "product_description", header: "詳細", size: 300 },
  { accessorKey: "product_price", header: "価格", size: 100 },
  { accessorKey: "created_at", header: "登録日時", size: 200 },
];

// const url = process.env.NEXT_PUBLIC_API_URL ?? "";
// const imageUrl = url;
const imageUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}${process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? ""}`;

export default function ProductCreatePage() {
  const defaultValues = {
    product_name: null as string | null,
    product_description: null as string | null,
    product_price: null as string | null,
    product_image_file: null as File | null,
    selected_category_id: null as string | null,
    selected_tags: null as Tag[] | null,
    selected_ingredients: null as Ingredient[] | null,    
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
  } = useForm({
    defaultValues,
    mode: "onChange",
  });


  const searchParams = useSearchParams();
  const productId = searchParams.get("pid") ?? "";

  const fallbackData = [{}];

  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResProducts = useSelector(products);
  const apiResDeleteStatus = useSelector(deleteStatus);

  // Categories
  const apiResCategories = useSelector(categories);
  const apiResCategoryFetchStatus = useSelector(categoryFetchStatus);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // tags
  const apiResTags = useSelector(tags);
  const apiResTagFetchStatus = useSelector(tagFetchStatus);
  // const [selectedTags, setSelectedTags] = useState<any[]>([]);

  // Ingredients
  const apiResIngredients = useSelector(ingredients);
  const apiResIngredientFetchStatus = useSelector(ingredientFetchStatus);
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);

  console.log("apiResCategoryFetchStatus ", apiResCategoryFetchStatus, apiResCategories);
  console.log("apiResTagFetchStatus ", apiResTagFetchStatus, apiResTags);
  console.log("apiResIngredientFetchStatus ", apiResIngredientFetchStatus, apiResIngredients);
  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detail, setDetail] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const table = useReactTable({
    data: apiResProducts ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  // data fetch
  useEffect(() => {
    // console.log("data fetch ");
    dispatch(getCategories());
    dispatch(getTags());
    dispatch(getIngredients());
  }, []);

  const submit = (data: InputFormData) => {

    console.log("create product ", data);

    // if (!data.product_name || !data.product_detail || !data.product_price || !data.selected_category_id) {
    //   alert("商品名、詳細、価格、カテゴリは必須です。");
    //   return;
    // }

    dispatch(
      createProduct({
        product_name: data.product_name ?? "",
        product_description: data.product_description ?? "",
        product_price: Number(data.product_price) ?? 0,
        category_id: data.selected_category_id ?? null,
        product_image_file: data.product_image_file ?? null,
        tag_ids: data.selected_tags?.map(tag => tag.id) ?? null,
        ingredient_ids: data.selected_ingredients?.map(ingredient => ingredient.id) ?? null,
      } as ApiArgsCreateProduct)
    ).then(() => {
      dispatch(getProducts());
      reset();
    });

  }

  const handleDelete = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      console.log("delete id ", id);
      dispatch(deleteProduct(id)).then(() => {
        dispatch(getProducts());
      });
    }
  };
  

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const selectedCategoryId = watch("selected_category_id");
  const selectedCategoryObj = (apiResCategories ?? []).find(
    cat => String(cat.id) === String(selectedCategoryId)
  );

  const watchedTags = watch("selected_tags") ?? [];
  const watchedIngredients = watch("selected_ingredients") ?? [];

  // Show the label (category name)
  

  return (
    <Box sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <h2>商品詳細</h2>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ height: '100%', width: '80vw' }}>
          <form onSubmit={handleSubmit(submit)}>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              {/* Overview */}
              <Box sx={{ flex: 0.4, backgroundColor: '#eee' }}>
                <Box sx={{ flexDirection: 'column', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center',
                  minHeight: 160
                 }}>
                {getValues("product_image_file") && (
                  <Box sx={{ m: 1 }}>
                      <img
                        src={URL.createObjectURL(getValues("product_image_file") as File)}
                        alt="preview"
                        style={{ width: '100%', maxHeight: '100%', padding: 4, borderRadius: 16, objectFit: 'contain' }}
                      />
                  </Box>
                )}
                </Box>
                <Divider sx={{ mx: 2 }}/>
                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                  {getValues("product_name") || "商品名未入力"}
                </Box>
                <Box sx={{ p: 1, fontSize: 14, color: '#777' }}>
                  カテゴリ: {selectedCategoryObj?.category || "未選択"}
                </Box>
                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                  {getValues("product_price") || "価格未入力"}
                </Box>


                <Box sx={{ p: 1, fontSize: 14, color: '#777', whiteSpace: 'pre-line' }}>
                  {getValues("product_description") || "詳細未入力"}
                </Box>


                <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {watchedTags.map(tag => (
                    <Chip
                      key={tag.id}
                      label={tag.tag}
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {watchedIngredients.map(ingredient => (
                    <Chip
                      key={ingredient.id}
                      label={ingredient.ingredient}
                      variant="outlined"
                    />
                  ))}
                </Box>

              </Box>

              {/* Input area */}
              <Box sx={{ flex: 1, backgroundColor: '#eee'  }}>
                <Paper sx={{ p: 1, mb: 1, height: '160px' }}>
                  <Controller
                    name="product_image_file"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <>
                        <Box
                          sx={{
                            borderStyle: 'dashed',
                            borderColor: '#ccc',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >

                          {!field.value && (
                            <>
                              <Box><UploadFileIcon /></Box>
                              <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/jpeg,image/png"
                                onChange={e => {
                                  const file = e.target.files?.[0] ?? null;
                                  field.onChange(file);
                                }}
                              />
                              <Box sx={{ mt: 1, fontSize: 12, color: '#777' }}>クリックして画像を選択</Box>
                            </>
                          )}
                          {field.value && (
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">{field.value.name}</Typography>
                              <Button
                                size="small"
                                color="error"
                                onClick={e => {
                                  e.stopPropagation();
                                  field.onChange(null);
                                  if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                              >
                                削除
                              </Button>
                            </Box>
                          )}

                        </Box>
                      </>
                    )}
                  />

                </Paper>
                <Paper sx={{ p: 1, mb: 1  }}>
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>商品名</FormLabel>
                      <OutlinedInput
                        id="product_name"
                        type="text"
                        size="small" 
                        placeholder="Product Name"
                        {...register("product_name")}
                        onChange={e => {
                          setProductName(e.target.value);
                          register("product_name").onChange(e);
                        }}
                      />
                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>カテゴリ</FormLabel>
                      {/* <Select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        displayEmpty
                        size="small"
                        sx={{ color: '#525050ff' }}
                      >
                        <MenuItem value="" sx={{ color: '#525050ff' }}>
                          <em>未選択</em>
                        </MenuItem>
                        {(apiResCategories ?? []).map(cat => (
                          <MenuItem key={cat.id} value={cat.id} sx={{ color: '#525050ff' }}>
                            {cat.category}
                          </MenuItem>
                        ))}
                      </Select> */}

                      <Controller
                        name="selected_category_id"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            {...field}
                            displayEmpty
                            size="small"
                            sx={{ color: '#525050ff' }}
                          >
                            <MenuItem value="" sx={{ color: '#525050ff' }}>
                              <em>未選択</em>
                            </MenuItem>
                            {(apiResCategories ?? []).map(cat => (
                              <MenuItem key={cat.id} value={cat.id} sx={{ color: '#525050ff' }}>
                                {cat.category}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />

                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>価格</FormLabel>
                      <OutlinedInput 
                        id="product_price"
                        type="number"
                        size="small" 
                        placeholder="Price"
                        {...register("product_price")}
                        onChange={e => {
                          setPrice(e.target.value);
                          register("product_price").onChange(e);
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} size={12} sx={{ m: 1 }}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel required sx={{ ml: 1 }}>商品詳細</FormLabel>
                      <TextField
                        id="product_detail"
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
                        {...register("product_description")}
                        onChange={e => {
                          setDetail(e.target.value);
                          register("product_description").onChange(e);
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel sx={{ ml: 1 }}>タグ</FormLabel>
                      <Controller
                        name="selected_tags"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            options={
                              (apiResTags ?? []).filter(
                                tag => !(field.value ?? []).some((selected: Tag) => selected.id === tag.id)
                              )
                            }
                            getOptionLabel={option => option.tag ?? ""}
                            value={field.value ?? []}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.tag}
                                  {...getTagProps({ index })}
                                  key={option.id}
                                />
                              ))
                            }
                            renderInput={params => (
                              <TextField
                                {...params}
                                placeholder={watchedTags.length < 1 ? "タグを選択" : ""}
                                size="small"
                                variant="outlined"
                              />
                            )}
                            size="small"
                          />
                        )}
                      />

                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormLabel sx={{ ml: 1 }}>材料</FormLabel>
                      {/* <Autocomplete
                        multiple
                        options={apiResIngredients ?? []}
                        getOptionLabel={option => option.ingredient}
                        value={selectedIngredients}
                        onChange={(event, newValue) => setSelectedIngredients(newValue)}
                        renderTags={(value, getIngredientProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option.ingredient}
                              {...getIngredientProps({ index })}
                              key={option.id}
                            />
                          ))
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="材料を選択"
                            size="small"
                            variant="outlined"
                          />
                        )}
                        size="small"
                      /> */}

                      <Controller
                        name="selected_ingredients"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            options={
                              (apiResIngredients ?? []).filter(
                                ingredient => !(field.value ?? []).some((selected: Ingredient) => selected.id === ingredient.id)
                              )
                            }
                            getOptionLabel={option => option.ingredient ?? ""}
                            value={field.value ?? []}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            renderTags={(value, getIngredientProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.ingredient}
                                  {...getIngredientProps({ index })}
                                  key={option.id}
                                />
                              ))
                            }
                            renderInput={params => (
                              <TextField
                                {...params}
                                placeholder={watchedIngredients.length < 1 ? "材料を選択" : ""}
                                size="small"
                                variant="outlined"
                              />
                            )}
                            size="small"
                          />
                        )}
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
  product_image_file?: File | null;
  product_name?: string | null;
  product_description?: string | null;
  product_price?: string | null;
  selected_category_id?: string | null;
  selected_tags?: Tag[] | null;
  selected_ingredients?: Ingredient[] | null;
  // tag?: string[] | null;
}
