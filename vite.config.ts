import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: './',
        },
        {
          src: 'icon/icon128.png',
          dest: './',
        },
      ],
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['monaco-editor'],
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        options: 'options.html',
        error: 'error.html',
        service_worker: 'src/service-worker/service_worker.ts',
        content: 'src/content/content.ts',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') {
            return 'assets/content.js';
          }

          if (chunkInfo.name === 'service_worker') {
            return 'assets/service_worker.js';
          }

          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
