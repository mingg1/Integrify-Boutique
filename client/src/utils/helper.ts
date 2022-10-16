import { LoggedInUserState } from './types';
import jwt_decode from 'jwt-decode';

export const saveLoggedInUser = (token: string): LoggedInUserState => {
  const userInfo: LoggedInUserState = jwt_decode(token);
  localStorage.setItem('userToken', token);
  localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
  return { ...userInfo, token, error: null };
};
