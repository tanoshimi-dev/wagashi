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
  getAuthUser,
} from "@/lib/redux/slices/accountSlice";
import { ApiArgsLogin } from "@/lib/types/api_args";

import { Box, useMediaQuery } from '@mui/material';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import MainContents from '@/components/MainContents';

export default function DashboardLayout({ children, ...props }: React.PropsWithChildren<any>) {

  // Detect mobile screen
  const isMobile = useMediaQuery('(max-width:600px)');
  const [navOpen, setNavOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const apiResAccount = useSelector(account) as { account: any } | null;
  console.log("★DashboardLayout Redux★ isLoggedIn", apiResAccount);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getAuthUser());
  //   }
  // }, [isLoggedIn, dispatch]);

  // useEffect(() => {
  //   dispatch(getAuthUser());
  // }, [isLoggedIn, dispatch]);


  return (
    <Box sx={{ m:0.5, display: 'flex', flex: '1 1 auto', flexDirection: 'column', ...props.sx }} {...props}>
      <Header onMenuClick={() => setNavOpen(!navOpen)} />
      <Box sx={{ display: 'flex', flex: '1 1 auto' }}>
        {/* Show navigation only if not mobile, or if mobile and navOpen */}
        { apiResAccount && apiResAccount?.account !== null && 
          (!isMobile || navOpen) && <Navigation />
        }
        { children }
      </Box>
    </Box>
  );

}   
