import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <Link to="users">Manage users</Link>
      <Link to="products">products</Link>
    </>
  );
};

export default Admin;
