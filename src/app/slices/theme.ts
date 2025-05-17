import { createSlice } from '@reduxjs/toolkit';

interface Theme {
  isDarkMode: boolean;
}

const initialState: Theme = {
  isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') || 'false'),
};

const Theme = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleTheme } = Theme.actions;
export default Theme.reducer;
