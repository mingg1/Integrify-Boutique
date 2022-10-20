import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { localLogin } from 'redux/slices/loggedInUserSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import FormField from './FormField';
import GoogleLoginBtn from './GoogleLoginBtn';

interface LoginFormInputs extends HTMLFormControlsCollection {
  readonly email: HTMLInputElement;
  readonly password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: LoginFormInputs;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<LoginFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;

    const resultAction = await dispatch(localLogin({ email, password }));
    if (localLogin.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <FormField
        label="Email"
        input={{
          type: 'email',
          placeholder: 'Email',
          name: 'email',
          required: true,
        }}
      />
      <FormField
        label="Password"
        input={{
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          required: true,
        }}
      />
      <button type="submit">Log in</button>
      <hr />
      {loggedInUser.error ? <p>{loggedInUser.error.message}</p> : null}
      <div className="google-login__container">
        <p>Login by google</p>
        <GoogleLoginBtn />
      </div>
    </form>
  );
};
export default LoginForm;
