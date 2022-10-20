import ItemCard from 'components/ItemCard';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { search, searchProduct } from 'redux/slices/productsSlice';

const Search = () => {
  const [searchParam] = useSearchParams();
  const query = searchParam.get('query') || '';
  const dispatch = useAppDispatch();
  const {
    productsData: { products, isLoading, error, searched },
  } = useAppSelector((state) => state);

  useEffect(() => {
    products.length === 0
      ? dispatch(searchProduct(query))
      : dispatch(search(query));
  }, [dispatch, products, query]);

  return (
    <main>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <main>
          <h1>
            Search results for '{searchParam.get('query')}' ({searched.length})
          </h1>
          <hr />
          <section className="product-list">
            {searched.map((product) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </section>
        </main>
      )}
    </main>
  );
};

export default Search;
