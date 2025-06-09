import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/chat': {
        target: 'https://us-central1-mediscan-ai-app.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/chatWithOpenAI'),
      },
      '/api/parse-pdf': {
        target: 'https://us-central1-mediscan-ai-app.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/parse-pdf/, '/parsePdf'),
      },
      '/api/receive-data': {
        target: 'https://us-central1-mediscan-ai-app.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/receive-data/, '/receiveHealthData'),
      },
    },
  },
  build: {
    target: 'es2022', 
  },
});


