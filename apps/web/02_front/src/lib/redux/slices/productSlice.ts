// src/store/userSlice.ts
import { ApiArgsCreateProduct, ApiArgsLogin, ApiArgsUpdateProduct } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Category } from '@/lib/types/category';
import { Product } from '@/lib/types/product';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface ProductState {
  product: null | Product;
  products: Product[];

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  createStatus: null | 'loading' | 'succeeded' | 'failed' ;
  updateStatus: null | 'loading' | 'succeeded' | 'failed' ;
  deleteStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: ProductState = {
  product: null,
  products: [],

  fetchStatus: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const getProducts = createAsyncThunk(
  "product/get-products",
  async () => {

    try {
      const response = await fetch(`${apiUrl}api/products`, {
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

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}api/product?pid=${id}`, {
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

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: ApiArgsCreateProduct) => {

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
      console.log("★API★ createProduct xsrfToken ", xsrfToken);

      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_description", product.product_description);
      formData.append("product_price", product.product_price.toString());
      if (product.category_id) formData.append("category_id", product.category_id);
      if (product.product_image_file) formData.append("product_image_file", product.product_image_file);
      if (product.tag_ids) {
        product.tag_ids.forEach((tag_id) => {
          formData.append("tag_ids[]", tag_id);
        });
      }
      if (product.ingredient_ids) {
        product.ingredient_ids.forEach((ingredient_id) => {
          formData.append("ingredient_ids[]", ingredient_id);
        });
      }


      const response = await fetch(`${apiUrl}api/product-create`, {
        method: "POST",
        cache: "no-store",
        headers: {
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
        },
        credentials: "include",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create product");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: ApiArgsUpdateProduct) => {

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
      console.log("★API★ updateProduct xsrfToken ", xsrfToken);

      const formData = new FormData();
      formData.append("product_id", product.product_id);
      formData.append("product_name", product.product_name);
      formData.append("product_description", product.product_description);
      formData.append("product_price", product.product_price.toString());
      if (product.category_id) formData.append("category_id", product.category_id);
      if (product.product_image_file) formData.append("product_image_file", product.product_image_file);
      if (product.tag_ids) {
        product.tag_ids.forEach((tag_id) => {
          formData.append("tag_ids[]", tag_id);
        });
      } else {
        formData.append("tag_ids[]", "");
      }
      if (product.ingredient_ids) {
        product.ingredient_ids.forEach((ingredient_id) => {
          formData.append("ingredient_ids[]", ingredient_id);
        });
      } else {
        formData.append("ingredient_ids[]", "");
      }

      const response = await fetch(`${apiUrl}api/product-update`, {
        method: "POST",
        cache: "no-store",
        headers: {
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
        },
        credentials: "include",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update product");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: string) => {

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
      body: JSON.stringify({ id: productId }),
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return productId;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getProducts
    builder.addCase(getProducts.pending, (state) => {
      state.fetchStatus = "loading";
      state.products = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getProducts.fulfilled★ action", action);
      if (action.payload && action.payload.products) {
        state.products = action.payload.products;
      } 
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.fetchStatus = "failed";
    });  

    // getProduct
    builder.addCase(getProduct.pending, (state) => {
      state.fetchStatus = "loading";
      state.product = null;
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getProduct.fulfilled★ action", action);
      if (action.payload && action.payload.product) {
        state.product = action.payload.product;
      } 
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.fetchStatus = "failed";
    });

    // createProduct
    builder.addCase(createProduct.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.products = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("createProduct.fulfilled★ action", action);
      if (action.payload && action.payload.products) {
        state.products = action.payload.products;
      } 
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

    // updateProduct
    builder.addCase(updateProduct.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.products = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("updateProduct.fulfilled★ action", action);
      if (action.payload && action.payload.products) {
        state.products = action.payload.products;
      }
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });
  

    // deleteProduct
    builder.addCase(deleteProduct.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.products = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("deleteProduct.fulfilled★ action", action);
      if (action.payload && action.payload.products) {
        state.products = action.payload.products;
      } 
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

  }
});




// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.product.fetchStatus;
export const createStatus = (state: RootState) => state.product.createStatus;
export const updateStatus = (state: RootState) => state.product.updateStatus;
export const deleteStatus = (state: RootState) => state.product.deleteStatus;

export const products = (state: RootState) => state.product.products;
export const product = (state: RootState) => state.product.product;

// export const { login, logout, setUser } = accountSlice.actions;
export default productSlice.reducer;