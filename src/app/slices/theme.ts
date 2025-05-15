import { createSlice } from '@reduxjs/toolkit';

interface Theme {
    isDarkMode: boolean;
}

const initialState:Theme = {
   isDarkMode: false,
};

const Theme = createSlice({
    name: 'Theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    }
});

export const { toggleTheme } = Theme.actions;
export default Theme.reducer;
