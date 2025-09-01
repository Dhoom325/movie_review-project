import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import moviesSlice from './moviesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: moviesSlice,
  },
});
