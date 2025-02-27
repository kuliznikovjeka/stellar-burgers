import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { fetchOrders, ordersSelector } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
