import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import AdminRoute from './AdminRoute';
import Admin from 'pages/Admin';
import Product from 'pages/Product';
import Profile from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import ChangePassword from 'pages/ChangePassword';
import UserList from 'pages/UserList';
import Cart from 'pages/Cart';
import AddProduct from 'pages/AddProduct';
import EditProduct from 'pages/EditProduct';
import ProductList from 'pages/ProductList';
import Search from 'pages/Search';
import Products from 'pages/Products';
import Order from 'pages/Order';
import OrderDetail from 'pages/OrderDetail';
import Orders from 'pages/Orders';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:id/edit" element={<EditProfile />} />
          <Route
            path="/users/:id/change-password"
            element={<ChangePassword />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/users/:id/orders" element={<Order />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route
            path="/admin/products/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
