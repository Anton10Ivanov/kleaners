#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 Starting Kleaners Development Server');
console.log('=====================================\n');

console.log('🌐 Starting development server...');
console.log('📱 HMR enabled');
console.log('');

// Start the development server with main config
try {
  execSync('vite', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
}
