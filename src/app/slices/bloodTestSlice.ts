import { createSlice } from '@reduxjs/toolkit';

interface BloodTestState {
  bloodTestData: {
    hemoglobin: number | null;
    wbc: number | null;
    rbc: number | null;
    platelets: number | null;
    glucose: number | null;
    cholesterol: number | null;
    date: string | null;
  };
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

const initialState: BloodTestState = {
  bloodTestData: {
    hemoglobin: null,
    wbc: null,
    rbc: null,
    platelets: null,
    glucose: null,
    cholesterol: null,
    date: null,
  }
};

const bloodTestSlice = createSlice({
  name: 'bloodTest',
  initialState,
  reducers: {
    setBloodTestData: (state, action) => {
      state.bloodTestData = { ...state.bloodTestData, ...action.payload, date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) };
      localStorage.setItem('bloodTestData', JSON.stringify(state.bloodTestData));
    },
  },
});

export const { setBloodTestData } = bloodTestSlice.actions;
export default bloodTestSlice.reducer;
