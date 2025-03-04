import { Informer, Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import {
  feedListSelector,
  feedsErrorSelector,
  feedsLoadingSelector,
  fetchFeeds
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(feedListSelector);
  const ordersLoading = useSelector(feedsLoadingSelector);
  const ordersError = useSelector(feedsErrorSelector);

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), []);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (ordersLoading) {
    return <Preloader />;
  }

  if (ordersError) {
    return <Informer variant='error'>{ordersError}</Informer>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
