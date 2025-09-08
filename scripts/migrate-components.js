#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Starting component migration from src-backup to components...\n');

// Source and destination directories
const srcBackupDir = path.join(process.cwd(), 'src-backup', 'components');
const componentsDir = path.join(process.cwd(), 'components');

// Ensure components directory exists
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
  console.log('✅ Created components directory');
}

// Function to convert Vite imports to Next.js imports
function convertImports(content) {
  return content
    // Convert Vite @ alias to Next.js @ alias
    .replace(/from ['"]@\//g, "from '@/")
    // Convert React Router imports to Next.js navigation
    .replace(/import { useNavigate, useLocation, useParams } from ['"]react-router-dom['"]/g, 
             "import { useRouter, usePathname, useSearchParams } from 'next/navigation'")
    .replace(/useNavigate\(\)/g, 'useRouter()')
    .replace(/useLocation\(\)/g, 'usePathname()')
    .replace(/useParams\(\)/g, 'useSearchParams()')
    // Convert Link components
    .replace(/import { Link } from ['"]react-router-dom['"]/g, 
             "import Link from 'next/link'")
    // Convert NavLink to Link
    .replace(/import { NavLink } from ['"]react-router-dom['"]/g, 
             "import Link from 'next/link'")
    .replace(/<NavLink/g, '<Link')
    .replace(/<\/NavLink>/g, '</Link>')
    // Convert to prop to href
    .replace(/to=/g, 'href=')
    // Add 'use client' directive for interactive components
    .replace(/^import React/g, "'use client'\n\nimport React");
}

// Function to convert component to Next.js format
function convertComponent(content, filePath) {
  let converted = convertImports(content);
  
  // Add Next.js specific optimizations
  if (filePath.includes('Image') || content.includes('img src=')) {
    converted = converted.replace(/import React/g, 
      "import React\nimport Image from 'next/image'");
  }
  
  // Convert img tags to Next.js Image component
  converted = converted.replace(
    /<img\s+src={([^}]+)}\s+alt={([^}]+)}([^>]*)>/g,
    '<Image src={$1} alt={$2}$3 width={500} height={300} />'
  );
  
  return converted;
}

// Function to migrate a single component
function migrateComponent(sourcePath, destPath) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const converted = convertComponent(content, sourcePath);
    
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.writeFileSync(destPath, converted);
    console.log(`✅ Migrated: ${path.relative(process.cwd(), sourcePath)} → ${path.relative(process.cwd(), destPath)}`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to migrate ${sourcePath}: ${error.message}`);
    return false;
  }
}

// Function to recursively migrate components
function migrateDirectory(sourceDir, destDir, relativePath = '') {
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Source directory not found: ${sourceDir}`);
    return;
  }
  
  const items = fs.readdirSync(sourceDir);
  let migratedCount = 0;
  let failedCount = 0;
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories that don't need migration
      if (['node_modules', '.git', '.next', 'dist'].includes(item)) {
        continue;
      }
      
      migrateDirectory(sourcePath, destPath, path.join(relativePath, item));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      // Migrate component files
      if (migrateComponent(sourcePath, destPath)) {
        migratedCount++;
      } else {
        failedCount++;
      }
    } else if (item.endsWith('.css') || item.endsWith('.scss')) {
      // Copy style files
      try {
        const content = fs.readFileSync(sourcePath, 'utf8');
        fs.writeFileSync(destPath, content);
        console.log(`✅ Copied styles: ${path.relative(process.cwd(), sourcePath)}`);
        migratedCount++;
      } catch (error) {
        console.log(`❌ Failed to copy styles ${sourcePath}: ${error.message}`);
        failedCount++;
      }
    }
  }
  
  return { migratedCount, failedCount };
}

// Main migration process
console.log('📁 Starting component migration...\n');

const result = migrateDirectory(srcBackupDir, componentsDir);

console.log('\n📊 Migration Summary:');
console.log(`✅ Successfully migrated: ${result?.migratedCount || 0} files`);
console.log(`❌ Failed migrations: ${result?.failedCount || 0} files`);

// Create index files for better imports
console.log('\n📝 Creating index files for better imports...');

const createIndexFile = (dir) => {
  const indexPath = path.join(dir, 'index.ts');
  const files = fs.readdirSync(dir).filter(file => 
    file.endsWith('.tsx') && file !== 'index.tsx'
  );
  
  if (files.length > 0) {
    const exports = files.map(file => {
      const name = path.basename(file, '.tsx');
      return `export { default as ${name} } from './${name}';`;
    }).join('\n');
    
    fs.writeFileSync(indexPath, exports);
    console.log(`✅ Created index file: ${path.relative(process.cwd(), indexPath)}`);
  }
};

// Create index files for main component directories
const mainDirs = ['ui', 'forms', 'layout', 'admin', 'booking', 'provider', 'client'];
mainDirs.forEach(dir => {
  const dirPath = path.join(componentsDir, dir);
  if (fs.existsSync(dirPath)) {
    createIndexFile(dirPath);
  }
});

console.log('\n🎉 Component migration completed!');
console.log('\nNext steps:');
console.log('1. Review migrated components for any remaining issues');
console.log('2. Update imports in pages and other components');
console.log('3. Test components in the Next.js environment');
console.log('4. Run "npm run type-check" to verify TypeScript compatibility');
