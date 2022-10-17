import axios from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from 'utils/route';
import FormField from './FormField';

interface SignUpFormInputs extends HTMLFormControlsCollection {
  readonly firstName: HTMLInputElement;
  readonly lastName: HTMLInputElement;
  readonly email: HTMLInputElement;
  readonly password: HTMLInputElement;
  readonly pwConfirmation: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: SignUpFormInputs;
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const { firstName, lastName, email, password, pwConfirmation } = form;

    try {
      await axios.post(SIGNUP, {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        pwConfirmation: pwConfirmation.value,
      });
      alert('Successfully signed up!');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormField
        label="First name"
        input={{
          type: 'text',
          placeholder: 'First name',
          name: 'firstName',
          required: true,
        }}
      />
      <FormField
        label="Last name"
        input={{
          type: 'text',
          placeholder: 'Last name',
          name: 'lastName',
          required: true,
        }}
      />
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
      <FormField
        label="Password confirmation"
        input={{
          type: 'password',
          placeholder: 'Password confirmation',
          name: 'pwConfirmation',
          required: true,
        }}
      />
      <button type="submit">Sign up</button>
      <hr />
    </form>
  );
};
export default SignUpForm;
