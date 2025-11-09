// src/store/userSlice.ts
import { ApiArgsLogin } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Tag } from '@/lib/types/tag';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface TagState {
  tag: null | Tag;
  tags: Tag[];

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  createStatus: null | 'loading' | 'succeeded' | 'failed' ;
  updateStatus: null | 'loading' | 'succeeded' | 'failed' ;
  deleteStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: TagState = {
  tag: null,
  tags: [],

  fetchStatus: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const getTags = createAsyncThunk(
  "tag/get-tags",
  async () => {

    try {
      const response = await fetch(`${apiUrl}api/tags`, {
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

export const createTag = createAsyncThunk(
  "tags/create",
  async (tag: string) => {

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
      console.log("★API★ createTag xsrfToken ", xsrfToken);

      const response = await fetch(`${apiUrl}api/tag-create`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tag }),
      });
      if (!response.ok) throw new Error("Failed to create tag");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const updateTag = createAsyncThunk(
  "tags/update",
  async (data: { id: string | null; tag: string }) => {
    try {
      let xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "")); 
      if (xsrfToken) {
        xsrfToken = xsrfToken.split("=")[1];
      }

      const response = await fetch(`${apiUrl}api/tag-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: data.id, tag: data.tag }),
      });
      if (!response.ok) throw new Error("Failed to update tag");
      return await response.json();
    } catch (error) {
      console.error("★API★ updateTag error", error);
      return error;
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tags/delete",
  async (id: string) => {

    let xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ""));

    if (xsrfToken) {
      xsrfToken = xsrfToken.split("=")[1];
    }

    const response = await fetch(`${apiUrl}api/tag-delete`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",        
       },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error("Failed to delete tag");
    return id;
  }
);


export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getTags
    builder.addCase(getTags.pending, (state) => {
      state.fetchStatus = "loading";
      state.tags = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getTags.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getTags.fulfilled★ action", action);
      if (action.payload && action.payload.tags) {
        state.tags = action.payload.tags;
      } 
    });
    builder.addCase(getTags.rejected, (state) => {
      state.fetchStatus = "failed";
    });  

    // createTag
    builder.addCase(createTag.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.tags = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(createTag.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("createTag.fulfilled★ action", action);
      if (action.payload && action.payload.tags) {
        state.tags = action.payload.tags;
      } 
    });
    builder.addCase(createTag.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

    // updateTag
    builder.addCase(updateTag.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.tags = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(updateTag.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("updateTag.fulfilled★ action", action);
      if (action.payload && action.payload.tags) {
        state.tags = action.payload.tags;
      }
    });
    builder.addCase(updateTag.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });
  

    // deleteTag
    builder.addCase(deleteTag.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.tags = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(deleteTag.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("deleteTag.fulfilled★ action", action);
      if (action.payload && action.payload.tags) {
        state.tags = action.payload.tags;
      } 
    });
    builder.addCase(deleteTag.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

  }
});

// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.tag.fetchStatus;
export const createStatus = (state: RootState) => state.tag.createStatus;
export const updateStatus = (state: RootState) => state.tag.updateStatus;
export const deleteStatus = (state: RootState) => state.tag.deleteStatus;

export const tags = (state: RootState) => state.tag.tags;


// export const { login, logout, setUser } = accountSlice.actions;
export default tagSlice.reducer;