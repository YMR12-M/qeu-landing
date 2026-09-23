import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Responsive AVIF/WebP variants are generated at build time from the imports in
    // src/content/media.js — source images stay untouched in src/assets/images.
    imagetools(),
  ],
  css: {
    modules: {
      // Class names are written in kebab-case and read in camelCase (styles.storeButton).
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    // Keep fonts, images and the QR code as separate, cacheable files (never base64).
    assetsInlineLimit: 0,
  },
});
