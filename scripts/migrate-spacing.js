#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔄 Migrating Vertical Spacing to Standardized System');
console.log('====================================================\n');

// Mapping of old spacing patterns to new standardized classes
const spacingMigrations = {
  // Section spacing migrations
  'py-20': 'section-spacing-2xl',
  'py-16': 'section-spacing-xl', 
  'py-12': 'section-spacing-lg',
  'py-8': 'section-spacing-md',
  'py-6': 'section-spacing-sm',
  'py-4': 'section-spacing-xs',
  'py-2': 'section-spacing-xs',
  'py-0': 'section-spacing-none',
  
  // Component spacing migrations
  'space-y-8': 'component-spacing-xl',
  'space-y-6': 'component-spacing-lg',
  'space-y-4': 'component-spacing-md',
  'space-y-3': 'component-spacing-sm',
  'space-y-2': 'component-spacing-xs',
  'space-y-1': 'component-spacing-xs',
  'space-y-0': 'component-spacing-none',
  
  // Card spacing migrations
  'p-8': 'card-spacing-lg',
  'p-6': 'card-spacing-md',
  'p-4': 'card-spacing-sm',
  'p-3': 'card-spacing-xs',
  'p-0': 'card-spacing-none',
  
  // Form spacing migrations
  'space-y-6': 'form-spacing-loose',
  'space-y-4': 'form-spacing-relaxed',
  'space-y-3': 'form-spacing-normal',
  'space-y-2': 'form-spacing-tight',
  'space-y-0': 'form-spacing-none',
};

// Files to migrate (exclude node_modules, dist, etc.)
const excludeDirs = ['node_modules', 'dist', '.git', '.next', 'build'];
const includeExtensions = ['.tsx', '.ts', '.jsx', '.js'];

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return includeExtensions.includes(ext);
}

function shouldProcessDir(dirName) {
  return !excludeDirs.includes(dirName);
}

function migrateSpacingInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    let changeCount = 0;
    
    // Apply spacing migrations
    Object.entries(spacingMigrations).forEach(([oldPattern, newPattern]) => {
      const regex = new RegExp(`\\b${oldPattern}\\b`, 'g');
      const matches = content.match(regex);
      
      if (matches) {
        content = content.replace(regex, newPattern);
        hasChanges = true;
        changeCount += matches.length;
      }
    });
    
    // Additional pattern-based migrations
    const additionalMigrations = [
      // Responsive spacing patterns
      {
        pattern: /py-(\d+)\s+md:py-(\d+)\s+lg:py-(\d+)/g,
        replacement: (match, mobile, tablet, desktop) => {
          const mobileClass = `py-${mobile}`;
          const tabletClass = `md:py-${tablet}`;
          const desktopClass = `lg:py-${desktop}`;
          
          // Map to appropriate section spacing
          if (parseInt(desktop) >= 20) return 'section-spacing-2xl';
          if (parseInt(desktop) >= 16) return 'section-spacing-xl';
          if (parseInt(desktop) >= 12) return 'section-spacing-lg';
          if (parseInt(desktop) >= 8) return 'section-spacing-md';
          if (parseInt(desktop) >= 6) return 'section-spacing-sm';
          return 'section-spacing-xs';
        }
      },
      
      // Space-y patterns with responsive variants
      {
        pattern: /space-y-(\d+)\s+md:space-y-(\d+)\s+lg:space-y-(\d+)/g,
        replacement: (match, mobile, tablet, desktop) => {
          if (parseInt(desktop) >= 8) return 'component-spacing-xl';
          if (parseInt(desktop) >= 6) return 'component-spacing-lg';
          if (parseInt(desktop) >= 4) return 'component-spacing-md';
          if (parseInt(desktop) >= 3) return 'component-spacing-sm';
          return 'component-spacing-xs';
        }
      }
    ];
    
    additionalMigrations.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
        changeCount += matches.length;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filePath}: ${changeCount} changes`);
      return changeCount;
    }
    
    return 0;
  } catch (error) {
    console.log(`❌ Error processing ${filePath}: ${error.message}`);
    return 0;
  }
}

function processDirectory(dirPath) {
  let totalChanges = 0;
  
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory() && shouldProcessDir(item.name)) {
        totalChanges += processDirectory(fullPath);
      } else if (item.isFile() && shouldProcessFile(fullPath)) {
        totalChanges += migrateSpacingInFile(fullPath);
      }
    });
  } catch (error) {
    console.log(`⚠️  Could not process directory ${dirPath}: ${error.message}`);
  }
  
  return totalChanges;
}

// Start migration
console.log('📁 Processing files...\n');

const srcDir = 'src';
const totalChanges = processDirectory(srcDir);

console.log(`\n🎉 Migration complete!`);
console.log(`📊 Total changes made: ${totalChanges}`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Review the changes in your components`);
console.log(`   2. Test the application to ensure visual consistency`);
console.log(`   3. Run 'npm run build' to verify no errors`);
console.log(`   4. Consider updating remaining manual spacing values`);

if (totalChanges === 0) {
  console.log(`\n✨ No spacing migrations needed - your code is already standardized!`);
}
