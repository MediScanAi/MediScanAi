import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/theme';
import testReducer from './slices/testSlice';
import userDataReducer from './slices/userDataSlice';
import healthReducer from './slices/healthSlice';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    theme: themeReducer,
    tests: testReducer,
    userData: userDataReducer,
    healthData: healthReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
