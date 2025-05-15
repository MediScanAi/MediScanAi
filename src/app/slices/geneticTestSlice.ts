import { createSlice } from '@reduxjs/toolkit';

interface GeneticTestState {
  geneticTestData: {
    brca1: number | null;
    brca2: number | null;
    apoe: number | null;
    mthfr: number | null;
    factor_v_leiden: number | null;
    cyp2c19: number | null;
    family_history_heart_disease: string | null;
    family_history_diabetes: string | null;
    family_history_cancer: string | null;
    family_history_hypertension: string | null;
    family_history_stroke: string | null;
    family_history_genetic_disorders: string | null;
    
  
  };
}

export interface GeneticTestFormValues {
  brca1: number | null;
  brca2: number | null;
  apoe: number | null;
  mthfr: number | null;
  factor_v_leiden: number | null;
  cyp2c19: number | null;
  cyp2d6: number | null;
  family_history_heart_disease: string | null;
  family_history_diabetes: string | null;
  family_history_cancer: string | null;
  family_history_hypertension: string | null;
  family_history_stroke: string | null;
  family_history_genetic_disorders: string | null;
}

const initialState: GeneticTestState = {
  geneticTestData: {
    brca1: null,
    brca2: null,
    apoe: null,
    mthfr: null,
    factor_v_leiden: null,
    cyp2c19: null,
    family_history_heart_disease: null,
    family_history_diabetes: null,
    family_history_cancer: null,
    family_history_hypertension: null,
    family_history_stroke: null,
    family_history_genetic_disorders: null,
  },
};

const geneticTestSlice = createSlice({
  name: 'geneticTest',
  initialState,
  reducers: {
    setGeneticTestData: (state, action) => {
      state.geneticTestData = action.payload;
    },
  },
});

export const { setGeneticTestData } = geneticTestSlice.actions;
export default geneticTestSlice.reducer;
