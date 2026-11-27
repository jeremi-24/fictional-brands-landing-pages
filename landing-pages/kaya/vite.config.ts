import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// the only part of Node used here, declared rather than installing @types/node
declare const process: { env: Record<string, string | undefined> };

// link previews need full addresses: Vercel gives the site's domain at build time
const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const share = {
  name: 'share-preview',
  transformIndexHtml: (html: string) =>
    domain ? html.replace('content="/og-image.jpg" />', `content="https://${domain}/og-image.jpg" />\n    <meta property="og:url" content="https://${domain}/" />`) : html,
};

export default defineConfig({
  plugins: [react(), share],
  // its own cache folder: node_modules may be shared between the projects of this repository
  cacheDir: 'node_modules/.vite-kaya',
  // three.js is only downloaded when a 3D scene mounts; its chunk is large by nature
  build: { chunkSizeWarningLimit: 700 },
  optimizeDeps: { include: ['react', 'react-dom/client', '@vercel/analytics/react', 'three', 'three/examples/jsm/loaders/GLTFLoader.js', 'three/examples/jsm/environments/RoomEnvironment.js'] },
});
