import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: combineReducers({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
