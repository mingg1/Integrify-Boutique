import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <main>
      <h1 className="page__title">Admin dashboard</h1>
      <section className="admin-menu__container">
        <Link className="admin-menu" to="users">
          Manage users
        </Link>
        <Link className="admin-menu" to="products">
          Manage products
        </Link>
        <Link className="admin-menu" to="orders">
          Orders
        </Link>
      </section>
    </main>
  );
};

export default Admin;
