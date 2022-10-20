import IntroCard from 'components/IntroCard';
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
            <h1 className="home_banner__title">Still, Autumn</h1>
            <p className="home_banner__p">
              Stay autumn with Integrify Boutique
            </p>
            <Link className="home_banner__button" to={'products'}>
              See products
            </Link>
          </section>
          <section className="intro__container">
            <IntroCard
              src="https://images.unsplash.com/photo-1641642231157-0849081598a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60"
              title="Time for sweaters"
              category="sweater"
            />
            <IntroCard
              src="https://images.unsplash.com/photo-1614676498010-8b7ead323f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              title="Dive into leaves"
              category="shoes"
            />
            <IntroCard
              src="https://images.unsplash.com/photo-1523304571269-0629d1a9da7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              title="Fluffy N light"
              category="jacket"
            />
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
