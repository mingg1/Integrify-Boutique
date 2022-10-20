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
    <main style={{ marginBottom: '6rem' }}>
      <h1 className="page__title">Sign up</h1>
      <SignupForm />
      <div className="auth-link__container">
        <p>Already have an account?</p>
        <Link className="auth-link" to={'/login'}>
          Log in here
        </Link>
      </div>
    </main>
  );
};

export default SignUp;
