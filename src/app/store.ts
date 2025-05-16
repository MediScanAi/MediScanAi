import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bloodTestReducer from './slices/bloodTestSlice';
import urineTestReducer from './slices/urineTestSlice';
import vitaminTestReducer from './slices/vitaminTestSlice';
import geneticTestReducer from './slices/geneticTestSlice';
import theme from './slices/theme';

export const store = configureStore({
  reducer: combineReducers({
    bloodTest: bloodTestReducer,
    urineTest: urineTestReducer,
    vitaminTest: vitaminTestReducer,
    geneticTest: geneticTestReducer,
    theme: theme,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
