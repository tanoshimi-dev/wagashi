import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../slices/accountSlice';
import productReducer from '../slices/productSlice';
import categoryReducer from '../slices/categorySlice';
import ingredientReducer from '../slices/ingredientSlice';
import tagReducer from '../slices/tagSlice';
import announcementSlice from '../slices/announcementSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    category: categoryReducer,
    ingredient: ingredientReducer,
    tag: tagReducer,
    announcement: announcementSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;