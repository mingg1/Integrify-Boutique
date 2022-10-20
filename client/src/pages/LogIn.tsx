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
    <main>
      <h1 className="page__title">Log in</h1>
      <LoginForm />
      <div className="auth-link__container">
        <p>Already have an account?</p>
        <Link className="auth-link" to={'/signup'}>
          Sing up here
        </Link>
      </div>
    </main>
  );
};

export default LogIn;
