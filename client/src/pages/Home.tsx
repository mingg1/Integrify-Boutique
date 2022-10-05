import { useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Home = () => {
  const getProducts = async () => {
    const products = await (
      await axios.get('http://localhost:4000/api/v1/products')
    ).data;
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <GoogleLogin
        onSuccess={async (res) => {
          const tokenData = await (
            await axios.post(
              'http://localhost:4000/api/v1/auth/login-google',
              {},
              { headers: { authorization: `Bearer ${res.credential}` } }
            )
          ).data;
          console.log(res.credential);
          const accessToken = tokenData.token;
          localStorage.setItem('user-token', accessToken);
          localStorage.setItem('user', JSON.stringify(jwt_decode(accessToken)));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <button
        onClick={async () => {
          const token = localStorage.getItem('user-token');
          const data = await (
            await axios.get('http://localhost:4000/api/v1/users', {
              headers: { authorization: `Bearer ${token}` },
            })
          ).data;
          console.log(data);
        }}
      >
        get users
      </button>
    </>
  );
};

export default Home;
