import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  isDarkMode: boolean;
}

const getSystemDarkMode = (): boolean => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const savedMode = (localStorage.getItem('themeMode') as ThemeMode) || 'system';

const getInitialThemeState = (): ThemeState => {
  const mode: ThemeMode = savedMode;
  let isDark = false;

  if (mode === 'dark') isDark = true;
  else if (mode === 'light') isDark = false;
  else isDark = getSystemDarkMode();

  return { themeMode: mode, isDarkMode: isDark };
};

const initialState: ThemeState = getInitialThemeState();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
      localStorage.setItem('themeMode', action.payload);

      if (action.payload === 'system') {
        state.isDarkMode = getSystemDarkMode();
      } else {
        state.isDarkMode = action.payload === 'dark';
      }
    },
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setThemeMode, setIsDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
