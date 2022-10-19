import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <main>
      <Link to="users">Manage users</Link>
      <Link to="products">products</Link>
    </main>
  );
};

export default Admin;
