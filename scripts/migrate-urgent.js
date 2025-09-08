#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚨 Starting urgent migration of critical components...\n');

// Critical components that need immediate migration
const criticalComponents = [
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/RootLayout.tsx',
  'components/PageLayout.tsx',
  'components/ui/button.tsx',
  'components/ui/input.tsx',
  'components/ui/card.tsx',
  'components/ui/dialog.tsx',
  'components/ui/toaster.tsx',
  'components/forms/LoginForm.tsx',
  'components/forms/SignupForm.tsx',
  'components/forms/BookingForm.tsx',
];

// Critical pages that need immediate migration
const criticalPages = [
  'pages/Index.tsx',
  'pages/NotFound.tsx',
  'pages/Contact.tsx',
  'pages/Services.tsx',
  'pages/auth/Login.tsx',
  'pages/auth/Signup.tsx',
  'pages/booking/BookingForm.tsx',
];

// Function to convert critical components
function convertCriticalComponent(content, filePath) {
  let converted = content;
  
  // Add 'use client' directive for interactive components
  if (content.includes('useState') || content.includes('useEffect') || content.includes('onClick') || content.includes('onSubmit')) {
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
  
  return converted;
}

// Function to migrate critical components
function migrateCriticalComponents() {
  console.log('📦 Migrating critical components...\n');
  
  let migratedCount = 0;
  let failedCount = 0;
  
  for (const componentPath of criticalComponents) {
    const sourcePath = path.join(process.cwd(), 'src-backup', componentPath);
    const destPath = path.join(process.cwd(), componentPath);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Source not found: ${sourcePath}`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(sourcePath, 'utf8');
      const converted = convertCriticalComponent(content, componentPath);
      
      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      fs.writeFileSync(destPath, converted);
      console.log(`✅ Migrated: ${componentPath}`);
      migratedCount++;
    } catch (error) {
      console.log(`❌ Failed to migrate ${componentPath}: ${error.message}`);
      failedCount++;
    }
  }
  
  return { migratedCount, failedCount };
}

// Function to migrate critical pages
function migrateCriticalPages() {
  console.log('📄 Migrating critical pages...\n');
  
  let migratedCount = 0;
  let failedCount = 0;
  
  for (const pagePath of criticalPages) {
    const sourcePath = path.join(process.cwd(), 'src-backup', pagePath);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Source not found: ${sourcePath}`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(sourcePath, 'utf8');
      const converted = convertCriticalComponent(content, pagePath);
      
      // Determine destination path based on page structure
      let destPath;
      if (pagePath === 'pages/Index.tsx') {
        destPath = path.join(process.cwd(), 'app', 'page.tsx');
      } else if (pagePath === 'pages/NotFound.tsx') {
        destPath = path.join(process.cwd(), 'app', 'not-found.tsx');
      } else if (pagePath.startsWith('pages/auth/')) {
        const pageName = path.basename(pagePath, '.tsx').toLowerCase();
        destPath = path.join(process.cwd(), 'app', 'auth', pageName, 'page.tsx');
      } else if (pagePath.startsWith('pages/booking/')) {
        const pageName = path.basename(pagePath, '.tsx').toLowerCase();
        destPath = path.join(process.cwd(), 'app', 'booking', pageName, 'page.tsx');
      } else {
        const pageName = path.basename(pagePath, '.tsx').toLowerCase();
        destPath = path.join(process.cwd(), 'app', pageName, 'page.tsx');
      }
      
      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      fs.writeFileSync(destPath, converted);
      console.log(`✅ Migrated: ${pagePath} → ${path.relative(process.cwd(), destPath)}`);
      migratedCount++;
    } catch (error) {
      console.log(`❌ Failed to migrate ${pagePath}: ${error.message}`);
      failedCount++;
    }
  }
  
  return { migratedCount, failedCount };
}

// Function to create essential Next.js files
function createEssentialFiles() {
  console.log('📝 Creating essential Next.js files...\n');
  
  // Create middleware.ts
  const middlewareContent = `import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  // Add any middleware logic here
  
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}`;
  
  fs.writeFileSync(path.join(process.cwd(), 'middleware.ts'), middlewareContent);
  console.log('✅ Created middleware.ts');
  
  // Create next-env.d.ts
  const nextEnvContent = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.`;
  
  fs.writeFileSync(path.join(process.cwd(), 'next-env.d.ts'), nextEnvContent);
  console.log('✅ Created next-env.d.ts');
}

// Main migration process
console.log('🚨 Starting urgent migration...\n');

// Migrate critical components
const componentResult = migrateCriticalComponents();

// Migrate critical pages
const pageResult = migrateCriticalPages();

// Create essential files
createEssentialFiles();

console.log('\n📊 Urgent Migration Summary:');
console.log(`✅ Components migrated: ${componentResult.migratedCount}`);
console.log(`❌ Component failures: ${componentResult.failedCount}`);
console.log(`✅ Pages migrated: ${pageResult.migratedCount}`);
console.log(`❌ Page failures: ${pageResult.failedCount}`);

console.log('\n🎉 Urgent migration completed!');
console.log('\nNext steps:');
console.log('1. Run "npm run dev" to test the migrated components');
console.log('2. Check for any TypeScript errors with "npm run type-check"');
console.log('3. Fix any remaining import or routing issues');
console.log('4. Test critical user flows (login, signup, booking)');
console.log('5. Run the full migration scripts for remaining components');