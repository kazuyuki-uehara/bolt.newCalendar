import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['calendar.svg', 'calendar-192.png', 'calendar-512.png'],
      manifest: {
        name: '沖縄手帳',
        short_name: '沖縄手帳',
        description: '沖縄の暮らしに寄り添う和暦カレンダー',
        theme_color: '#FFE082',
        background_color: '#FFF8E1',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['productivity', 'lifestyle'],
        icons: [
          {
            src: 'calendar-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'calendar-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});