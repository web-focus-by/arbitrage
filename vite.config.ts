import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
        // '/ws': {
        //   target: env.VITE_BACKEND_WS_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/ws/, ''),
        //   ws: true, // even if true, websocket proxy doesn't work.
        // },
      },
    },
  };
});
