#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Starting page migration from src-backup to app directory...\n');

// Source and destination directories
const srcBackupPagesDir = path.join(process.cwd(), 'src-backup', 'pages');
const appDir = path.join(process.cwd(), 'app');

// Ensure app directory exists
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
  console.log('✅ Created app directory');
}

// Function to convert page to Next.js App Router format
function convertPage(content, fileName) {
  let converted = content;
  
  // Add 'use client' directive for interactive pages
  if (content.includes('useState') || content.includes('useEffect') || content.includes('onClick')) {
    converted = "'use client'\n\n" + converted;
  }
  
  // Convert imports
  converted = converted
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
    .replace(/import { NavLink } from ['"]react-router-dom['"]/g, 
             "import Link from 'next/link'")
    .replace(/<NavLink/g, '<Link')
    .replace(/<\/NavLink>/g, '</Link>')
    .replace(/to=/g, 'href=')
    // Convert img tags to Next.js Image component
    .replace(/<img\s+src={([^}]+)}\s+alt={([^}]+)}([^>]*)>/g,
      '<Image src={$1} alt={$2}$3 width={500} height={300} />');
  
  // Add Image import if needed
  if (converted.includes('<Image')) {
    converted = converted.replace(/^import React/g, 
      "import React\nimport Image from 'next/image'");
  }
  
  // Convert to Next.js page component
  const componentName = path.basename(fileName, '.tsx');
  const pageName = componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  // Add metadata export for SEO
  if (!converted.includes('export const metadata')) {
    const metadataExport = `
export const metadata = {
  title: '${componentName} | Kleaners',
  description: 'Professional cleaning services - ${componentName}',
}
`;
    converted = converted.replace(/^export default/g, metadataExport + '\nexport default');
  }
  
  return converted;
}

// Function to create Next.js page structure
function createPageStructure(sourcePath, destPath) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const converted = convertPage(content, path.basename(sourcePath));
    
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.writeFileSync(destPath, converted);
    console.log(`✅ Migrated page: ${path.relative(process.cwd(), sourcePath)} → ${path.relative(process.cwd(), destPath)}`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to migrate page ${sourcePath}: ${error.message}`);
    return false;
  }
}

// Function to migrate pages recursively
function migratePages(sourceDir, destDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Source directory not found: ${sourceDir}`);
    return { migratedCount: 0, failedCount: 0 };
  }
  
  const items = fs.readdirSync(sourceDir);
  let migratedCount = 0;
  let failedCount = 0;
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (['node_modules', '.git', '.next', 'dist'].includes(item)) {
        continue;
      }
      
      // Create corresponding app directory structure
      const pageName = item.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
      const destPageDir = path.join(destDir, pageName);
      
      if (!fs.existsSync(destPageDir)) {
        fs.mkdirSync(destPageDir, { recursive: true });
      }
      
      // Migrate subdirectory
      const subResult = migratePages(sourcePath, destPageDir);
      migratedCount += subResult.migratedCount;
      failedCount += subResult.failedCount;
      
    } else if (item.endsWith('.tsx') && item !== 'index.tsx') {
      // Convert page component to Next.js format
      const pageName = path.basename(item, '.tsx').toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
      const destPath = path.join(destDir, pageName, 'page.tsx');
      
      if (createPageStructure(sourcePath, destPath)) {
        migratedCount++;
      } else {
        failedCount++;
      }
      
    } else if (item === 'index.tsx') {
      // Convert index page to page.tsx
      const destPath = path.join(destDir, 'page.tsx');
      
      if (createPageStructure(sourcePath, destPath)) {
        migratedCount++;
      } else {
        failedCount++;
      }
    }
  }
  
  return { migratedCount, failedCount };
}

// Main migration process
console.log('📁 Starting page migration...\n');

const result = migratePages(srcBackupPagesDir, appDir);

console.log('\n📊 Migration Summary:');
console.log(`✅ Successfully migrated: ${result.migratedCount} pages`);
console.log(`❌ Failed migrations: ${result.failedCount} pages`);

// Create special Next.js files
console.log('\n📝 Creating Next.js specific files...');

// Create not-found.tsx
const notFoundContent = `import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link 
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}`;

fs.writeFileSync(path.join(appDir, 'not-found.tsx'), notFoundContent);
console.log('✅ Created not-found.tsx');

// Create loading.tsx
const loadingContent = `export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  )
}`;

fs.writeFileSync(path.join(appDir, 'loading.tsx'), loadingContent);
console.log('✅ Created loading.tsx');

// Create error.tsx
const errorContent = `'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}`;

fs.writeFileSync(path.join(appDir, 'error.tsx'), errorContent);
console.log('✅ Created error.tsx');

console.log('\n🎉 Page migration completed!');
console.log('\nNext steps:');
console.log('1. Review migrated pages for any remaining issues');
console.log('2. Update routing logic to use Next.js navigation');
console.log('3. Test pages in the Next.js environment');
console.log('4. Run "npm run dev" to start the development server');
