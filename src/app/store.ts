import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bloodTestReducer from './slices/bloodTestSlice';
import urineTestReducer from './slices/urineTestSlice';
import vitaminTestReducer from './slices/vitaminTestSlice';

export const store = configureStore({
  reducer: combineReducers({
    bloodTest: bloodTestReducer,
    urineTest: urineTestReducer,
    vitaminTest: vitaminTestReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
