import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/authApi';

export type TestType = 'blood' | 'urine' | 'vitamin' | 'genetic';

interface TestData {
  date: string;
  hemoglobin?: number | null;
  wbc?: number | null;
  rbc?: number | null;
  platelets?: number | null;
  glucose?: number | null;
  cholesterol?: number | null;
  ph?: number | null;
  specificGravity?: number | null;
  protein?: number | null;
  ketones?: number | null;
  bilirubin?: number | string | null;
  urobilinogen?: number | null;
  nitrites?: string | null;
  leukocyteEsterase?: string | null;
  blood?: string | null;
  vitaminA?: number | null;
  vitaminB12?: number | null;
  vitaminC?: number | null;
  vitaminD?: number | null;
  vitaminE?: number | null;
  vitaminK?: number | null;
  brca1?: string | null;
  brca2?: string | null;
  apoe?: string | null;
  mthfr?: string | null;
  factor_v_leiden?: string | null;
  cyp2c19?: string | null;
}

export interface UrineTestFormValues {
  ph: number | null;
  specificGravity: number | null;
  protein: number | null;
  glucose: number | null;
  ketones: number | null;
  bilirubin: string | null;
  urobilinogen: number | null;
  nitrites: string | null;
  leukocyteEsterase: string | null;
  blood: string | null;
  date: string | null;
}

export interface BloodTestFormValues {
  hemoglobin: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  glucose: number | null;
  cholesterol: number | null;
  date: string | null;
}

export interface GeneticTestFormValues {
  brca1: string | null;
  brca2: string | null;
  apoe: string | null;
  mthfr: string | null;
  factor_v_leiden: string | null;
  cyp2c19: string | null;
  date: string | null;
}

export interface VitaminTestFormValues {
  vitaminA: number | null;
  vitaminB12: number | null;
  vitaminC: number | null;
  vitaminD: number | null;
  vitaminE: number | null;
  vitaminK: number | null;
  date: string | null;
}

interface TestsState {
  blood: TestData | null;
  urine: TestData | null;
  vitamin: TestData | null;
  genetic: TestData | null;
}

const initialState: TestsState = {
  blood: null,
  urine: null,
  vitamin: null,
  genetic: null,
};

export const fetchTestData = createAsyncThunk<
  TestData | null,
  { uid: string; testType: TestType }
>('tests/fetchTestData', async ({ uid, testType }) => {
  const ref = doc(db, 'users', uid, 'Tests', testType);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data() as TestData;
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

export const saveTestData = createAsyncThunk<
  TestData,
  {
    uid: string;
    testType: TestType;
    data:
      | BloodTestFormValues
      | UrineTestFormValues
      | VitaminTestFormValues
      | GeneticTestFormValues;
  }
>('tests/saveTestData', async ({ uid, testType, data }) => {
  const ref = doc(db, 'users', uid, 'Tests', testType);
  const fullData: TestData = {
    ...data,
    date: new Date().toISOString(),
  };
  await setDoc(ref, fullData);
  return fullData;
});

export const editTestData = createAsyncThunk<
  TestData,
  {
    uid: string;
    testType: TestType;
    data:
      | BloodTestFormValues
      | UrineTestFormValues
      | VitaminTestFormValues
      | GeneticTestFormValues;
  }
>('tests/editTestData', async ({ uid, testType, data }) => {
  const ref = doc(db, 'users', uid, 'Tests', testType);
  const updatedWithDate = {
    ...data,
    date: new Date().toISOString(),
  };
  await updateDoc(ref, updatedWithDate);
  const snap = await getDoc(ref);
  return snap.data() as TestData;
});

export const deleteTestData = createAsyncThunk<
  { testType: TestType },
  { uid: string; testType: TestType }
>('tests/deleteTestData', async ({ uid, testType }) => {
  const ref = doc(db, 'users', uid, 'Tests', testType);
  await deleteDoc(ref);
  return { testType };
});

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestData: (
      state,
      action: PayloadAction<{ testType: TestType; data: TestData }>
    ) => {
      state[action.payload.testType] = {
        ...action.payload.data,
        date: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    },
    clearTestData: (state, action: PayloadAction<TestType>) => {
      state[action.payload] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestData.fulfilled, (state, action) => {
        if (action.meta.arg) {
          state[action.meta.arg.testType] = action.payload;
        }
      })
      .addCase(saveTestData.fulfilled, (state, action) => {
        if (action.meta.arg) {
          state[action.meta.arg.testType] = action.payload;
        }
      })
      .addCase(editTestData.fulfilled, (state, action) => {
        if (action.meta.arg) {
          state[action.meta.arg.testType] = action.payload;
        }
      })
      .addCase(deleteTestData.fulfilled, (state, action) => {
        state[action.payload.testType] = null;
      });
  },
});

export const { setTestData, clearTestData } = testSlice.actions;
export default testSlice.reducer;
