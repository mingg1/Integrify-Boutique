import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { loginByGoogle } from 'redux/slices/loggedInUserSlice';

const GoogleLoginBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAppSelector((state) => state);
  return (
    <GoogleLogin
      onSuccess={async (res) => {
        const resultAction = await dispatch(loginByGoogle(res));
        if (loginByGoogle.fulfilled.match(resultAction)) {
          navigate('/');
        } else if (loginByGoogle.rejected.match(resultAction)) {
          console.log(loggedInUser.error?.message);
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
export default GoogleLoginBtn;
