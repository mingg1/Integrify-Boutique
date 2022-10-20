import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserOrder } from 'redux/slices/loggedInUserSlice';
import { getOrders } from 'redux/slices/usersSlice';

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const {
    loggedInUser: { orders, token, _id: userId },
    productsData,
  } = useAppSelector((state) => state);
  const [order, setOrder] = useState(
    () => orders?.find((order) => order._id === id) || null
  );

  const getUserOrders = async () => {
    const actionResult = await dispatch(
      getOrders({ id: userId, authToken: token })
    );
    if (getOrders.fulfilled.match(actionResult)) {
      setOrder(actionResult.payload);
      getUserOrder(actionResult.payload);
    }
  };

  useEffect(() => {
    if (orders.length === 0) getUserOrders();
    console.log(order);
  }, [dispatch, id, orders]);

  return (
    <main style={{ marginBottom: '6rem' }}>
      <h1 className="page__title">Order detail</h1>
      <section>
        {productsData.isLoading ? (
          <p>Loading...</p>
        ) : productsData.error ? (
          <p>{productsData.error.message}</p>
        ) : orders ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Order id #{id}</p>
            <ul className="products">
              {order?.items?.map((item, i) => (
                <li key={item.product._id} className="cart-item">
                  <div className="cart-item__info">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                    <div className="cart-item__info__text">
                      <p>{item.product.name}</p>
                      <p>{item.product.price} €</p>
                      <p>Quantity: {item.quantity} pcs</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
            <p>
              Total:{' '}
              {order?.items.reduce(
                (prev, item) => prev + item.product.price * item.quantity,
                0
              )}
              €
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default OrderDetail;
