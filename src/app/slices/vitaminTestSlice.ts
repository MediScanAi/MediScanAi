import { createSlice } from '@reduxjs/toolkit';

interface VitaminTestState {
  vitaminTestData: {
    vitaminA: number | null;
    vitaminB12: number | null;
    vitaminC: number | null;
    vitaminD: number | null;
    vitaminE: number | null;
    vitaminK: number | null;
  };
}

export interface VitaminTestFormValues {
  vitaminA: number | null;
  vitaminB12: number | null;
  vitaminC: number | null;
  vitaminD: number | null;
  vitaminE: number | null;
  vitaminK: number | null;
}

const initialState: VitaminTestState = {
  vitaminTestData: {
    vitaminA: null,
    vitaminB12: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    vitaminK: null,
  },
};

const vitaminTestSlice = createSlice({
  name: 'vitaminTest',
  initialState,
  reducers: {
    setVitaminTestData: (state, action) => {
      state.vitaminTestData = action.payload;
    },
  },
});

export const { setVitaminTestData } = vitaminTestSlice.actions;
export default vitaminTestSlice.reducer;
