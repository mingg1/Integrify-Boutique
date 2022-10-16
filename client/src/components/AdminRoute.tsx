import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { LoggedInUserState, UserRole } from 'utils/types';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const accessToken = localStorage.getItem('userToken');
  const authUser: LoggedInUserState | null = accessToken
    ? jwt_decode(accessToken)
    : null;
  if (authUser?.role !== UserRole.Admin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
