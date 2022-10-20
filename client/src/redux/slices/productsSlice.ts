import { getTokenHeaders } from 'utils/helper';
import { PRODUCT, SEARCH } from './../../utils/route';
import {
  CartItem,
  Product,
  ProductInput,
  ProductsState,
  ResError,
} from './../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCTS } from 'utils/route';

const storedCart = localStorage.getItem('cart');
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
    __v: 0,
  },
  searched: [],
  cart: storedCart ? JSON.parse(storedCart) : [],
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
      const { message } = error as ResError;
      return rejectWithValue({ message });
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

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({ token, ...input }: ProductInput, { rejectWithValue }) => {
    try {
      return await (
        await axios.post(PRODUCTS, input, getTokenHeaders(token))
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ token, _id: id, ...input }: ProductInput, { rejectWithValue }) => {
    try {
      return await (
        await axios.patch(PRODUCT(id!), input, getTokenHeaders(token))
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ token, _id: id }: ProductInput, { rejectWithValue }) => {
    try {
      await axios.delete(PRODUCT(id!), getTokenHeaders(token));
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchProduct = createAsyncThunk(
  'products/search',
  async (query: string, { rejectWithValue }) => {
    try {
      return await (
        await axios.get(SEARCH(query))
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
    search: (state, action: { payload: string }) => {
      state.searched = state.products.filter((product) =>
        Object.entries(product).some(([_, value]) =>
          value.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
    },
    addToCart: (state, action: { payload: CartItem }) => {
      const { _id: addedItem, size: addedItemSize, price } = action.payload;
      const sameItem = state.cart.findIndex(
        (item) => item._id === addedItem && item.size === addedItemSize
      );
      if (sameItem >= 0) {
        state.cart[sameItem].price += price;
        state.cart[sameItem].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      if (state.product) state.product.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      const { addedItem, addedItemSize, price } = action.payload;
      const sameItem = state.cart.findIndex(
        (item) => item._id === addedItem && item.size === addedItemSize
      );
      const removedItem = state.cart[sameItem];
      if (removedItem.quantity > 1) {
        removedItem.price -= price;
        removedItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item !== state.cart[sameItem]);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
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
      state.error = action.payload as ResError;
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
      state.error = action.payload as ResError;
      // const error = action.payload as AxiosError;
      // const { message, status } = error.response?.data as ResError;
      // state.error = { message, status };
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(
      editProduct.fulfilled,
      (state, action: { payload: Product }) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      }
    );
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    });
    builder.addCase(searchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searched = action.payload;
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as ResError;
    });
  },
});

export const { findProduct, search, addToCart, removeFromCart } =
  productsSlice.actions;
export default productsSlice.reducer;
