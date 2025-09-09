#!/usr/bin/env node

/**
 * Comprehensive Syntax Error Fix Script
 * 
 * This script fixes all unterminated string constants in import statements.
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing ALL syntax errors in import statements...\n');

// Function to fix unterminated strings in a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix unterminated strings in import statements
    const lines = content.split('\n');
    const fixedLines = lines.map(line => {
      // Check for unterminated strings in import statements
      if (line.includes('import') && line.includes('from') && line.includes('@/')) {
        // Check if the line ends with an unterminated string
        if (line.match(/from\s+['"]@\/[^'"]*["']$/)) {
          // This line has an unterminated string
          const fixed = line.replace(/from\s+['"]@\/[^'"]*["']$/, (match) => {
            return match + "'";
          });
          if (fixed !== line) {
            modified = true;
            return fixed;
          }
        }
      }
      return line;
    });
    
    if (modified) {
      const fixedContent = fixedLines.join('\n');
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== '.next') {
        files = files.concat(findFiles(fullPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }
  
  return files;
}

// Find all relevant files
const files = findFiles(process.cwd());

console.log(`📁 Found ${files.length} files to check...\n`);

let fixedCount = 0;

// Process each file
files.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files with syntax errors`);

if (fixedCount > 0) {
  console.log('\n🎯 Next steps:');
  console.log('1. Restart the development server: npm run dev');
  console.log('2. Test the application at http://localhost:3000');
  console.log('3. Check console for any remaining errors');
} else {
  console.log('\n✅ No syntax errors found');
}
