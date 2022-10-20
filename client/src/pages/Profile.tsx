import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const Profile = () => {
  const {
    _id: userId,
    firstName,
    lastName,
    email,
    role,
    google,
  } = useAppSelector((state) => state.loggedInUser);

  return (
    <main>
      <h1 className="page__title">Profile</h1>
      <section className="profile__container">
        {/* <figure>
          <img src="" alt="profile" />
        </figure> */}
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{email}</p>
        <p>
          {role}
          {role === 'admin' ? ' 🛍 / 🛠' : ' 🛍'}
        </p>
        <div className="profile__menu">
          <Link className="profile__button" to={`/users/${userId}/edit`}>
            Edit profile
          </Link>
          {!google && (
            <Link
              className="profile__button"
              to={`/users/${userId}/change-password`}
            >
              Change password
            </Link>
          )}
          <Link className="profile__button" to={`/users/${userId}/orders`}>
            Orders
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Profile;
