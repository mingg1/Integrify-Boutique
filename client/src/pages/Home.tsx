import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProducts } from 'redux/slices/productsSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    productsData: { products, isLoading, error },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
  }, [dispatch, products]);

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <main>
          <section className="home_banner">
            <h1>Winter with __</h1>
            <h2>Prepare winter with us</h2>
            <Link to={'products'}>See products</Link>
          </section>
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              {/* {product.name} */}
              <img src={product.thumbnail} alt={product.name} />
            </Link>
          ))}
        </main>
      )}
    </>
  );
};

export default Home;
