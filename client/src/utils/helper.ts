import { LoggedInUserState } from './types';
import jwt_decode from 'jwt-decode';

export const saveLoggedInUser = (token: string): LoggedInUserState => {
  const userInfo: LoggedInUserState = jwt_decode(token);
  localStorage.setItem('userToken', token);
  localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
  return { ...userInfo, token, error: null };
};

export const getStoredUser = (): LoggedInUserState => {
  const storedUser = localStorage.getItem('loggedInUser');
  return storedUser && JSON.parse(storedUser);
};

export const getUserToken = (): string => {
  return localStorage.getItem('userToken') || '';
};

export const clearLocalStorage = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loggedInUser');
};

export const getTokenHeaders = (token: string) => ({
  headers: {
    authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
});
