import ItemCard from 'components/ItemCard';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProducts } from 'redux/slices/productsSlice';
import { Product, ProductCategory } from 'utils/types';

const Products = () => {
  const dispatch = useAppDispatch();
  const [searchParam] = useSearchParams();
  const [category, setCategory] = useState(searchParam.get('category') || '');

  const {
    productsData: { products, isLoading, error },
  } = useAppSelector((state) => state);
  const [filtered, setFiltered] = useState<Product[] | null>(products);

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
    if (category) {
      setFiltered(() =>
        products.filter((item) =>
          item.category.includes(category as ProductCategory)
        )
      );
    } else {
      setFiltered(null);
    }
    if (searchParam.get('category') !== category) {
      setCategory(() => searchParam.get('category') || '');
    }
  }, [dispatch, category, searchParam, products.length]);

  return (
    <main>
      <h1 className="page__title">
        {category ? `${category.toUpperCase()}` : 'PRODUCTS'}
      </h1>
      <div className="page__category-list">
        {Object.values(ProductCategory).map((categoryItem) => (
          <Link
            key={categoryItem}
            to={`?category=${categoryItem}`}
            className={category === categoryItem ? 'selected' : undefined}
          >
            {categoryItem.toUpperCase()}
          </Link>
        ))}
        <Link
          key={'all'}
          to={``}
          className={category === '' ? 'selected' : undefined}
        >
          ALL
        </Link>
      </div>
      <hr />
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <>
          <p>{filtered ? filtered.length : products.length} ITEMS</p>
          <section className="product-list">
            {(filtered || products).map((product) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default Products;
