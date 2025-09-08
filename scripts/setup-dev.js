#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Kleaners development environment...\n');

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Creating .env.local from env.example...');
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ .env.local created successfully');
  } else {
    console.log('❌ env.example not found. Please create it first.');
    process.exit(1);
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.log('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Check TypeScript configuration
console.log('🔍 Checking TypeScript configuration...');
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  console.log('✅ TypeScript configuration is valid');
} catch (error) {
  console.log('⚠️  TypeScript configuration has issues. Please check the output above.');
}

// Check if Supabase CLI is available
console.log('🔍 Checking Supabase CLI...');
try {
  execSync('supabase --version', { stdio: 'pipe' });
  console.log('✅ Supabase CLI is available');
} catch (error) {
  console.log('⚠️  Supabase CLI not found. Install it with: npm install -g supabase');
}

// Create necessary directories
const directories = [
  'types',
  'lib',
  'store',
  'hooks',
  'utils',
  'public/images',
  'public/icons'
];

console.log('📁 Creating necessary directories...');
directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎉 Development environment setup complete!');
console.log('\nNext steps:');
console.log('1. Update .env.local with your actual environment variables');
console.log('2. Run "npm run dev" to start the development server');
console.log('3. Run "npm run type-check" to verify TypeScript setup');
console.log('4. Run "npm run lint" to check code quality');
