import { createAppSlice } from '../createAppSlice';
import {
  login,
  register,
  logout,
  sendVerificationEmail,
  type AuthUser,
  db,
} from '../../api/authApi';
import { updateProfile } from 'firebase/auth';
import type { RootState } from '../store';
import { doc, setDoc } from 'firebase/firestore';

interface AuthState {
  user: AuthUser | null;
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
      async ({
        name,
        surname,
        email,
        password,
        gender,
        age,
      }: {
        name: string;
        surname: string;
        email: string;
        password: string;
        gender?: string | undefined;
        age?: number | undefined;
      }) => {
        const fbUser = await register(email, password);
        if (!fbUser) throw new Error('Auth failed');
        await updateProfile(fbUser, {
          displayName: `${name} ${surname}`,
        });

        await sendVerificationEmail(fbUser);

        const userRef = doc(db, 'users', fbUser.uid);
        await setDoc(
          userRef,
          {
            info: { age: age ?? null, gender: gender ?? null },
          },
          { merge: true }
        );
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
    setUser: create.reducer((state, action: { payload: AuthUser | null }) => {
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

/**
 *
 * @returns currently logged in user
 */
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const {
  loginUser,
  registerUser,
  logoutUser,
  setUser,
  clearUser,
  finishLoading,
} = authSlice.actions;

export default authSlice.reducer;
