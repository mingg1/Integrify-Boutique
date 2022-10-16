import { PRODUCT } from './../../utils/route';
import { ProductsState, ResError } from './../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PRODUCTS } from 'utils/route';

const initialState: ProductsState = {
  products: [],
  product: {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: [],
    size: [],
    quantity: 0,
    thumbnail: '',
  },
  isLoading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await (
        await axios.get(PRODUCTS)
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      return await (
        await axios.get(PRODUCT(id))
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    findProduct: (state, action) => {
      state.product = state.products.find(
        (product) => product._id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      const error = action.payload as AxiosError;
      const { message, statusCode } = error.response?.data as ResError;
      state.error = { message, statusCode };
    });
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      const error = action.payload as AxiosError;
      const { message, statusCode } = error.response?.data as ResError;
      state.error = { message, statusCode };
    });
  },
});

export const { findProduct } = productsSlice.actions;
export default productsSlice.reducer;
