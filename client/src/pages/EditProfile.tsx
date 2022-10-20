import { Navigate } from 'react-router-dom';
import { useCurrentUser } from 'hooks/hooks';
import UpdateProfileForm from 'components/UpdateProfileForm';
import { useAppSelector } from 'redux/hooks';

const EditProfile = () => {
  const isCurrentUser = useCurrentUser();
  const { loggedInUser } = useAppSelector((state) => state);

  return isCurrentUser ? (
    <main>
      <h1 className="page__title">Edit profile</h1>
      <section>
        <UpdateProfileForm />
        <p>{loggedInUser.error?.message}</p>
      </section>
    </main>
  ) : (
    <Navigate to="/profile" />
  );
};

export default EditProfile;
