// import { createSlice } from '@reduxjs/toolkit';

// interface VitaminTestState {
//   vitaminTestData: VitaminTestFormValues | null;
// }

// export interface VitaminTestFormValues {
//   vitaminA: number | null;
//   vitaminB12: number | null;
//   vitaminC: number | null;
//   vitaminD: number | null;
//   vitaminE: number | null;
//   vitaminK: number | null;
//   date: string | null;
// }

// const storedData = localStorage.getItem('vitaminTestData');
// const initialState: VitaminTestState = {
//   vitaminTestData: storedData
//     ? (JSON.parse(storedData) as VitaminTestFormValues)
//     : null,
// };

// const vitaminTestSlice = createSlice({
//   name: 'vitaminTest',
//   initialState,
//   reducers: {
//     setVitaminTestData: (state, action) => {
//       state.vitaminTestData = {
//         ...state.vitaminTestData,
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
//         'vitaminTestData',
//         JSON.stringify(state.vitaminTestData)
//       );
//     },
//     deleteVitaminTestData: (state) => {
//       state.vitaminTestData = null;
//       localStorage.removeItem('vitaminTestData');
//     },
//     updateVitaminTestData: (state, action) => {
//       state.vitaminTestData = {
//         ...action.payload,
//       };
//       localStorage.setItem(
//         'vitaminTestData',
//         JSON.stringify(state.vitaminTestData)
//       );
//     },
//   },
// });

// export const {
//   setVitaminTestData,
//   deleteVitaminTestData,
//   updateVitaminTestData,
// } = vitaminTestSlice.actions;
// export default vitaminTestSlice.reducer;
