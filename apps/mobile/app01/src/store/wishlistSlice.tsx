import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {DishType} from '@/types';

type WishlistState = {list: DishType[]};

const initialState: WishlistState = {
  list: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<DishType>) => {
      const inWishlist = state.list.find(item => item.id === action.payload.id);

      if (!inWishlist) {
        state.list.push({
          ...action.payload,
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<DishType>) => {
      const inWishlist = state.list.find(item => item.id === action.payload.id);

      if (inWishlist) {
        state.list = state.list.filter(item => item.id !== action.payload.id);
      }
    },
    setWishlist: (state, action: PayloadAction<DishType[]>) => {
      state.list = action.payload;
    },
    updateList: (state, action: PayloadAction<DishType[]>) => {
      state.list = action.payload;
    },
    resetWishlist: state => {
      state.list = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  updateList,
  resetWishlist,
} = wishlistSlice.actions;
