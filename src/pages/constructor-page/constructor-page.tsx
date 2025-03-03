import { FC, useEffect } from 'react';
import {
  fetchIngredients,
  ingredientsErrorSelector,
  ingredientsLoadingSelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Informer, Preloader } from '../../components/ui';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const isIngredientsLoading = useSelector(ingredientsLoadingSelector);
  const ingredientsError = useSelector(ingredientsErrorSelector);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : ingredientsError ? (
        <div className={styles.informerWrapper}>
          <Informer variant='error'>{ingredientsError}</Informer>
        </div>
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
