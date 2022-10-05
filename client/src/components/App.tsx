import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import PrivateRoute from './PrivateRoute';
import Admin from 'pages/Admin';

const App = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/search" />
          <Route path="/profile" />
          <Route path="/users/:id/edit" />
          <Route path="/users/:id/change-password" />
          <Route path="/products/:id" />
          <Route path="/products/add" />
          <Route path="/products/:id/edit" />
          <Route path="/cart" />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
