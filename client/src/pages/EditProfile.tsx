import { Navigate } from 'react-router-dom';
import { useCurrentUser } from 'redux/hooks';
import UpdateProfileForm from 'components/UpdateProfileForm';

const EditProfile = () => {
  const isCurrentUser = useCurrentUser();

  return isCurrentUser ? <UpdateProfileForm /> : <Navigate to="/profile" />;
};

export default EditProfile;
