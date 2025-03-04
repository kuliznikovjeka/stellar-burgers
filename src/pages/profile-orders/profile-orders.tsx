import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { fetchOrders, ordersLoadingSelector, ordersSelector } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);
  const ordersLoading = useSelector(ordersLoadingSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI loading={ordersLoading} orders={orders} />;
};
