import LoginForm from 'components/LoginForm';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const LogIn = () => {
  const {
    loggedInUser: { _id: userId },
  } = useAppSelector((state) => state);

  return userId !== '' ? (
    <Navigate to="/" />
  ) : (
    <>
      <LoginForm />
      <p>Already have an account?</p>
      <Link to={'/signup'}>Sing up here</Link>
    </>
  );
};

export default LogIn;
