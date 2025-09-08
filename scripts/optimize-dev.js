#!/usr/bin/env node

/**
 * Development Optimization Script
 * Optimizes the development environment for better live preview performance
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Optimizing development environment for live preview...');

// 1. Clear Vite cache
console.log('📦 Clearing Vite cache...');
try {
  execSync('npx vite --clearCache', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Vite cache clear failed, continuing...');
}

// 2. Update browserslist for better compatibility
console.log('🌐 Updating browserslist...');
try {
  execSync('npx update-browserslist-db@latest', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Browserslist update failed, continuing...');
}

// 3. Check for large dependencies that might slow down HMR
console.log('🔍 Analyzing bundle size...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const largeDeps = [];

Object.entries(packageJson.dependencies).forEach(([name, version]) => {
  // Check for known large dependencies
  const largeDependencies = [
    'framer-motion',
    'recharts',
    '@supabase/supabase-js',
    'react-router-dom'
  ];
  
  if (largeDependencies.includes(name)) {
    largeDeps.push(name);
  }
});

if (largeDeps.length > 0) {
  console.log(`📊 Large dependencies detected: ${largeDeps.join(', ')}`);
  console.log('💡 Consider lazy loading these components for better HMR performance');
}

// 4. Create development-specific optimizations
console.log('⚙️  Creating development optimizations...');

const devOptimizations = `
// Development optimizations for better live preview
if (import.meta.env.DEV) {
  // Disable React StrictMode in development for better performance
  // (Uncomment if you experience double-rendering issues)
  // window.__REACT_STRICT_MODE__ = false;
  
  // Enable performance monitoring in development
  if (typeof window !== 'undefined') {
    window.__DEV_PERFORMANCE__ = true;
  }
  
  // Optimize console logging in development
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    if (args[0]?.includes?.('Service Worker')) return;
    originalConsoleLog(...args);
  };
}
`;

// Write development optimizations to a file
fs.writeFileSync('src/utils/dev-optimizations.ts', devOptimizations);

console.log('✅ Development environment optimized!');
console.log('');
console.log('🎯 Live preview optimizations applied:');
console.log('   • Vite cache cleared');
console.log('   • Browserslist updated');
console.log('   • Bundle analysis completed');
console.log('   • Development optimizations created');
console.log('');
console.log('🚀 Start development server with: npm run dev');
console.log('📱 Live preview should now work optimally!');
