import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    proxy: {
      '/api/spotify/token': {
        target: 'https://accounts.spotify.com/api/token',
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: false,
        rewrite: (path) => path.replace(/^\/api\/spotify\/token/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Remove problematic cookies
            delete proxyRes.headers['set-cookie'];
          });
        }
      },
      '/api/spotify/v1': {
        target: 'https://api.spotify.com/v1',
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: false,
        rewrite: (path) => path.replace(/^\/api\/spotify\/v1/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Remove problematic cookies
            delete proxyRes.headers['set-cookie'];
          });
        }
      }
    }
  }
})
