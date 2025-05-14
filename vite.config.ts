import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://us-central1-mediscan-ai-app.cloudfunctions.net',
        changeOrigin: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        rewrite: (_) => '/chatWithOpenAI',
      },
    },
  },
});
