import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/febe-last-project-web-intermedient-geolocation/',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['leaflet'],
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif'],
}); 