import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';

import {cartSlice} from '@/store/cartSlice';
import {wishlistSlice} from '@/store/wishlistSlice';

const rootReducer = combineReducers({
  cartReducer: cartSlice.reducer,
  wishlistReducer: wishlistSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cartSlice', 'wishlistSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
