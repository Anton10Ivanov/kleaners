#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Performance Monitoring Script');
console.log('================================\n');

// Function to run command and return output
function runCommand(command, description) {
  console.log(`📊 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', cwd: process.cwd() });
    console.log(`✅ ${description} completed`);
    return output;
  } catch (error) {
    console.log(`❌ ${description} failed:`, error.message);
    return null;
  }
}

// Function to analyze bundle size
function analyzeBundleSize() {
  console.log('\n📦 Bundle Size Analysis');
  console.log('======================');
  
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.log('❌ Dist folder not found. Run "npm run build" first.');
    return;
  }
  
  const files = fs.readdirSync(distPath, { recursive: true });
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  
  let totalJsSize = 0;
  let totalCssSize = 0;
  
  jsFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    totalJsSize += stats.size;
    console.log(`📄 ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
  });
  
  cssFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    totalCssSize += stats.size;
    console.log(`🎨 ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
  });
  
  console.log(`\n📊 Total JS Size: ${(totalJsSize / 1024).toFixed(2)} KB`);
  console.log(`📊 Total CSS Size: ${(totalCssSize / 1024).toFixed(2)} KB`);
  console.log(`📊 Total Bundle Size: ${((totalJsSize + totalCssSize) / 1024).toFixed(2)} KB`);
  
  // Performance targets
  const maxBundleSize = 500; // KB
  const totalSize = (totalJsSize + totalCssSize) / 1024;
  
  if (totalSize <= maxBundleSize) {
    console.log(`✅ Bundle size is within target (${totalSize.toFixed(2)} KB <= ${maxBundleSize} KB)`);
  } else {
    console.log(`⚠️  Bundle size exceeds target (${totalSize.toFixed(2)} KB > ${maxBundleSize} KB)`);
  }
}

// Function to check dependencies
function checkDependencies() {
  console.log('\n📋 Dependency Analysis');
  console.log('======================');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  console.log(`📦 Production dependencies: ${dependencies.length}`);
  console.log(`🛠️  Development dependencies: ${devDependencies.length}`);
  
  // Check for potential issues
  const largeDeps = ['framer-motion', '@supabase/supabase-js', 'recharts'];
  const foundLargeDeps = dependencies.filter(dep => largeDeps.includes(dep));
  
  if (foundLargeDeps.length > 0) {
    console.log(`⚠️  Large dependencies found: ${foundLargeDeps.join(', ')}`);
    console.log('   Consider lazy loading these dependencies.');
  }
}

// Function to run type checking
function runTypeCheck() {
  console.log('\n🔍 TypeScript Type Checking');
  console.log('============================');
  
  const output = runCommand('npx tsc --noEmit', 'Type checking');
  if (output) {
    console.log('✅ TypeScript compilation successful');
  }
}

// Function to run linting
function runLinting() {
  console.log('\n🧹 Code Quality Check');
  console.log('=====================');
  
  const output = runCommand('npm run lint', 'ESLint checking');
  if (output) {
    console.log('✅ Code quality check completed');
  }
}

// Main execution
async function main() {
  try {
    // Check if dist folder exists
    if (!fs.existsSync('dist')) {
      console.log('📦 Building project first...');
      runCommand('npm run build', 'Building project');
    }
    
    // Run all checks
    analyzeBundleSize();
    checkDependencies();
    runTypeCheck();
    runLinting();
    
    console.log('\n🎉 Performance monitoring completed!');
    console.log('\n📋 Summary:');
    console.log('- Bundle size analysis completed');
    console.log('- Dependency analysis completed');
    console.log('- TypeScript type checking completed');
    console.log('- Code quality check completed');
    
  } catch (error) {
    console.error('❌ Performance monitoring failed:', error.message);
    process.exit(1);
  }
}

main();
