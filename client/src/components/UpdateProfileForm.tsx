import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearLoggedInUser,
  setLoggedInUserError,
  updateLoggedInUser,
} from 'redux/slices/loggedInUserSlice';
import { USER } from 'utils/route';
import FormField from './FormField';
import { ResError } from 'utils/types';
import {
  clearLocalStorage,
  getTokenHeaders,
  onFieldChange,
} from 'utils/helper';
import { deleteUser } from 'redux/slices/usersSlice';

interface LoginFormInputs extends HTMLFormControlsCollection {
  readonly firstName: HTMLInputElement;
  readonly lastName: HTMLInputElement;
  readonly email: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  readonly elements: LoginFormInputs;
}

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    loggedInUser,
    usersData: { users },
  } = useAppSelector((state) => state);
  const [email, setEmail] = useState<string>(loggedInUser.email);

  useEffect(() => {
    setEmail(loggedInUser.email);
  }, [loggedInUser]);

  const onDeleteAccount = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axios.delete(
        USER(loggedInUser._id),
        getTokenHeaders(loggedInUser.token)
      );
      clearLocalStorage();
      dispatch(clearLoggedInUser());
      if (users.length > 0) {
        dispatch(deleteUser(loggedInUser._id));
      }
    } catch (error) {
      const { message } = (error as AxiosError).response?.data as ResError;
      dispatch(setLoggedInUserError({ message }));
    }
    alert('Account has been deleted');
    navigate('/');
  };

  const handleUpdate = async (event: FormEvent<FormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const { firstName, lastName, email } = form;
    const token = loggedInUser.token || localStorage.getItem('userToken') || '';

    try {
      const updateRes = await axios.patch(
        USER(loggedInUser._id),
        {
          firstName:
            firstName.value === '' ? loggedInUser.firstName : firstName.value,
          lastName:
            lastName.value === '' ? loggedInUser.lastName : lastName.value,
          email: email.value === '' ? loggedInUser.email : email.value,
          google: loggedInUser.google,
        },
        getTokenHeaders(token)
      );
      const updatedToken: string = await updateRes.data.token;
      dispatch(updateLoggedInUser(updatedToken));
      alert('Successfully updated!');
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-profile-form__container">
      <form onSubmit={handleUpdate}>
        <FormField
          label="First name"
          input={{
            type: 'text',
            placeholder: 'First name',
            name: 'firstName',
          }}
        />
        <FormField
          label="Last name"
          input={{
            type: 'text',
            placeholder: 'Last name',
            name: 'lastName',
          }}
        />
        <FormField
          label="Email"
          input={{
            type: 'email',
            placeholder: 'Email',
            name: 'email',
            disabled: loggedInUser.google,
            value: email,
            onChange: (event) => {
              onFieldChange(event, setEmail);
            },
          }}
        />
        <button type="submit">Update profile</button>
      </form>
      <button className="delete-button" onClick={onDeleteAccount}>
        Delete account
      </button>
    </div>
  );
};
export default UpdateProfileForm;
