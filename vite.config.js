/* eslint-disable no-undef */
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [react()],
    server: {
      host: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://host.docker.internal:9000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
      port: 8080,
    },
    define: {
      API_BASE_URL: JSON.stringify(env.API_BASE_URL),
    },
  };
});
