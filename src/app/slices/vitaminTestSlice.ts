import { createSlice } from '@reduxjs/toolkit';

interface VitaminTestState {
  vitaminTestData: {
    vitaminA: number | null;
    vitaminB12: number | null;
    vitaminC: number | null;
    vitaminD: number | null;
    vitaminE: number | null;
    vitaminK: number | null;
    date: string | null;
  };
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

const initialState: VitaminTestState = {
  vitaminTestData: {
    vitaminA: null,
    vitaminB12: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    vitaminK: null,
    date: null,
  },
};

const vitaminTestSlice = createSlice({
  name: 'vitaminTest',
  initialState,
  reducers: {
    setVitaminTestData: (state, action) => {
      state.vitaminTestData = { ...state.vitaminTestData, ...action.payload, date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) };
      localStorage.setItem('vitaminTestData', JSON.stringify(state.vitaminTestData));
    },
  },
});

export const { setVitaminTestData } = vitaminTestSlice.actions;
export default vitaminTestSlice.reducer;
