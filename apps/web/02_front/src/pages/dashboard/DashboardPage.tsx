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

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

const data = [
  { name: '5月', value: 350, barValue: 400 },
  { name: '6月', value: 300, barValue: 550 },
  { name: '7月', value: 200, barValue: 350 },
  { name: '8月', value: 280, barValue: 680 },
  { name: '9月', value: 200, barValue: 350 },
  { name: '10月', value: 280, barValue: 680 },
];


export default function DashboardPage() {
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

  return (
    <Box sx={{ height: '100%', width: '100%' }}>

      <Box sx={{ padding: 2, backgroundColor: '#fff2ed', height: '60px' }}></Box>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        
        <Grid sx={{ width: 740, m: 1 }}>
          <Box display="flex">
            <Box sx={{ 
              backgroundColor: '#fff2ed', borderRadius: 4,
              width: 740, height: 40 }}
            >
            </Box>
          </Box>

          <Box display="flex" sx={{ p: 1}}>
            <Grid container spacing={1} sx={{ padding: 1, justifyContent: 'center'  }}>
              <Grid sx={{ width: '320px', p: 2, m:1, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ 
                  backgroundColor: '#fff2ed', borderRadius: 4,
                  width: 180, height: 40, fontWeight: 'semibold', fontSize: 18,
                  mb: 2, pl:1, lineHeight: '40px'}}
                >
                  ユーザー数
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ pl: 1, lineHeight: '20px', fontSize: '40px' }}>1,011</Box>
                  <Box sx={{ pl: 1 }}>人</Box>
                </Box>
                <Box sx={{ my: 2, ml: 1, fontSize: 14, color: '#a39d9bff' }}>
                  2025年10月（前月比 +133人）
                </Box>
              </Grid>
              <Grid sx={{ width: '320px', p: 2, m:1, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ 
                  backgroundColor: '#fff2ed', borderRadius: 4,
                  width: 180, height: 40, fontWeight: 'semibold', fontSize: 18,
                  mb: 2, pl:1, lineHeight: '40px'}}
                >
                  新規ユーザー数
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ pl: 1, lineHeight: '20px', fontSize: '40px' }}>33</Box>
                  <Box sx={{ pl: 1 }}>人</Box>
                </Box>
                <Box sx={{ my: 2, ml: 1, fontSize: 14, color: '#a39d9bff' }}>
                  2025年10月（前月比 +5人）
                </Box>
              </Grid>
              <Grid sx={{ width: '320px', p: 2, m:1, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ 
                  backgroundColor: '#fff2ed', borderRadius: 4,
                  width: 180, height: 40, fontWeight: 'semibold', fontSize: 18,
                  mb: 2, pl:1, lineHeight: '40px'}}
                >
                  商品閲覧数
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ pl: 1, lineHeight: '20px', fontSize: '40px' }}>51,078</Box>
                  <Box sx={{ pl: 1 }}>view</Box>
                </Box>
                <Box sx={{ my: 2, ml: 1, fontSize: 14, color: '#a39d9bff' }}>
                  2025年10月（前月比 +719view）
                </Box>
              </Grid>
              <Grid sx={{ width: '320px', p: 2, m:1, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ 
                  backgroundColor: '#fff2ed', borderRadius: 4,
                  width: 180, height: 40, fontWeight: 'semibold', fontSize: 18,
                  mb: 2, pl:1, lineHeight: '40px'}}
                >
                  問合せ数
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ pl: 1, lineHeight: '20px', fontSize: '40px' }}>78</Box>
                  <Box sx={{ pl: 1 }}>件</Box>
                </Box>
                <Box sx={{ my: 2, ml: 1, fontSize: 14, color: '#a39d9bff' }}>
                  2025年10月（前月比 -12件）
                </Box>
              </Grid>
            </Grid>
          </Box>

        </Grid>

        <Grid sx={{ width: 760, m: 1 }}>
          {/* <Box display="flex" sx={{ backgroundColor: "#e2aaaaff", alignItems: "center", p: 1 }}>
            <Box>
              <FormLabel
                sx={{ fontSize: 12, display: "block", width: 160 }}
                required
              >
                メール
              </FormLabel>
            </Box>
            <Box sx={{ margin: "0 4px" }}>
              {apiResAccount && apiResAccount.account ? apiResAccount.account.email : ''}
            </Box>
          </Box> */}

          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2, height: '640px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="barValue" fill="#ff9999" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={4} />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

      </Grid>

    </Box>
  );
}