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

  return productsData.isLoading ? (
    <p>Loading...</p>
  ) : productsData.error ? (
    <p>{productsData.error.message}</p>
  ) : (
    <section>
      <Link to="add">Add product</Link>
      {productsData.products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <Link to={`${product._id}/edit`}>edit</Link>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
