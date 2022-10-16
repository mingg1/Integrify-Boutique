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

  return usersData.isLoading ? (
    <p>Loading...</p>
  ) : usersData.error ? (
    <p>{usersData.error.message}</p>
  ) : (
    <>
      {usersData.users.map((user) => (
        <div key={user._id}>
          <p>{user.email}</p>
          <BanButton id={user._id} banned={user.banned} authToken={token} />
        </div>
      ))}
    </>
  );
};

export default UserList;
