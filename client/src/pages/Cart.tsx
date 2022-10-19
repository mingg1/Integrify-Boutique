import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { removeFromCart } from 'redux/slices/productsSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.productsData);

  return (
    <main>
      {cart.map((item) => (
        <div>
          <img
            src={item.thumbnail}
            alt={item.name}
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
          <h1>{item.name}</h1>
          <p>{item.size}</p>
          <p>{item.quantity}</p>
          <p>{item.price}€</p>
          <button
            onClick={() => {
              dispatch(
                removeFromCart({
                  addedItem: item._id,
                  addedItemSize: item.size,
                  price: item.price,
                })
              );
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <p>Total</p>
      <p>{cart.reduce((prev, item) => prev + item.price, 0)}€</p>
      <button>Check out</button>
    </main>
  );
};

export default Cart;
