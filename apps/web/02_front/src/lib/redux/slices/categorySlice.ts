// src/store/userSlice.ts
import { ApiArgsLogin } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Category } from '@/lib/types/category';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface CategoryState {
  category: null | Category;
  categories: Category[];

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  createStatus: null | 'loading' | 'succeeded' | 'failed' ;
  updateStatus: null | 'loading' | 'succeeded' | 'failed' ;
  deleteStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: CategoryState = {
  category: null,
  categories: [],

  fetchStatus: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async () => {

    try {
      const response = await fetch(`${apiUrl}api/categories`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("★API★ getAuthUser error", error);
    }

  }

);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (category: string) => {

    try {

      //console.log('★API★ logout url', params);
      const sanctumResponse = await fetch(`${apiUrl}sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!sanctumResponse.ok) {
        return;
      }

      let xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ""));

      if (xsrfToken) {
        xsrfToken = xsrfToken.split("=")[1];
      }
      console.log("★API★ createCategory xsrfToken ", xsrfToken);

      const response = await fetch(`${apiUrl}api/category-create`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ category }),
      });
      if (!response.ok) throw new Error("Failed to create category");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (data: { id: string | null; category: string }) => {
    try {
      let xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "")); 
      if (xsrfToken) {
        xsrfToken = xsrfToken.split("=")[1];
      }

      const response = await fetch(`${apiUrl}api/category-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: data.id, category: data.category }),
      });
      if (!response.ok) throw new Error("Failed to update category");
      return await response.json();
    } catch (error) {
      console.error("★API★ updateCategory error", error);
      return error;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string) => {

    let xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ""));

    if (xsrfToken) {
      xsrfToken = xsrfToken.split("=")[1];
    }

    const response = await fetch(`${apiUrl}api/category-delete`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",        
       },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error("Failed to delete category");
    return id;
  }
);


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getCategories
    builder.addCase(getCategories.pending, (state) => {
      state.fetchStatus = "loading";
      state.categories = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getCategories.fulfilled★ action", action);
      if (action.payload && action.payload.categories) {
        state.categories = action.payload.categories;
      } 
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.fetchStatus = "failed";
    });  

    // createCategory
    builder.addCase(createCategory.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.categories = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("createCategory.fulfilled★ action", action);
      if (action.payload && action.payload.categories) {
        state.categories = action.payload.categories;
      } 
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

    // updateCategory
    builder.addCase(updateCategory.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.categories = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("updateCategory.fulfilled★ action", action);
      if (action.payload && action.payload.categories) {
        state.categories = action.payload.categories;
      }
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });
  

    // deleteCategory
    builder.addCase(deleteCategory.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.categories = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("deleteCategory.fulfilled★ action", action);
      if (action.payload && action.payload.categories) {
        state.categories = action.payload.categories;
      } 
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

  }
});

// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.category.fetchStatus;
export const createStatus = (state: RootState) => state.category.createStatus;
export const updateStatus = (state: RootState) => state.category.updateStatus;
export const deleteStatus = (state: RootState) => state.category.deleteStatus;

export const categories = (state: RootState) => state.category.categories;


// export const { login, logout, setUser } = accountSlice.actions;
export default categorySlice.reducer;