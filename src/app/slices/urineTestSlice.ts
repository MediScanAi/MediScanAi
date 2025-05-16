import { createSlice } from '@reduxjs/toolkit';

interface UrineTestState {
  urineTestData: UrineTestFormValues | null;
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

const storedData = localStorage.getItem('urineTestData');
const initialState: UrineTestState = {
  urineTestData: storedData ? (JSON.parse(storedData) as UrineTestFormValues) : null,
};

const urineTestSlice = createSlice({
  name: 'urineTest',
  initialState,
  reducers: {
    setUrineTestData: (state, action) => {
      state.urineTestData = {
        ...state.urineTestData,
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
        'urineTestData',
        JSON.stringify(state.urineTestData)
      );
    },
    deleteUrineTestData: (state) => {
      state.urineTestData = null;
      localStorage.removeItem('urineTestData');
    },
    updateUrineTestData: (state, action) => {
      state.urineTestData = {
        ...action.payload,
      };
      localStorage.setItem('urineTestData', JSON.stringify(state.urineTestData));
    }
  },
});

export const { setUrineTestData, deleteUrineTestData, updateUrineTestData } = urineTestSlice.actions;
export default urineTestSlice.reducer;
