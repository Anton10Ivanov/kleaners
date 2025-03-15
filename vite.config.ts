
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          auth: ['@supabase/supabase-js'],
          utils: ['date-fns', 'clsx', 'tailwind-merge']
        }
      }
    },
    // Reduce build output for faster debugging
    sourcemap: mode === 'development',
    // Speed up build process
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'sonner', '@supabase/supabase-js'],
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
    tsconfigPath: mode === 'production' ? './tsconfig.strict.json' : './tsconfig.json'
  }
}));
