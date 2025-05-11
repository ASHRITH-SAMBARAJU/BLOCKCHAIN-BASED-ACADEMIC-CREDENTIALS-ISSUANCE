// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // Ensures the project root is correctly set
  build: {
    rollupOptions: {
      input: './index.html' // Ensures Vite correctly identifies your entry point
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
