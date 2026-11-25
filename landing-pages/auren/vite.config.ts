import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // the three.js chunk (~140 kB gzipped) is already lazy-loaded with the 3D section
  build: { chunkSizeWarningLimit: 600 },
});
