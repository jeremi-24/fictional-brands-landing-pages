import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // its own cache folder: node_modules may be shared between the projects of this repository
  cacheDir: 'node_modules/.vite-kaya',
  // three.js is only downloaded when a 3D scene mounts; its chunk is large by nature
  build: { chunkSizeWarningLimit: 700 },
  optimizeDeps: { include: ['react', 'react-dom/client', '@vercel/analytics/react', 'three', 'three/examples/jsm/loaders/GLTFLoader.js', 'three/examples/jsm/environments/RoomEnvironment.js'] },
});
