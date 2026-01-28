// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import farmerReducer from './slices/farmerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    farmer: farmerReducer,
  },
});

export default store;
