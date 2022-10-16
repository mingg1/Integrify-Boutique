import { UserRole, UsersState } from './../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const getProducts = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {}
);

export const getProduct = createAsyncThunk(
  'users/getUser',
  async (id: string, { rejectWithValue }) => {}
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

//export const {  } = usersSlice.actions;
export default usersSlice.reducer;
