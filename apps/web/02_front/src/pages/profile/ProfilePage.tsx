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
  logout as accountLogout,
  fetchStatus,
  account,
} from "@/lib/redux/slices/accountSlice";
import { ApiArgsLogin } from "@/lib/types/api_args";

import CircularProgress from "@mui/material/CircularProgress";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Box, FormLabel, Grid } from "@mui/material";
import Link from 'next/link';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch<AppDispatch>();
  const apiResAccount = useSelector(account);
  //console.log("★Redux★ isLoggedIn", isLoggedIn, apiResAccount);
  const [loginOperation, setLoginOperation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues = {
    email: "",
    password: "",
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
    //resolver: zodResolver(userSchema)
  });

  const handleLogout = (data: any) => {
    console.log("★Logout★");
    dispatch(accountLogout());
  };
  
  useEffect(() => {
    if (loginOperation) {
      if (apiResAccount && apiResAccount.account) {
        // Redirect to dashboard or another page after successful login
        window.location.href = "/";
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
      setLoginOperation(false);
    }
  }, [apiResAccount, loginOperation]);


  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // TODO: Implement login logic here
  //   alert(`Login: ${email}`);
  // };

  return (
    <form onSubmit={handleSubmit(handleLogout)} style={{ maxWidth: 640, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>ダッシュボード</h2>

      <Grid container columns={24} sx={{ width: "32vw" }}>


        <Grid size={24} display="flex" sx={{ alignItems: "center" }}>
          <Box>
            <FormLabel
              htmlFor="email"
              sx={{ fontSize: 12, display: "block", width: 160 }}
              required
            >
              名前
            </FormLabel>
          </Box>
          <Box sx={{ margin: "0 4px" }}>
            { apiResAccount && apiResAccount.account ? apiResAccount.account.name : '' }
          </Box>
        </Grid>

        <Grid size={24} display="flex" sx={{ alignItems: "center" }}>
          <Box>
            <FormLabel
              htmlFor="password"
              sx={{ fontSize: 12, display: "block", width: 160 }}
              required
            >
              メール
            </FormLabel>
          </Box>
          <Box sx={{ margin: "0 4px" }}>
            { apiResAccount && apiResAccount.account ? apiResAccount.account.email : '' }
          </Box>
        </Grid>

      </Grid>

    </form>
  );
}