import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setIsDarkMode } from '../slices/themeSlice';

export function useSystemThemeSync() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);

  useEffect(() => {
    if (themeMode !== 'system') return;

    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      dispatch(setIsDarkMode(event.matches));
    };

    matcher.addEventListener('change', onChange);

    dispatch(setIsDarkMode(matcher.matches));

    return () => matcher.removeEventListener('change', onChange);
  }, [themeMode, dispatch]);
}
