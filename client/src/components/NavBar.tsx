import React, { useEffect, useState } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import jwt_decode from 'jwt-decode';
import {
  clearLoggedInUser,
  getLoggedInUser,
} from 'redux/slices/loggedInUserSlice';
import { LoggedInUserState, SubmitEvent, UserRole } from 'utils/types';
import { clearLocalStorage, onFieldChange } from 'utils/helper';

interface SearchInputs extends HTMLFormControlsCollection {
  readonly search: HTMLInputElement;
}
interface SearchElement extends HTMLFormElement {
  readonly elements: SearchInputs;
}

const NavBar = () => {
  const navigate = useNavigate();
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

  const [query, setQuery] = useState('');

  const onSearch: SubmitEvent<SearchElement> = (evt) => {
    evt.preventDefault();
    if (!query) return;

    console.log(query);
    navigate({
      pathname: '/search',
      search: createSearchParams({ query }).toString(),
    });
    setQuery('');
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
  }, [decodedToken, dispatch, loggedInUser._id, storedToken]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main page</Link>
        </li>
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
        <li>
          <>
            <form onSubmit={onSearch}>
              <input
                type="text"
                placeholder="search"
                name="search"
                value={query}
                onChange={(event) => onFieldChange(event, setQuery)}
              />
            </form>
          </>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
