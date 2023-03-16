import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BLOCK_USER, USERS } from 'utils/route';
import { getTokenHeaders } from './../../utils/helper';
import { USER_ORDERS, USERS_ORDERS } from './../../utils/route';
import {
  UserRole,
  UsersState,
  ResError,
  OrderedItem,
} from './../../utils/types';

const initialState: UsersState = {
  users: [],
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.Customer,
    banned: false,
    permissions: [],
    orders: [],
  },
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(USERS, getTokenHeaders(token));
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const toggleBanUser = createAsyncThunk(
  'users/toggleBanUser',
  async (
    {
      id,
      banned,
      authToken,
    }: { id: string; banned: boolean; authToken: string },
    { rejectWithValue }
  ) => {
    try {
      axios.patch(BLOCK_USER(id), { banned }, getTokenHeaders(authToken));
      return { id, banned };
    } catch (error) {
      const err = (error as AxiosError).response?.data;
      const { message } = err as ResError;
      return rejectWithValue({ message });
    }
  }
);

export const addOrder = createAsyncThunk(
  'users/addOrder',
  async (
    {
      id,
      authToken,
      order,
    }: { id: string; order: OrderedItem[]; authToken: string },
    { rejectWithValue }
  ) => {
    try {
      console.log(order);
      return await (
        await axios.post(
          USER_ORDERS(id),
          { items: order },
          getTokenHeaders(authToken)
        )
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'users/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await (
        await axios.get(USERS_ORDERS)
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  'users/getOrders',
  async (
    { id, authToken }: { id: string; authToken: string },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        await (
          await axios.get(USER_ORDERS(id), getTokenHeaders(authToken))
        ).data
      );
      return await (
        await axios.get(USER_ORDERS(id), getTokenHeaders(authToken))
      ).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action: { payload: string }) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      const error = action.payload as AxiosError;
      const { message } = error.response?.data as ResError;
      state.error = { message };
    });
    builder.addCase(toggleBanUser.fulfilled, (state, { payload }) => {
      const { id, banned } = payload!;
      state.users = state.users.map((user) => {
        if (user._id === id) return { ...user, banned };
        return user;
      });
    });
    builder.addCase(addOrder.fulfilled, (state, { payload }) => {
      state.user?.orders.push(payload);
      localStorage.removeItem('cart');
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      console.log(action.payload as AxiosError);
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
