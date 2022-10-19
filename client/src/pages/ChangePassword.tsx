import ChangePwForm from 'components/ChangePasswordForm';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { useCurrentUser } from 'hooks/hooks';

const ChangePassword = () => {
  const isCurrentUser = useCurrentUser();
  const { loggedInUser } = useAppSelector((state) => state);

  return isCurrentUser && !loggedInUser.google ? (
    <>
      <ChangePwForm />

      <Link to={'/login'}>back</Link>
    </>
  ) : (
    <Navigate to="/profile" />
  );
};
export default ChangePassword;
