import BanButton from 'components/BanButton';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUsers } from 'redux/slices/usersSlice';
import { getUserToken } from 'utils/helper';

const UserList = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser, usersData } = useAppSelector((state) => state);
  const token = loggedInUser.token || getUserToken();

  useEffect(() => {
    if (usersData.users.length === 0) dispatch(getUsers(token));
  }, [dispatch, token, usersData.users.length]);

  return (
    <main>
      <h1 className="page__title">Users</h1>
      <section>
        {usersData.isLoading ? (
          <p>Loading...</p>
        ) : usersData.error ? (
          <p>{usersData.error.message}</p>
        ) : (
          <ul className="user-list">
            {usersData.users.map((user) => (
              <>
                <li key={user._id} className="user-list__item">
                  <p className="user-list__item__name">
                    {user.firstName} {user.lastName}
                  </p>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
                  <BanButton
                    id={user._id}
                    banned={user.banned}
                    authToken={token}
                  />
                </li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default UserList;
