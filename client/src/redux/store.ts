import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loggedInUserReducer from './slices/loggedInUserSlice';
import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    productsData: productsReducer,
    usersData: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
