import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from 'redux/store';
import { getStoredUser } from 'utils/helper';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = () => {
  const { id } = useParams();
  const storedId = getStoredUser()._id;
  const { loggedInUser } = useAppSelector((state) => state);
  const userId = loggedInUser._id || storedId;

  return id === userId;
};
