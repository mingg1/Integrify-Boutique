import { Link } from 'react-router-dom';
import { Product } from 'utils/types';

const ItemCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product._id}`} className="item__container">
      <figure>
        <img
          className="item__thumbnail"
          src={product.thumbnail}
          alt={product.name}
        />
      </figure>
      <h2 className="item__name">{product.name}</h2>
      <h3 className="item__price">{product.price}€</h3>
    </Link>
  );
};

export default ItemCard;
