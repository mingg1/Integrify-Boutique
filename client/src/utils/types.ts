import { AxiosError } from 'axios';

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}
export enum Permission {
  ProductsRead = 'products-read',
  ProductsWrite = 'products-write',
  UsersRead = 'users-read',
  UsersWrite = 'users-write',
}

export interface ResError {
  message: string;
  statusCode: number;
}

export interface LocalLoginInput {
  [key: string]: string;
}

export interface LoggedInUserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  banned: boolean;
  exp: number;
  iat: number;
  google: boolean;
  token: string;
  permissions: Permission[];
  error: ResError | null;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  size: string[];
  quantity: number;
  thumbnail: string;
}

export interface ProductsState {
  products: Product[];
  product: Product | undefined;
  isLoading: boolean;
  error: ResError | null;
}

type User = Omit<
  LoggedInUserState,
  'token' | 'iat' | 'exp' | 'error' | 'google'
>;

export interface UsersState {
  users: User[];
  user: User | undefined;
  isLoading: boolean;
  error: ResError | null;
}
