import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/authApi'; // путь к твоей инициализации Firebase

export interface BloodTestFormValues {
  hemoglobin: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  glucose: number | null;
  cholesterol: number | null;
  date: string | null;
}

interface BloodTestState {
  bloodTestData: BloodTestFormValues | null;
}

const initialState: BloodTestState = {
  bloodTestData: null,
};

export const fetchBloodTestData = createAsyncThunk<
  BloodTestFormValues | null,
  string
>('bloodTest/fetchBloodTestData', async (uid) => {
  const ref = doc(db, 'users', uid, 'bloodTest', 'latest');
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data() as BloodTestFormValues;

    return {
      ...data,
      date: new Date(data.date || '').toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }

  return null;
});

export const saveBloodTestData = createAsyncThunk(
  'bloodTest/saveBloodTestData',
  async ({
    uid,
    data,
  }: {
    uid: string;
    data: Omit<BloodTestFormValues, 'date'>;
  }) => {
    const fullData: BloodTestFormValues = {
      ...data,
      date: new Date().toISOString(),
    };

    const ref = doc(db, 'users', uid, 'bloodTest', 'latest');
    await setDoc(ref, fullData);

    return fullData;
  }
);

export const deleteBloodTestDataFromDB = createAsyncThunk(
  'bloodTest/deleteBloodTestDataFromDB',
  async (uid: string) => {
    const ref = doc(db, 'users', uid, 'bloodTest', 'latest');
    await deleteDoc(ref);
    return null;
  }
);

export const editBloodTestData = createAsyncThunk(
  'bloodTest/editBloodTestData',
  async ({
    uid,
    updatedFields,
  }: {
    uid: string;
    updatedFields: Partial<Omit<BloodTestFormValues, 'date'>>;
  }) => {
    const ref = doc(db, 'users', uid, 'bloodTest', 'latest');

    const updatedWithDate = {
      ...updatedFields,
      date: new Date().toISOString(),
    };

    await updateDoc(ref, updatedWithDate);

    const snap = await getDoc(ref);
    return snap.data() as BloodTestFormValues;
  }
);

const bloodTestSlice = createSlice({
  name: 'bloodTest',
  initialState,
  reducers: {
    setBloodTestData: (state, action: PayloadAction<BloodTestFormValues>) => {
      state.bloodTestData = action.payload;
    },
    deleteBloodTestData: (state) => {
      state.bloodTestData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBloodTestData.fulfilled, (state, action) => {
        state.bloodTestData = action.payload;
      })
      .addCase(saveBloodTestData.fulfilled, (state, action) => {
        state.bloodTestData = action.payload;
      })
      .addCase(deleteBloodTestDataFromDB.fulfilled, (state) => {
        state.bloodTestData = null;
      })
      .addCase(editBloodTestData.fulfilled, (state, action) => {
        state.bloodTestData = action.payload;
      });
  },
});

export const { setBloodTestData, deleteBloodTestData } = bloodTestSlice.actions;
export default bloodTestSlice.reducer;
