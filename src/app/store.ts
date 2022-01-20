import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemSlice'
import userReducer from '../features/users/userSlice'
import customCounterReducer from '../features/customCounter/customCounterSlice'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    user: userReducer,
    customCounter: customCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

