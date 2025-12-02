// src/store/userSlice.ts
import { ApiArgsLogin } from '@/lib/types/api_args';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { Account } from '@/lib/types/account';


const url = process.env.NEXT_PUBLIC_API_URL ?? "";
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX ?? "";
const apiUrl = url + suffix;
const HEADER_NAME_XSRF_TOKEN = "X-" + (process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "") + (process.env.NEXT_PUBLIC_APP_ENV ? "-" + process.env.NEXT_PUBLIC_APP_ENV : "");

interface UserState {
  isAuthenticated: boolean;
  account: null | Account;
  token: string | null;

  fetchStatus: null | 'loading' | 'succeeded' | 'failed' ;
  serverError: boolean;
  serverErrorMessage: string[];
}

const initialState: UserState = {
  isAuthenticated: false,
  account: null,
  token: null,

  fetchStatus: null,
  serverError: false,
  serverErrorMessage: [],

};

export const login = createAsyncThunk(
  "account/login",
  async (params: ApiArgsLogin) => {
    try {
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
        .find((row) =>
          row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? "")
        );

      if (xsrfToken) {
        xsrfToken = xsrfToken.split("=")[1];
      }
      const email = params.email;
      const password = params.password;

      console.log("★API★ login request ", { email, password });
      console.log("★API★ login xsrfToken ", xsrfToken);
      console.log("★API★ login apiUrl ", `${apiUrl}admin/login`);
      console.log("★API★ login HEADER_NAME_XSRF_TOKEN ", HEADER_NAME_XSRF_TOKEN);

      const response = await fetch(`${apiUrl}admin/login`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          // "X-STOREAPP-XSRF-TOKEN": decodeURIComponent(xsrfToken ?? ""),
          // 'X-XSRF-TOKEN': xsrfToken ?? '',
          [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
          // "X-STOREAPP-XSRF-TOKEN-local": decodeURIComponent(xsrfToken ?? ""),
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json(); // Extract JSON data from the response
      return data;
    } catch (error) {
      console.error("★API★ login error", error);
      return { error: true, message: error instanceof Error ? error.message : String(error) };
    }
  }
);

// session のみで管理する方法
export const getAuthUser = createAsyncThunk("account/user", async () => {
  console.log("★API★ getAuthUser request");
  try {
        
    const response = await fetch(`${apiUrl}admin/user`, {
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
});

export const logout = createAsyncThunk("account/logout", async () => {
  try {
    //console.log('★API★ logout url', params);
    console.log("★API★ logout HEADER_NAME_XSRF_TOKEN ", HEADER_NAME_XSRF_TOKEN);

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
    

    const response = await fetch(`${apiUrl}/admin/logout`, {
      // fetch("https://rehop.jp/demo/trade_back/public/login", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // "X-STOREAPP-XSRF-TOKEN": decodeURIComponent(xsrfToken ?? ""),
        [HEADER_NAME_XSRF_TOKEN]: decodeURIComponent(xsrfToken ?? ""),
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return;
    }

    //console.log('★API★ logout response', response)
    const data = await response.json(); // Extract JSON data from the response
    console.log('★API★ logout ', data);
    return data;
  } catch (error) {
    console.error('★API★ logout error', error);
    return error;
  }
});


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.fetchStatus = "loading";
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetchStatus = "succeeded";
      console.log("login.fulfilled★ action", action);
      if (action.payload && action.payload.user) {
        // state.isAuthenticated = true;
        state.account = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        //state.token = action.payload.token; // Assuming the token is returned in the payload
      } else {
        // state.isAuthenticated = false;
        state.account = null;
        state.token = null;

      } // Handle login failure or invalid response
    });
    builder.addCase(login.rejected, (state) => {
      state.fetchStatus = "failed";
      // state.isAuthenticated = false;
      state.account = null;
      state.token = null;
    }); // Handle login failure
  
    // getAuthUser
    builder.addCase(getAuthUser.pending, (state, action) => {
      state.fetchStatus = "loading";
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      // state.fetchStatus = "success";
      console.log("getAuthUser.fulfilled★ action", action);
      if (action.payload && action.payload.user) {
        
        state.fetchStatus = "succeeded";
        state.account = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
        };

      } else {
        state.fetchStatus = "failed";
      }
    });
    builder.addCase(getAuthUser.rejected, (state, action) => {
      state.fetchStatus = "failed";
    });

    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.fetchStatus = "loading";
      state.serverError = false;
      state.serverErrorMessage = [];
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.account = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.fetchStatus = "failed";
    });

  }
});

// export const isAuthenticated = (state: RootState) => state.account.isAuthenticated; 
export const fetchStatus = (state: RootState) => state.account.fetchStatus;
export const account = (state: RootState) => state.account;


// export const { login, logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;