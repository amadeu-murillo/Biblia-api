import { configureStore } from '@reduxjs/toolkit';
import bibleReducer from './slices/bibleSlice';

const store = configureStore({
  reducer: {
    bible: bibleReducer,
  },
});

export default store;
