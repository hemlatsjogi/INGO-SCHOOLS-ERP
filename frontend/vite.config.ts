import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),

    {
      name: 'auto-lazy-images',

      transform(code, id) {
        if (!/\.(tsx|jsx)$/.test(id)) return null;

        const transformed = code.replace(
          /<img(?![^>]*\bloading=)(?=\s|>)/g,
          '<img loading="lazy"'
        );

        return transformed !== code ? { code: transformed, map: null } : null;
      },
    },
  ],

  server: {
    port: 5173,
    host: true,
  },
});