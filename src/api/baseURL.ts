export const API_BASE =
  import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://us-central1-mediscan-ai-app.cloudfunctions.net';
