import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider />
    <App />
  </Provider>
);
