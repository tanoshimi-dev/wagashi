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
  login as accountLogin,
  fetchStatus,
   account,
} from "@/lib/redux/slices/accountSlice";
import { ApiArgsLogin } from "@/lib/types/api_args";

import CircularProgress from "@mui/material/CircularProgress";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box, FormLabel, Grid } from "@mui/material";

export default function LoginForm() {
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

  const handleLogin = (data: any) => {
    const email = data.email;
    const password = data.password;

    // setLoginOperation(true);
    // setErrorMessage(null);
    dispatch(accountLogin({ email, password } as ApiArgsLogin));
  };
  
  useEffect(() => {
      if (apiResAccount && apiResAccount.account) {
        // Redirect to dashboard or another page after successful login
        window.location.href = "/";
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
  }, [loginOperation]);


  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // TODO: Implement login logic here
  //   alert(`Login: ${email}`);
  // };

  return (
    <form onSubmit={handleSubmit(handleLogin)} style={{ maxWidth: 640, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>ログイン</h2>
      {/* <div style={{ marginBottom: 16 }}>
        <label>
          メールアドレス<br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
          <OutlinedInput
            id="email"
            type="text"
            autoComplete=""
            required
            size="small"
            {...register("email", { required: "必須項目です。" })}
          />
        </label>
      </div> */}

      <Grid container columns={24} sx={{ width: "32vw" }}>


        <Grid size={24} display="flex" sx={{ alignItems: "center" }}>
          <Box>
            <FormLabel
              htmlFor="email"
              sx={{ fontSize: 12, display: "block", width: 160 }}
              required
            >
              メールアドレス
            </FormLabel>
          </Box>
          <Box sx={{ margin: "0 4px" }}>
            <OutlinedInput
              id="email"
              type="text"
              autoComplete=""
              required
              size="small"
              {...register("email", { required: "必須項目です。" })}
            />
          </Box>
        </Grid>

        <Grid size={24} display="flex" sx={{ alignItems: "center" }}>
          <Box>
            <FormLabel
              htmlFor="password"
              sx={{ fontSize: 12, display: "block", width: 160 }}
              required
            >
              パスワード
            </FormLabel>
          </Box>
          <Box sx={{ margin: "0 4px" }}>
            <OutlinedInput
              id="password"
              type="text"
              autoComplete=""
              required
              size="small"
              {...register("password", { required: "必須項目です。" })}
            />
          </Box>
        </Grid>

      </Grid>
{/* 
      <div style={{ marginBottom: 16 }}>
        <label>
          パスワード<br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>
      </div> */}

      <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
        ログイン
      </button>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/forgot-password" style={{ marginRight: 16 }}>パスワードを忘れた方</a>
        <a href="/register">新規登録</a>
      </div>
    </form>
  );
}