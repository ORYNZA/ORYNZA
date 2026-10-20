
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ORYNZA/',
  plugins: [react()],
  build: { sourcemap: false, chunkSizeWarningLimit: 600 },
});