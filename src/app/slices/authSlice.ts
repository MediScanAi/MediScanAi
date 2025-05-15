import { createAppSlice } from '../createAppSlice';
import { login, register, logout } from '../../api/authApi';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    loginUser: create.asyncThunk(
      async ({ email, password }: { email: string; password: string }) => {
        const user = await login(email, password);
        return user;
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
          state.error = action.error.message || 'Login failed';
        },
      }
    ),
    registerUser: create.asyncThunk(
      async ({ email, password }: { email: string; password: string }) => {
        const user = await register(email, password);
        return user;
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
    logoutUser: create.asyncThunk(
      async () => {
        await logout();
      },
      {
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
      }
    ),
    setUser: create.reducer((state, action: { payload: User | null }) => {
      state.user = action.payload;
    }),
  }),
});

export const { loginUser, registerUser, logoutUser, setUser } =
  authSlice.actions;
export default authSlice.reducer;
