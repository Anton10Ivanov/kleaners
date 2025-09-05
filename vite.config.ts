
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve build performance and support BigInt
    target: 'es2020',
    minify: 'esbuild',
<<<<<<< HEAD
    // Remove console logs in production
    ...(mode === 'production' && {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }),
=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
<<<<<<< HEAD
          // Core React libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI component libraries
          ui: [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          // Authentication and backend
          auth: ['@supabase/supabase-js'],
          // Utility libraries
          utils: ['date-fns', 'clsx', 'tailwind-merge', 'zod'],
          // Animation libraries
          framer: ['framer-motion'],
          // Form libraries
          forms: ['react-hook-form', '@hookform/resolvers'],
          // Query and state management
          query: ['@tanstack/react-query', 'zustand'],
          // Charts and data visualization
          charts: ['recharts']
=======
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          auth: ['@supabase/supabase-js'],
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
          framer: ['framer-motion']
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const extType = (assetInfo.name.split('.')[1] || '').toLowerCase();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    sourcemap: mode === 'development',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'sonner', '@supabase/supabase-js', 'framer-motion', 'date-fns'],
    exclude: []
  },
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
    cors: true
  },
  css: {
    devSourcemap: true,
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
}));
