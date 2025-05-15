import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bloodTestReducer from './Slices/bloodTestSlice';
import urineTestReducer from './Slices/urineTestSlice';
import vitaminTestReducer from './Slices/vitaminTestSlice';
import theme from "./Slices/theme.ts";

export const store = configureStore({
  reducer: combineReducers({
    bloodTest: bloodTestReducer,
    urineTest: urineTestReducer,
    vitaminTest: vitaminTestReducer,
    theme: theme,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
