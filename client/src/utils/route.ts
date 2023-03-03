const URL_BASE = 'https://integrify-boutique-production.up.railway.app/api/v1';
export const SIGNUP = `${URL_BASE}/users`;
export const LOGIN_LOCAL = `${URL_BASE}/auth/login`;
export const LOGIN_GOOGLE = `${URL_BASE}/auth/login-google`;
export const SEARCH = (query: string) =>
  `${URL_BASE}/products/search?query=${query}`;
export const PRODUCTS = `${URL_BASE}/products`;
export const PRODUCT = (id: string) => `${URL_BASE}/products/${id}`;
export const USERS = `${URL_BASE}/users`;
export const USER = (id: string) => `${URL_BASE}/users/${id}`;
export const BLOCK_USER = (id: string) => `${URL_BASE}/users/${id}/block`;
export const CHANGE_PASSWORD = (id: string) =>
  `${URL_BASE}/users/${id}/change-password`;
export const USER_ORDERS = (id: string) => `${URL_BASE}/users/${id}/orders`;
export const USERS_ORDERS = `${URL_BASE}/users/orders`;
