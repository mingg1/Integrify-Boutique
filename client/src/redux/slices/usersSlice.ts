import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BLOCK_USER, USERS } from 'utils/route';
import { getTokenHeaders } from './../../utils/helper';
import { UserRole, UsersState, ResError } from './../../utils/types';

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

export const getProduct = createAsyncThunk(
  'users/getUser',
  async (id: string, { rejectWithValue }) => {}
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
  },
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
