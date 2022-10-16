const URL_BASE = 'http://localhost:4000/api/v1';
export const SIGNUP = `${URL_BASE}/users`;
export const LOGIN_LOCAL = `${URL_BASE}/auth/login`;
export const LOGIN_GOOGLE = `${URL_BASE}/auth/login-google`;
export const PRODUCTS = `${URL_BASE}/products`;
export const PRODUCT = (id: string) => `${URL_BASE}/products/${id}`;
export const USERS = `${URL_BASE}/users`;
export const USER = (id: string) => `${URL_BASE}/users/${id}`;
