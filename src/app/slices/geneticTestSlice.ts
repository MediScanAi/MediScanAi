import { createSlice } from '@reduxjs/toolkit';

interface GeneticTestState {
  geneticTestData: {
    brca1: number | null;
    brca2: number | null;
    apoe: number | null;
    mthfr: number | null;
    factor_v_leiden: number | null;
    cyp2c19: number | null;
    date: string | null;
  };
}

export interface GeneticTestFormValues {
  brca1: number | null;
  brca2: number | null;
  apoe: number | null;
  mthfr: number | null;
  factor_v_leiden: number | null;
  cyp2c19: number | null;
  date: string | null;
}

const initialState: GeneticTestState = {
  geneticTestData: {
    brca1: null,
    brca2: null,
    apoe: null,
    mthfr: null,
    factor_v_leiden: null,
    cyp2c19: null,
    date: null,
  },
};

const geneticTestSlice = createSlice({
  name: 'geneticTest',
  initialState,
  reducers: {
    setGeneticTestData: (state, action) => {
      state.geneticTestData = {
        ...state.geneticTestData,
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
        'geneticTestData',
        JSON.stringify(state.geneticTestData)
      );
    },
  },
});

export const { setGeneticTestData } = geneticTestSlice.actions;
export default geneticTestSlice.reducer;
