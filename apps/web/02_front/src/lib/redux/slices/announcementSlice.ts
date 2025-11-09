// src/store/userSlice.ts
import { ApiArgsCreateAnnouncement, ApiArgsCreateProduct, ApiArgsLogin, ApiArgsUpdateAnnouncement, ApiArgsUpdateProduct } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Category } from '@/lib/types/category';
import { Announcement } from '@/lib/types/announcement';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface AnnouncementState {
  announcement: null | Announcement;
  announcements: Announcement[];

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  createStatus: null | 'loading' | 'succeeded' | 'failed' ;
  updateStatus: null | 'loading' | 'succeeded' | 'failed' ;
  deleteStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: AnnouncementState = {
  announcement: null,
  announcements: [],

  fetchStatus: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const getAnnouncements = createAsyncThunk(
  "announcement/get-announcements",
  async () => {

    try {
      const response = await fetch(`${apiUrl}api/announcements`, {
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

export const getAnnouncement = createAsyncThunk(
  "announcement/get-announcement",
  async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}api/announcement?id=${id}`, {
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

export const createAnnouncement = createAsyncThunk(
  "announcements/create",
  async (announcement: ApiArgsCreateAnnouncement) => {

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
      formData.append("title", announcement.title);
      formData.append("announcement", announcement.announcement);

      const response = await fetch(`${apiUrl}api/announcement-create`, {
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

export const updateAnnouncement = createAsyncThunk(
  "announcements/update",
  async (announcement: ApiArgsUpdateAnnouncement) => {

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
      formData.append("id", announcement.id);
      formData.append("title", announcement.title);
      formData.append("announcement", announcement.announcement);
      const response = await fetch(`${apiUrl}api/announcement-update`, {
        method: "POST",
        cache: "no-store",
        headers: {
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
        },
        credentials: "include",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update announcement");
      return await response.json();
      
    } catch (error) {
      console.error('★API★ logout error', error);
      return error;
    }

  }
);

export const deleteAnnouncement = createAsyncThunk(
  "announcements/delete",
  async (announcementId: string) => {

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
      body: JSON.stringify({ id: announcementId }),
    });
    if (!response.ok) throw new Error("Failed to delete announcement");
    return await response.json();
  }
);


export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAnnouncements
    builder.addCase(getAnnouncements.pending, (state) => {
      state.fetchStatus = "loading";
      state.announcements = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getAnnouncements.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getAnnouncements.fulfilled★ action", action);
      if (action.payload && action.payload.announcements) {
        state.announcements = action.payload.announcements;
      } 
    });
    builder.addCase(getAnnouncements.rejected, (state) => {
      state.fetchStatus = "failed";
    });  

    // getAnnouncement
    builder.addCase(getAnnouncement.pending, (state) => {
      state.fetchStatus = "loading";
      state.announcement = null;
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getAnnouncement.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("getAnnouncement.fulfilled★ action", action);
      if (action.payload && action.payload.announcement) {
        state.announcement = action.payload.announcement;
      } 
    });
    builder.addCase(getAnnouncement.rejected, (state) => {
      state.fetchStatus = "failed";
    });

    // createAnnouncement
    builder.addCase(createAnnouncement.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.announcements = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(createAnnouncement.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("createAnnouncement.fulfilled★ action", action);
      if (action.payload && action.payload.announcements) {
        state.announcements = action.payload.announcements;
      } 
    });
    builder.addCase(createAnnouncement.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

    // updateAnnouncement
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.announcements = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("updateAnnouncement.fulfilled★ action", action);
      if (action.payload && action.payload.announcements) {
        state.announcements = action.payload.announcements;
      }
    });
    builder.addCase(updateAnnouncement.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });
  

    // deleteAnnouncement
    builder.addCase(deleteAnnouncement.pending, (state) => {
      state.fetchStatus = "loading";
      state.createStatus = "loading";
      state.announcements = [];
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      state.createStatus = "succeeded";
      console.log("deleteAnnouncement.fulfilled★ action", action);
      if (action.payload && action.payload.announcements) {
        state.announcements = action.payload.announcements;
      } 
    });
    builder.addCase(deleteAnnouncement.rejected, (state) => {
      state.fetchStatus = "failed";
      state.createStatus = "failed";
    });

  }
});




// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.announcement.fetchStatus;
export const createStatus = (state: RootState) => state.announcement.createStatus;
export const updateStatus = (state: RootState) => state.announcement.updateStatus;
export const deleteStatus = (state: RootState) => state.announcement.deleteStatus;

export const announcements = (state: RootState) => state.announcement.announcements;
export const announcement = (state: RootState) => state.announcement.announcement;

// export const { login, logout, setUser } = accountSlice.actions;
export default announcementSlice.reducer;