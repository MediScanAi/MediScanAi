import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../api/authApi';

export interface HealthDataEntry {
  date: string;
  updatedAt?: Timestamp | string;
  [key: string]: string | number | null | Timestamp | undefined;
}

export interface HealthDataState {
  selectedDate: string | null;
  data: HealthDataEntry | null;
  loading: boolean;
  error: string | null;
}

const convertTimestampToString = (
  data: HealthDataEntry | null
): HealthDataEntry | null => {
  if (!data) return data;
  if (
    data.updatedAt &&
    typeof data.updatedAt === 'object' &&
    'toDate' in data.updatedAt
  ) {
    return {
      ...data,
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  }
  return data;
};

export const fetchHealthData = createAsyncThunk<
  HealthDataEntry | null,
  { uid: string; date: string }
>('healthData/fetchHealthData', async ({ uid, date }) => {
  const ref = doc(db, 'users', uid, 'healthData', date);
  const snap = await getDoc(ref);
  if (snap.exists())
    return convertTimestampToString(snap.data() as HealthDataEntry);
  return null;
});

export const saveHealthData = createAsyncThunk<
  HealthDataEntry,
  { uid: string; date: string; data: Record<string, string | number | null> }
>('healthData/saveHealthData', async ({ uid, date, data }) => {
  const ref = doc(db, 'users', uid, 'healthData', date.slice(0, 10));
  const payload = { ...data, date };
  await setDoc(ref, payload);
  return payload as HealthDataEntry;
});

export const updateHealthData = createAsyncThunk<
  HealthDataEntry,
  { uid: string; date: string; data: Record<string, string | number | null> }
>('healthData/updateHealthData', async ({ uid, date, data }) => {
  const ref = doc(db, 'users', uid, 'healthData', date.slice(0, 10));
  await updateDoc(ref, data);
  const updatedSnap = await getDoc(ref);
  return convertTimestampToString(
    updatedSnap.data() as HealthDataEntry
  ) as HealthDataEntry;
});

export const deleteHealthData = createAsyncThunk<
  string,
  { uid: string; date: string }
>('healthData/deleteHealthData', async ({ uid, date }) => {
  const ref = doc(db, 'users', uid, 'healthData', date.slice(0, 10));
  await deleteDoc(ref);
  return date;
});

const initialState: HealthDataState = {
  selectedDate: null,
  data: null,
  loading: false,
  error: null,
};

const healthDataSlice = createSlice({
  name: 'healthData',
  initialState,
  reducers: {
    clearHealthData: (state) => {
      state.data = null;
      state.selectedDate = null;
      state.error = null;
    },
    setData: (state, action: PayloadAction<HealthDataEntry>) => {
      state.data = action.payload;
      state.selectedDate = action.payload.date.slice(0, 10);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHealthData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching data';
      })
      .addCase(saveHealthData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateHealthData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteHealthData.fulfilled, (state, action) => {
        if (state.selectedDate === action.payload) {
          state.data = null;
        }
      });
  },
});

export const { clearHealthData, setData } = healthDataSlice.actions;
export default healthDataSlice.reducer;
