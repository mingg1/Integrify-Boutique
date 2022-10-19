import ItemCard from 'components/ItemCard';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProducts } from 'redux/slices/productsSlice';
import { ProductCategory } from 'utils/types';

const Products = () => {
  const dispatch = useAppDispatch();
  const [searchParam] = useSearchParams();
  const [category, setCategory] = useState(
    () => searchParam.get('category') || ''
  );

  const {
    productsData: { products, isLoading, error },
  } = useAppSelector((state) => state);
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
    if (category) {
      setFiltered(() =>
        products.filter((item) =>
          item.category.includes(category as ProductCategory)
        )
      );
    }
    if (searchParam.get('category') !== category) {
      setCategory(() => searchParam.get('category') || '');
    }
  }, [dispatch, category, searchParam, products.length]);

  return (
    <main>
      <h1>
        {category ? `${category}: ${filtered.length} item(s)` : 'Products'}
      </h1>
      <div>
        {Object.values(ProductCategory).map((category) => (
          <Link key={category} to={`?category=${category}`}>
            {category}
          </Link>
        ))}
        <Link key={'all'} to={``}>
          All
        </Link>
      </div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <section>
          {filtered.map((product) => (
            <ItemCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Products;
