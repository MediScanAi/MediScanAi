import { createSlice } from '@reduxjs/toolkit';

interface BloodTestState {
  bloodTestData: {
    hemoglobin: number | null;
    wbc: number | null;
    rbc: number | null;
    platelets: number | null;
    glucose: number | null;
    cholesterol: number | null;
  };
}

export interface BloodTestFormValues {
  hemoglobin: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  glucose: number | null;
  cholesterol: number | null;
}

const initialState: BloodTestState = {
  bloodTestData: {
    hemoglobin: null,
    wbc: null,
    rbc: null,
    platelets: null,
    glucose: null,
    cholesterol: null,
  },
};

const bloodTestSlice = createSlice({
  name: 'bloodTest',
  initialState,
  reducers: {
    setBloodTestData: (state, action) => {
      state.bloodTestData = action.payload;
    },
  },
});

export const { setBloodTestData } = bloodTestSlice.actions;
export default bloodTestSlice.reducer;
