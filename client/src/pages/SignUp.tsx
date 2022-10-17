import SignupForm from 'components/SignupForm';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const SignUp = () => {
  const {
    loggedInUser: { _id: userId },
  } = useAppSelector((state) => state);

  return userId !== '' ? (
    <Navigate to="/" />
  ) : (
    <>
      <SignupForm />
      <p>Already have an account?</p>
      <Link to={'/login'}>Log in here</Link>
    </>
  );
};

export default SignUp;
