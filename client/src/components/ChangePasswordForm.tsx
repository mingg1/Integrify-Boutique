import axios from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearLoggedInUser } from 'redux/slices/loggedInUserSlice';
import { clearLocalStorage, getTokenHeaders } from 'utils/helper';
import { CHANGE_PASSWORD } from 'utils/route';
import FormField from './FormField';

interface ChangePwFormInputs extends HTMLFormControlsCollection {
  readonly currentPassword: HTMLInputElement;
  readonly newPassword: HTMLInputElement;
  readonly newPwConfirmation: HTMLInputElement;
}
interface ChangePwFormElement extends HTMLFormElement {
  readonly elements: ChangePwFormInputs;
}

const ChangePwForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { _id: userId, token } = useAppSelector((state) => state.loggedInUser);

  const handleChangePassword = async (
    event: FormEvent<ChangePwFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const { currentPassword, newPassword, newPwConfirmation } = form;
    try {
      await axios.patch(
        CHANGE_PASSWORD(userId),
        {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
          newPwConfirmation: newPwConfirmation.value,
        },
        getTokenHeaders(token || localStorage.getItem('userToken') || '')
      );
      alert('Password has successfully changed!');

      clearLocalStorage();
      const resultAction = dispatch(clearLoggedInUser());
      if (clearLoggedInUser.match(resultAction)) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <FormField
        label="Current password"
        input={{
          type: 'password',
          placeholder: 'Current password',
          name: 'currentPassword',
          required: true,
        }}
      />
      <FormField
        label="New password"
        input={{
          type: 'password',
          placeholder: 'New password',
          name: 'newPassword',
          required: true,
        }}
      />
      <FormField
        label="New password confirmation"
        input={{
          type: 'password',
          placeholder: 'New password confirmation',
          name: 'newPwConfirmation',
          required: true,
        }}
      />
      <button type="submit">Change password</button>
      <hr />
    </form>
  );
};
export default ChangePwForm;
