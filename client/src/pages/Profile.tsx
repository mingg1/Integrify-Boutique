import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const Profile = () => {
  const {
    _id: userId,
    firstName,
    lastName,
    email,
    google,
  } = useAppSelector((state) => state.loggedInUser);

  return (
    <>
      <p>
        {firstName} {lastName}
      </p>
      <p>{email}</p>
      <Link to={`/users/${userId}/edit`}>Edit profile</Link>
      {!google && (
        <Link to={`/users/${userId}/change-password`}>Change password</Link>
      )}
    </>
  );
};

export default Profile;
