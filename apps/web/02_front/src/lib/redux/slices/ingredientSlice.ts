// src/store/userSlice.ts
import { ApiArgsLogin } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Ingredient } from '@/lib/types/ingredient';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface IngredientState {
  ingredient: null | Ingredient;
  ingredients: Ingredient[];

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  createStatus: null | 'loading' | 'succeeded' | 'failed' ;
  updateStatus: null | 'loading' | 'succeeded' | 'failed' ;
  deleteStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: IngredientState = {
  ingredient: null,
  ingredients: [],

  fetchStatus: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const getIngredients = createAsyncThunk(
  "ingredient/get-ingredients",
  async () => {

    try {
      const response = await fetch(`${apiUrl}api/ingredients`, {
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

export const createIngredient = createAsyncThunk(
  "ingredients/create",
  async (ingredient: string) => {

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
      console.log("★API★ createIngredient xsrfToken ", xsrfToken);

      const response = await fetch(`${apiUrl}api/ingredient-create`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ingredient }),
      });
      if (!response.ok) throw new Error("Failed to create ingredient");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/update",
  async (data: { id: string | null; ingredient: string }) => {
    try {
      let xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "")); 
      if (xsrfToken) {
        xsrfToken = xsrfToken.split("=")[1];
      }

      const response = await fetch(`${apiUrl}api/ingredient-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: data.id, ingredient: data.ingredient }),
      });
      if (!response.ok) throw new Error("Failed to update ingredient");
      return await response.json();
    } catch (error) {
      console.error("★API★ updateIngredient error", error);
      return error;
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/delete",
  async (id: string) => {

    let xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ""));

    if (xsrfToken) {
      xsrfToken = xsrfToken.split("=")[1];
    }

    const response = await fetch(`${apiUrl}api/ingredient-delete`, {
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


export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getIngredients
    builder.addCase(getIngredients.pending, (state) => {
      state.fetchStatus = "loading";
      state.ingredients = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getIngredients.fulfilled★ action", action);
      if (action.payload && action.payload.ingredients) {
        state.ingredients = action.payload.ingredients;
      } 
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.fetchStatus = "failed";
    });  

    // createIngredient
    builder.addCase(createIngredient.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.ingredients = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(createIngredient.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("createIngredient.fulfilled★ action", action);
      if (action.payload && action.payload.ingredients) {
        state.ingredients = action.payload.ingredients;
      } 
    });
    builder.addCase(createIngredient.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

    // updateIngredient
    builder.addCase(updateIngredient.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.ingredients = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(updateIngredient.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("updateIngredient.fulfilled★ action", action);
      if (action.payload && action.payload.ingredients) {
        state.ingredients = action.payload.ingredients;
      }
    });
    builder.addCase(updateIngredient.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });
  

    // deleteIngredient
    builder.addCase(deleteIngredient.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.ingredients = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(deleteIngredient.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("deleteIngredient.fulfilled★ action", action);
      if (action.payload && action.payload.ingredients) {
        state.ingredients = action.payload.ingredients;
      } 
    });
    builder.addCase(deleteIngredient.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

  }
});

// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.ingredient.fetchStatus;
export const createStatus = (state: RootState) => state.ingredient.createStatus;
export const updateStatus = (state: RootState) => state.ingredient.updateStatus;
export const deleteStatus = (state: RootState) => state.ingredient.deleteStatus;

export const ingredients = (state: RootState) => state.ingredient.ingredients;


// export const { login, logout, setUser } = accountSlice.actions;
export default ingredientSlice.reducer;