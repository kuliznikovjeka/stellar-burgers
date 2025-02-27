import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    handleAddIngredient: {
      reducer: (state, action) => {
        const { type } = action.payload;
        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id },
          meta: null,
          error: null
        };
      }
    },

    handleDeleteIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },

    handleMoveUpIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },

    handleMoveDownIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },

    clearConstructorBurger: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerDataSelector: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const {
  handleAddIngredient,
  handleDeleteIngredient,
  handleMoveUpIngredient,
  handleMoveDownIngredient,
  clearConstructorBurger
} = burgerConstructorSlice.actions;

export const { burgerDataSelector } = burgerConstructorSlice.selectors;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
