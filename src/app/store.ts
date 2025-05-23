import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import bloodTestReducer from './slices/bloodTestSlice';
// import urineTestReducer from './slices/urineTestSlice';
// import vitaminTestReducer from './slices/vitaminTestSlice';
// import geneticTestReducer from './slices/geneticTestSlice';
import authReducer from './slices/authSlice';
import theme from './slices/theme';
import testReducer from './slices/testSlice';

export const store = configureStore({
  reducer: combineReducers({
    // bloodTest: bloodTestReducer,
    // urineTest: urineTestReducer,
    // vitaminTest: vitaminTestReducer,
    // geneticTest: geneticTestReducer,
    auth: authReducer,
    theme: theme,
    tests: testReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
