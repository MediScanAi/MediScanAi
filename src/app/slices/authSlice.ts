import { createAppSlice } from '../createAppSlice';
import {
  login,
  register,
  logout,
  sendVerificationEmail,
  type PlainUser,
} from '../../api/authApi';

interface AuthState {
  user: PlainUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    loginUser: create.asyncThunk(
      async ({ email, password }: { email: string; password: string }) =>
        await login(email, password),
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Login failed';
        },
      }
    ),
    registerUser: create.asyncThunk(
      async ({ email, password }: { email: string; password: string }) => {
        const fbUser = await register(email, password);
        await sendVerificationEmail(fbUser);
        return null;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Registration failed';
        },
      }
    ),
    logoutUser: create.asyncThunk(async () => await logout(), {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state) => {
        state.user = null;
        state.loading = false;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      },
    }),
    setUser: create.reducer((state, action: { payload: PlainUser | null }) => {
      state.user = action.payload;
    }),
    clearUser: create.reducer((state) => {
      state.user = null;
    }),
    finishLoading: create.reducer((state) => {
      state.loading = false;
    }),
  }),
});

export const {
  loginUser,
  registerUser,
  logoutUser,
  setUser,
  clearUser,
  finishLoading,
} = authSlice.actions;

export default authSlice.reducer;
