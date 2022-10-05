import { Link } from 'react-router-dom';

const SignIn = () => (
  <>
    <button>sign in by google</button>

    <Link to={'/sign-up'}>don't have an account?</Link>
  </>
);

export default SignIn;
