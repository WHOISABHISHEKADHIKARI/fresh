import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Fresh Masala Website',
        short_name: 'Fresh Masala',
        theme_color: '#ffffff',
        icons: [
          // Add your icons configuration
        ]
      }
    })
  ]
})