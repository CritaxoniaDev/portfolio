import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5070,
    host: true
  },

  build: {
    target: 'esnext',
    minify: 'oxc',
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('react') ||
            id.includes('react-dom')
          ) {
            return 'react-vendor';
          }

          if (
            id.includes('react-icons') ||
            id.includes('lucide-react')
          ) {
            return 'icons';
          }

          if (id.includes('lenis')) {
            return 'lenis';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});