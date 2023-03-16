import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProducts } from 'redux/slices/productsSlice';
import { getUserToken } from 'utils/helper';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser, productsData } = useAppSelector((state) => state);
  const token = loggedInUser.token || getUserToken();

  useEffect(() => {
    if (productsData.products.length === 0) dispatch(getProducts());
  }, [dispatch, productsData.products]);

  return (
    <main style={{ marginBottom: '6rem' }}>
      <h1 className="page__title">Products ({productsData.products.length})</h1>
      <section>
        {productsData.isLoading ? (
          <p>Loading...</p>
        ) : productsData.error ? (
          <p>{productsData.error.message}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link className="add-button" to="add">
              Add product
            </Link>
            <ul className="products">
              {productsData.products.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="cart-item__info">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                    <div className="cart-item__info__text">
                      <p>{item.name}</p>
                      <p>{item.price} €</p>
                      <p>Quantity: {item.cartQuantity} pcs</p>
                      <p>
                        Size:{' '}
                        {item.size.reduce(
                          (prev, cur) => prev + cur.size + ' / ',
                          ''
                        )}
                      </p>
                      <p>Category: {item.category.join(' / ')}</p>
                    </div>
                    <Link className="edit-button" to={`${item._id}/edit`}>
                      edit
                    </Link>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductList;
