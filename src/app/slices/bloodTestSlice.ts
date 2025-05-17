import { createSlice } from '@reduxjs/toolkit';

interface BloodTestState {
  bloodTestData: BloodTestFormValues | null;
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

const storedData = localStorage.getItem('bloodTestData');
const initialState: BloodTestState = {
  bloodTestData: storedData ? (JSON.parse(storedData) as BloodTestFormValues) : null,
};


const bloodTestSlice = createSlice({
  name: 'bloodTest',
  initialState,
  reducers: {
    setBloodTestData: (state, action) => {
      state.bloodTestData = {
        ...state.bloodTestData,
        ...action.payload,
        date: new Date().toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      localStorage.setItem(
        'bloodTestData',
        JSON.stringify(state.bloodTestData)
      );
    },
    deleteBloodTestData: (state) => {
      state.bloodTestData = null
      localStorage.removeItem('bloodTestData');
    },
    updateBloodTestData: (state, action) => {
      state.bloodTestData = {
        ...action.payload,
      };
      localStorage.setItem('bloodTestData', JSON.stringify(state.bloodTestData));
    },
  },
});

export const { setBloodTestData, deleteBloodTestData, updateBloodTestData } = bloodTestSlice.actions;
export default bloodTestSlice.reducer;
