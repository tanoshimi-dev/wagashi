import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Box,
  Typography
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Folder,
  FolderOpen,
  Description,
  Settings,
  Person,
  Dashboard,
  CategoryOutlined,
  PeopleAltOutlined,
  DynamicFeedOutlined,
  FactCheckOutlined,
  SellOutlined,
  ListAltOutlined,
  DirectionsOffOutlined,
} from '@mui/icons-material';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import DirectionsOffOutlinedIcon from '@mui/icons-material/DirectionsOffOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  //const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const getOpenMenu = () => {
    if (pathname.startsWith('/product')) return 'product'; // product and products
    if (pathname.startsWith('/announcement')) return 'announcement';
    if (pathname.startsWith('/master')) return 'master';
    if (pathname.startsWith('/orders')) return 'orders';
    if (pathname.startsWith('/refunds')) return 'refunds';
    if (pathname.startsWith('/users')) return 'files';
    if (pathname.startsWith('/settings')) return 'settings';
    return '';
  };

  const router = useRouter();
  const pathname = router.pathname;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
      [getOpenMenu()]: true
  });

  const handleToggle = (itemId: string) => {
    setOpenItems(prev => ({
//      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isSelected = (menuPath: string) => pathname.startsWith(menuPath);

   return (
    <Box sx={{ width: 260, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
      <List component="nav" dense>
        <Typography variant="h6" sx={{ fontSize: 16, color: '#C0C0C0', fontWeight: 'bold', mx: 2, my:2 }} >
          GENERAL
        </Typography>
        {/* Dashboard - No submenu */}
        <ListItemButton sx={{ 
          mb: 0.75,
          bgcolor: isSelected('/dashboard') ? '#e3f2fd' : undefined,
          color: isSelected('/dashboard') ? '#1976d2' : undefined,         
         }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="ダッシュボード" />
          </Link>
        </ListItemButton>

        {/* Products - With submenu */}
        <ListItemButton sx={{ mb: 0.75 }}
        
          onClick={() => handleToggle('product')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.product ? <Inventory2OutlinedIcon /> : <Inventory2OutlinedIcon />}
          </ListItemIcon>
          <ListItemText primary="商品" />
          {openItems.product ? <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.product} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/products/list" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/products/list') ? '#e3f2fd' : undefined,
                color: isSelected('products/list') ? '#1976d2' : undefined,                
              }}>
                <ListItemText primary="一覧" />
              </ListItemButton>
            </Link>
            <Link href="/product/detail" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/product/detail') ? '#e3f2fd' : undefined,
                color: isSelected('/product/detail') ? '#1976d2' : undefined,         
              }}
              >
                <ListItemText primary="検索" />
              </ListItemButton>
            </Link>
            <Link href="/product/edit" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/product/edit') ? '#e3f2fd' : undefined,
                color: isSelected('/product/edit') ? '#1976d2' : undefined, 
              }}
              >
                <ListItemText primary="編集" />
              </ListItemButton>
            </Link>
            <Link href="/product/create" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/product/create') ? '#e3f2fd' : undefined,
                color: isSelected('/product/create') ? '#1976d2' : undefined,         
              }}
              >
                <ListItemText primary="新規" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>


        <ListItemButton sx={{ mb: 0.75 }}
          onClick={() => handleToggle('master')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.master ? <SellOutlined /> : <SellOutlined />}
          </ListItemIcon>
          <ListItemText primary="マスタ" />
          {openItems.master ? <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.master} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/master/categories" >
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/master/categories') ? '#e3f2fd' : undefined,
                color: isSelected('/master/categories') ? '#1976d2' : undefined,
               }}>
                <ListItemText primary="カテゴリ" />
              </ListItemButton>
            </Link>
            <Link href="/master/ingredients" >
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/master/ingredients') ? '#e3f2fd' : undefined,
                color: isSelected('/master/ingredients') ? '#1976d2' : undefined,
               }}>
                <ListItemText primary="材料" />
              </ListItemButton>
            </Link>
            <Link href="/master/tags" >
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/master/tags') ? '#e3f2fd' : undefined,
                color: isSelected('/master/tags') ? '#1976d2' : undefined,
               }}>
                <ListItemText primary="タグ" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>


        {/* Announcements - With submenu */}
        <ListItemButton sx={{ mb: 0.75 }}
        
          onClick={() => handleToggle('announcement')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.announcement ? <ListAltOutlined /> : <ListAltOutlined />}
          </ListItemIcon>
          <ListItemText primary="お知らせ" />
          {openItems.announcement ? <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.announcement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/announcements/list" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{
                pl: 6.5,
                bgcolor: isSelected('/announcements/list') ? '#e3f2fd' : undefined,
                color: isSelected('/announcements/list') ? '#1976d2' : undefined,
              }}>
                <ListItemText primary="一覧" />
              </ListItemButton>
            </Link>
            <Link href="/announcement/detail" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/announcement/detail') ? '#e3f2fd' : undefined,
                color: isSelected('/announcement/detail') ? '#1976d2' : undefined,         
              }}
              >
                <ListItemText primary="検索" />
              </ListItemButton>
            </Link>
            <Link href="/announcement/edit" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/announcement/edit') ? '#e3f2fd' : undefined,
                color: isSelected('/announcement/edit') ? '#1976d2' : undefined, 
              }}
              >
                <ListItemText primary="編集" />
              </ListItemButton>
            </Link>
            <Link href="/announcement/create" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ 
                pl: 6.5,
                bgcolor: isSelected('/announcement/create') ? '#e3f2fd' : undefined,
                color: isSelected('/announcement/create') ? '#1976d2' : undefined,         
              }}
              >
                <ListItemText primary="新規" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        

        <ListItemButton sx={{ mb: 0.75 }}
          onClick={() => handleToggle('orders')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.orders ? <CategoryOutlined /> : <CategoryOutlined />}
          </ListItemIcon>
          <ListItemText primary="売上" />
          {openItems.orders ?  <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.orders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="一覧" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="詳細" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="編集" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="新規" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{ mb: 0.75 }}
          onClick={() => handleToggle('refunds')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.refunds ? <DirectionsOffOutlined /> : <DirectionsOffOutlined />}
          </ListItemIcon>
          <ListItemText primary="在庫" />
          {openItems.refunds ?  <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.refunds} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="一覧" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="詳細" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="編集" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="新規" />
            </ListItemButton>
          </List>
        </Collapse>
                
        <Typography variant="h6" sx={{ fontSize: 16, color: '#C0C0C0', fontWeight: 'bold', mx: 2, my:2 }} >
          USERS
        </Typography>

        {/* Users - With submenu */}
        <ListItemButton sx={{ mb: 0.75 }}
        onClick={() => handleToggle('files')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {openItems.files ? <PeopleAltOutlined /> : <PeopleAltOutlined />}
          </ListItemIcon>
          <ListItemText primary="ユーザー" />
          {openItems.files ?  <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>        
        <Collapse in={openItems.files} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="一覧" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="詳細" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Settings - With nested submenu */}
        <ListItemButton sx={{ mb: 0.75 }}
          onClick={() => handleToggle('settings')}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="設定" />
          {openItems.settings ?  <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />}
        </ListItemButton>
        <Collapse in={openItems.files} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="一覧" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 6.5 }}>
              <ListItemText primary="詳細" />
            </ListItemButton>
          </List>
        </Collapse>

      </List>
    </Box>
  );
}   
