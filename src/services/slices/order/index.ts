export {
  orderBurger,
  handleCloseOrderModal,
  orderErrorSelector,
  orderLoadingSelector,
  orderAcceptSelector,
  orderRequestSelector,
  orderModalDataSelector,
  orderReducer
} from './make-order-slice';

export {
  fetchOrder,
  orderInfoErrorSelector,
  orderInfoLoadingSelector,
  orderInfoReducer,
  orderInfoSelector
} from './order-info-slice';
