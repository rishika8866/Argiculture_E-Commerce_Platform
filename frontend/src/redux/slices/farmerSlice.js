import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/farmer';

export const fetchFarmerProducts = createAsyncThunk(
  'farmer/fetchProducts',
  async (uid) => {
    const res = await axios.get(`${BASE_URL}/products/${uid}`);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'farmer/deleteProduct',
  async (psid) => {
    await axios.delete(`${BASE_URL}/delete-product/${psid}`);
    return psid;
  }
);

const farmerSlice = createSlice({
  name: 'farmer',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.psId !== action.payload);
      });
  },
});

export const addProduct = createAsyncThunk(
  'farmer/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/add-product`, product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);


export default farmerSlice.reducer;
