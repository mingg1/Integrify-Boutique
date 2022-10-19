import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { CredentialResponse } from '@react-oauth/google';
import {
  LoggedInUserState,
  UserRole,
  LocalLoginInput,
  ResError,
} from './../../utils/types';
import { LOGIN_GOOGLE, LOGIN_LOCAL } from './../../utils/route';
import { saveLoggedInUser } from 'utils/helper';

const initialState: LoggedInUserState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: UserRole.Customer,
  banned: false,
  permissions: [],
  google: false,
  exp: 0,
  iat: 0,
  token: '',
  error: null,
};

export const loginByGoogle = createAsyncThunk(
  'loggedInUser/loginByGoogle',
  async (res: CredentialResponse, { rejectWithValue }) => {
    const idToken = res.credential || '';
    try {
      const res = await axios.post(
        LOGIN_GOOGLE,
        {},
        { headers: { id_token: idToken } }
      );
      return res.data.token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const localLogin = createAsyncThunk(
  'loggedInUser/localLogin',
  async ({ email, password }: LocalLoginInput, { rejectWithValue }) => {
    try {
      const res = await axios.post(LOGIN_LOCAL, { email, password });
      return res.data.token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    getLoggedInUser: (_, action: { payload: LoggedInUserState }) => {
      return action.payload;
    },
    clearLoggedInUser: (_) => {
      return initialState;
    },
    updateLoggedInUser: (_, action) => {
      return saveLoggedInUser(action.payload);
    },
    setLoggedInUserError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByGoogle.fulfilled, (_, action) => {
      return saveLoggedInUser(action.payload);
    });
    builder.addCase(loginByGoogle.rejected, (_, action) => {
      console.log(action.payload);
    });
    builder.addCase(localLogin.fulfilled, (_, action) => {
      return saveLoggedInUser(action.payload);
    });
    builder.addCase(localLogin.rejected, (state, action) => {
      const error = action.payload as AxiosError;
      const { message } = error.response?.data as ResError;
      state.error = { message };
    });
  },
});

export const {
  getLoggedInUser,
  clearLoggedInUser,
  updateLoggedInUser,
  setLoggedInUserError,
} = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
