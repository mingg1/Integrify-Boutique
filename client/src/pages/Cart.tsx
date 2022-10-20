import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addUserOrder } from 'redux/slices/loggedInUserSlice';
import { addToCart, removeFromCart } from 'redux/slices/productsSlice';
import { addOrder } from 'redux/slices/usersSlice';
import { CartItem, Size } from 'utils/types';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    productsData: { cart },
    loggedInUser: { banned, _id: userId, token },
  } = useAppSelector((state) => state);
  const decreaseQuantity = (item: CartItem) => {
    dispatch(
      removeFromCart({
        addedItem: item._id,
        addedItemSize: item.size,
        price: item.price / item.quantity,
      })
    );
  };

  const addQuantity = (item: CartItem) => {
    dispatch(addToCart({ ...item, price: item.price / item.quantity }));
  };

  return (
    <main>
      <h1 className="page__title">Cart</h1>
      <section className="cart__container">
        <div className="cart-item__list">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item__info">
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </Link>
                <div className="cart-item__info__text">
                  <Link to={`/products/${item._id}`}>
                    <p className="cart-item__name">{item.name}</p>
                  </Link>
                  <p>Size: {item.size}</p>
                  <div className="cart-item__quantity-btn-container">
                    <p>Quantity: </p>
                    <button
                      onClick={() => {
                        decreaseQuantity(item);
                      }}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => {
                        addQuantity(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item__info__sum">
                  <p>{item.price}€</p>
                  <button
                    onClick={() => {
                      dispatch(
                        removeFromCart({
                          addedItem: item._id,
                          addedItemSize: item.size,
                          price: item.price / item.quantity,
                        })
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <section className="cart__summary">
          <h2>Summary</h2>
          <hr />
          <div>
            <p>Total</p>
            <p>{cart.reduce((prev, item) => prev + item.price, 0)}€</p>
          </div>
          <button
            disabled={banned}
            onClick={async () => {
              const orderItems = cart.map((item) => ({
                product: item._id,
                quantity: item.quantity,
                size: item.size.toString() as Size,
              }));
              const resultAction = await dispatch(
                addOrder({ id: userId, authToken: token, order: orderItems })
              );

              if (addOrder.fulfilled.match(resultAction)) {
                console.log(resultAction.payload);

                dispatch(addUserOrder(resultAction.payload));
                alert('Your order has been done!');
                navigate('/profile');
              }
            }}
          >
            Check out
          </button>
        </section>
      </section>
    </main>
  );
};

export default Cart;
