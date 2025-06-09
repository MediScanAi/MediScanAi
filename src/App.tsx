import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Routing';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppInitFetcher from './components/AppInitFetcher';
import { useSystemThemeSync } from './app/hooks/useSystemThemeSync';

const App: React.FC = () => {
  useSystemThemeSync();
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense>
        <AppInitFetcher />
        <RouterProvider router={router} />
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
