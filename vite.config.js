import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/febe-last-project-web-intermedient-geolocation/',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'docs',
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
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Blue GeoLocation',
        short_name: 'Blue',
        description: 'Share your stories with the world and discover amazing places!',
        theme_color: '#1a73e8',
        icons: [
          {
            src: 'images/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
}); 