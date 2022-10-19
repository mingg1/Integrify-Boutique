import { Link } from 'react-router-dom';
import { Product } from 'utils/types';

const ItemCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <figure>
        <img src={product.thumbnail} alt={product.name} />
      </figure>
      <h2>{product.name}</h2>
      <h3>{product.price}€</h3>
    </Link>
  );
};

export default ItemCard;
