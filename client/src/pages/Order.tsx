import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserOrder } from 'redux/slices/loggedInUserSlice';
import { getOrders } from 'redux/slices/usersSlice';

const Order = () => {
  const dispatch = useAppDispatch();
  const {
    loggedInUser: { _id: userId, token, orders },
  } = useAppSelector((state) => state);

  const getUserOrders = async () => {
    const actionResult = await dispatch(
      getOrders({ id: userId, authToken: token })
    );
    if (getOrders.fulfilled.match(actionResult)) {
      dispatch(getUserOrder(actionResult.payload));
    }
  };

  useEffect(() => {
    if (userId && orders.length === 0) {
      getUserOrders();
    }
  }, [dispatch, userId, orders]);

  return (
    <main>
      <h1 className="page__title">My order</h1>
      <section>
        <ul style={{ flexDirection: 'column', gap: 0 }}>
          {orders.map((order) => (
            <div key={order._id}>
              <li key={order._id} className="user-list__item">
                <Link
                  to={`/orders/${order._id}`}
                  className="user-list__item__name"
                >
                  #{order._id}
                </Link>
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Order;
