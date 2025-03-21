
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
    // Improve build performance
    target: 'es2015',
    minify: 'esbuild', // Changed from 'terser' to 'esbuild' which is included by default
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          auth: ['@supabase/supabase-js'],
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
          framer: ['framer-motion']
        },
        // Improve asset caching
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const extType = (assetInfo.name.split('.')[1] || '').toLowerCase();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Chunk naming for better cache management
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Reduce build output for faster debugging
    sourcemap: mode === 'development',
    // Speed up build process
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    // Add image optimization options
    assetsInlineLimit: 4096, // Inline small images for better performance
    // Enable SSR-friendly approach for better static generation
    ssrManifest: true,
  },
  // Optimize dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'sonner', '@supabase/supabase-js', 'framer-motion', 'date-fns'],
    exclude: []
  },
  // Add SPA fallback for production
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
    cors: true
  },
  // Enable type checking in build
  typescript: {
    tsconfigPath: mode === 'production' ? './tsconfig.strict.json' : './tsconfig.json',
  },
  // Add performance optimizations
  css: {
    devSourcemap: true,
  },
  // Configure asset handling
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
}));
