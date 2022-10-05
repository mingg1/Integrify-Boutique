import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

interface DecodedUser {
  _id: string;
  role: string;
  firstName: string;
  iat: number;
  exp: number;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const accessToken = localStorage.getItem('user-token') || '';
  const authUser: DecodedUser = jwt_decode(accessToken);
  if (authUser.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
