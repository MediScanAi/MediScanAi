// import { createSlice } from '@reduxjs/toolkit';

// interface GeneticTestState {
//   geneticTestData: GeneticTestFormValues | null;
// }

// export interface GeneticTestFormValues {
//   brca1: string | null;
//   brca2: string | null;
//   apoe: string | null;
//   mthfr: string | null;
//   factor_v_leiden: string | null;
//   cyp2c19: string | null;
//   date: string | null;
// }

// const storedData = localStorage.getItem('geneticTestData');
// const initialState: GeneticTestState = {
//   geneticTestData: storedData
//     ? (JSON.parse(storedData) as GeneticTestFormValues)
//     : null,
// };

// const geneticTestSlice = createSlice({
//   name: 'geneticTest',
//   initialState,
//   reducers: {
//     setGeneticTestData: (state, action) => {
//       state.geneticTestData = {
//         ...state.geneticTestData,
//         ...action.payload,
//         date: new Date().toLocaleString([], {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit',
//           hour: '2-digit',
//           minute: '2-digit',
//         }),
//       };
//       localStorage.setItem(
//         'geneticTestData',
//         JSON.stringify(state.geneticTestData)
//       );
//     },
//     deleteGeneticTestData: (state) => {
//       state.geneticTestData = null;
//       localStorage.removeItem('geneticTestData');
//     },
//     updateGeneticTestData: (state, action) => {
//       state.geneticTestData = {
//         ...action.payload,
//       };
//       localStorage.setItem(
//         'geneticTestData',
//         JSON.stringify(state.geneticTestData)
//       );
//     },
//   },
// });

// export const {
//   setGeneticTestData,
//   deleteGeneticTestData,
//   updateGeneticTestData,
// } = geneticTestSlice.actions;
// export default geneticTestSlice.reducer;
