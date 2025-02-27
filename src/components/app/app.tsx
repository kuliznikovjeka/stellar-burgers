import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { fetchIngredients } from '@slices';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/user/thunks';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onCloseModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <Modal title='Информация о заказе' onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={onCloseModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          >
            <Route
              path=':number'
              element={
                <Modal title='Информация о заказе' onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
