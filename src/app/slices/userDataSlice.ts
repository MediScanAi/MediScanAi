import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../api/authApi';

export interface UserData {
  age?: number | null;
  gender?: string | null;
  weight?: number | null;
  height?: number | null;
  waistSize?: number | null;
  neckSize?: number | null;
}

interface UserDataState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserDataState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchUserData = createAsyncThunk<UserData | null, { uid: string }>(
  'user/fetchUserData',
  async ({ uid }) => {
    const ref = doc(db, 'users', uid, 'personalData', 'info');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserData;
    }
    return null;
  }
);

export const saveUserData = createAsyncThunk<
  UserData,
  { uid: string; data: UserData }
>('user/saveUserData', async ({ uid, data }) => {
  const ref = doc(db, 'users', uid, 'personalData', 'info');
  await setDoc(ref, data, { merge: true });
  return data;
});

export const editUserData = createAsyncThunk<
  UserData,
  { uid: string; data: Partial<UserData> }
>('user/editUserData', async ({ uid, data }) => {
  const ref = doc(db, 'users', uid, 'personalData', 'info');
  await updateDoc(ref, data);
  const snap = await getDoc(ref);
  return snap.data() as UserData;
});

export const deleteUserData = createAsyncThunk<void, { uid: string }>(
  'user/deleteUserData',
  async ({ uid }) => {
    const ref = doc(db, 'users', uid, 'personalData', 'info');
    await deleteDoc(ref);
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUserData(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserData | null>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user data';
      })

      .addCase(saveUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        saveUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(saveUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save user data';
      })

      .addCase(editUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(editUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit user data';
      })

      .addCase(deleteUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserData.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user data';
      });
  },
});

export const { clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
