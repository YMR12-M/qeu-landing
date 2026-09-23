import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // Responsive AVIF/WebP variants are generated at build time from the imports in
    // src/content/media.js — source images stay untouched in src/assets/images.
    imagetools(),
  ],
  define: {
    // The year the page is built: what the pre-rendered footer shows until the browser
    // swaps in the visitor's current year (src/hooks/useCurrentYear.js).
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  css: {
    modules: {
      // Class names are written in kebab-case and read in camelCase (styles.storeButton).
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    // Keep fonts, images and the QR code as separate, cacheable files (never base64).
    assetsInlineLimit: 0,
    // public/ belongs to the deployed site only: the server bundle, used just to
    // pre-render, doesn't need a copy of it.
    copyPublicDir: !isSsrBuild,
  },
}));
