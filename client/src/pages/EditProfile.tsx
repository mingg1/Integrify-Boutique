import { Navigate } from 'react-router-dom';
import { useCurrentUser } from 'hooks/hooks';
import UpdateProfileForm from 'components/UpdateProfileForm';

const EditProfile = () => {
  const isCurrentUser = useCurrentUser();

  return isCurrentUser ? <UpdateProfileForm /> : <Navigate to="/profile" />;
};

export default EditProfile;
