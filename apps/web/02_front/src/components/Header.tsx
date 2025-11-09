
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


import { Box, CircularProgress, LinearProgress, useMediaQuery } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import Link from 'next/link';
import { Account } from "@/lib/types/account";

export default function Header({ 
  onMenuClick
 }: { 
  onMenuClick?: () => void}) 
{
  const isMobile = useMediaQuery('(max-width:600px)');


  const dispatch = useDispatch<AppDispatch>();
  const apiResFetchStatus = useSelector(fetchStatus);
  const apiResAccount = useSelector(account) as { account: any } | null;
  console.log("★Header Redux★ ", apiResAccount);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getAuthUser());
  //   }
  // }, [isLoggedIn, dispatch]);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);


  return (
    <header>
      {/* Show menu button only on mobile */}
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      )}
      {/* Always show the rest of your header for both mobile and PC */}
      <Box sx={{ display: 'flex', ml: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
       }}>
        {/* Place your logo, title, user info, etc. here */}
        <Box color="inherit" sx={{ ml: 2, my: 1, display: 'flex', alignItems: 'center' }}>
          <img 
            src="/demo_logo.png" 
            alt="Logo" 
            style={{ height: '40px', width: 'auto', marginRight: '8px' }}
          />
        </Box>
        <Box color="inherit" sx={{ ml: 2, marginTop: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>
          STORE APP DEMO
        </Box>

        {apiResAccount && apiResAccount.account ?
          <Link href="/account/profile">
            <Box color="inherit" 
              sx={{ display: 'flex', marginBottom: 1 }}>
              <Box>
                <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ marginTop:0.5 }}>{apiResAccount.account.name}</Box>
            </Box>
          </Link>
          :
          <Link href="/account/login">
            <IconButton color="inherit" sx={{ ml: 2, marginBottom: 1 }}>
              <LoginOutlinedIcon />
            </IconButton>
          </Link>
        }
      </Box>
      { apiResFetchStatus === 'loading' &&
        <LinearProgress color="inherit" />
      }

    </header>
  );
}