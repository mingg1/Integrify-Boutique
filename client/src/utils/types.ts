import { FormEvent } from 'react';

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}

export enum ProductCategory {
  Top = 'top',
  Bottom = 'bottom',
  Sweater = 'sweater',
  Jacket = 'jacket',
  Coat = 'coat',
  Tshirt = 't-shirt',
  Jeans = 'jeans',
  Skirt = 'skirt',
  Dress = 'dress',
  Accessory = 'accessory',
  Shoes = 'shoes',
  Bag = 'bag',
}

export enum Size {
  XSmall = 'XS',
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XLarge = 'XL',
}

export enum Permission {
  ProductsRead = 'products-read',
  ProductsWrite = 'products-write',
  UsersRead = 'users-read',
  UsersWrite = 'users-write',
}

export interface ResError {
  message: string;
}

export type SubmitEvent<T> = (e: FormEvent<T>) => void;

export interface LocalLoginInput {
  [key: string]: string;
}

export interface ProductInput extends Partial<Product> {
  token: string;
}

export interface OrderedItem {
  product: any;
  quantity: number;
  size: any;
}

export interface Order {
  _id: string;
  user: User;
  items: OrderedItem[];
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
  orders: Order[];
  error: ResError | null;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory[];
  size: ProductSize[];
  cartQuantity: number;
  thumbnail: string;
  __v: number;
}

export interface ProductSize {
  _id: string;
  size: Size;
  quantity: number;
}

export interface ProductsState {
  products: Product[];
  product: Product | undefined;
  searched: Product[];
  cart: CartItem[];
  isLoading: boolean;
  error: ResError | null;
}

export interface CartItem extends Omit<Product, 'size' | '__v'> {
  size: Partial<ProductSize>;
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
