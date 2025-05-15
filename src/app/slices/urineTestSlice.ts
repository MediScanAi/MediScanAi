import { createSlice } from '@reduxjs/toolkit';

interface UrineTestState {
  urineTestData: {
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
  };
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
}

const initialState: UrineTestState = {
  urineTestData: {
    ph: null,
    specificGravity: null,
    protein: null,
    glucose: null,
    ketones: null,
    bilirubin: null,
    urobilinogen: null,
    nitrites: null,
    leukocyteEsterase: null,
    blood: null,
  },
};

const urineTestSlice = createSlice({
  name: 'urineTest',
  initialState,
  reducers: {
    setUrineTestData: (state, action) => {
      state.urineTestData = action.payload;
    },
  },
});

export const { setUrineTestData } = urineTestSlice.actions;
export default urineTestSlice.reducer;
