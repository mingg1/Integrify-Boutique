import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import jwt_decode from 'jwt-decode';
import {
  clearLoggedInUser,
  getLoggedInUser,
} from 'redux/slices/loggedInUserSlice';
import { LoggedInUserState, UserRole } from 'utils/types';
import { clearLocalStorage } from 'utils/helper';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state);
  const storedToken = localStorage.getItem('userToken') || '';
  const decodedToken: LoggedInUserState | null = storedToken
    ? jwt_decode(storedToken)
    : null;

  const onLogOut = () => {
    clearLocalStorage();
    dispatch(clearLoggedInUser());
  };

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < Date.now()) {
        onLogOut();
      } else if (
        decodedToken.exp * 1000 > Date.now() &&
        loggedInUser._id === ''
      ) {
        dispatch(getLoggedInUser({ ...decodedToken, token: storedToken }));
      }
    }
  });

  return (
    <nav>
      <ul>
        <li>
          {decodedToken ? (
            <Link to="profile">Hello {loggedInUser.firstName}</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </li>
        {loggedInUser.role === UserRole.Admin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        {decodedToken && (
          <li>
            <Link to="/" onClick={onLogOut}>
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
