#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📄 Migrating Remaining Pages...\n');

// 1. Migrate About pages
function migrateAboutPages() {
  console.log('📖 Migrating About pages...');
  
  const aboutPages = [
    {
      src: 'src/pages/About.tsx',
      dest: 'app/about/page.tsx'
    },
    {
      src: 'src/pages/FAQ.tsx',
      dest: 'app/about/faq/page.tsx'
    },
    {
      src: 'src/pages/CompanyValues.tsx',
      dest: 'app/about/company-values/page.tsx'
    }
  ];

  aboutPages.forEach(page => {
    if (fs.existsSync(page.src)) {
      try {
        // Read source file
        let content = fs.readFileSync(page.src, 'utf8');
        
        // Convert React Router to Next.js
        content = content
          .replace(/import.*from.*react-router-dom.*/g, '')
          .replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'")
          .replace(/import.*useLocation.*/g, '')
          .replace(/import.*useNavigate.*/g, '')
          .replace(/useLocation\(\)/g, 'useRouter()')
          .replace(/useNavigate\(\)/g, 'useRouter()')
          .replace(/navigate\(/g, 'router.push(')
          .replace(/location\.pathname/g, 'router.pathname');

        // Add Next.js imports
        if (content.includes('useRouter')) {
          content = "import { useRouter } from 'next/navigation';\n" + content;
        }
        if (content.includes('Link')) {
          content = "import Link from 'next/link';\n" + content;
        }

        // Ensure directory exists
        const destDir = path.dirname(page.dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Write converted file
        fs.writeFileSync(page.dest, content);
        console.log(`  ✅ ${page.src} → ${page.dest}`);
      } catch (error) {
        console.log(`  ❌ Error migrating ${page.src}: ${error.message}`);
      }
    } else {
      console.log(`  ⚠️  Source file not found: ${page.src}`);
    }
  });
}

// 2. Migrate Auth pages
function migrateAuthPages() {
  console.log('\n🔐 Migrating Auth pages...');
  
  const authPages = [
    {
      src: 'src/pages/auth/Login.tsx',
      dest: 'app/login/page.tsx'
    },
    {
      src: 'src/pages/auth/Signup.tsx',
      dest: 'app/signup/page.tsx'
    },
    {
      src: 'src/pages/auth/ResetPassword.tsx',
      dest: 'app/auth/reset-password/page.tsx'
    },
    {
      src: 'src/pages/auth/VerifyProvider.tsx',
      dest: 'app/auth/verify-provider/page.tsx'
    },
    {
      src: 'src/pages/auth/AuthCallback.tsx',
      dest: 'app/auth/callback/page.tsx'
    }
  ];

  authPages.forEach(page => {
    if (fs.existsSync(page.src)) {
      try {
        // Read source file
        let content = fs.readFileSync(page.src, 'utf8');
        
        // Convert React Router to Next.js
        content = content
          .replace(/import.*from.*react-router-dom.*/g, '')
          .replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'")
          .replace(/import.*useLocation.*/g, '')
          .replace(/import.*useNavigate.*/g, '')
          .replace(/useLocation\(\)/g, 'useRouter()')
          .replace(/useNavigate\(\)/g, 'useRouter()')
          .replace(/navigate\(/g, 'router.push(')
          .replace(/location\.pathname/g, 'router.pathname');

        // Add Next.js imports
        if (content.includes('useRouter')) {
          content = "import { useRouter } from 'next/navigation';\n" + content;
        }
        if (content.includes('Link')) {
          content = "import Link from 'next/link';\n" + content;
        }

        // Ensure directory exists
        const destDir = path.dirname(page.dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Write converted file
        fs.writeFileSync(page.dest, content);
        console.log(`  ✅ ${page.src} → ${page.dest}`);
      } catch (error) {
        console.log(`  ❌ Error migrating ${page.src}: ${error.message}`);
      }
    } else {
      console.log(`  ⚠️  Source file not found: ${page.src}`);
    }
  });
}

// 3. Migrate Dashboard pages
function migrateDashboardPages() {
  console.log('\n📊 Migrating Dashboard pages...');
  
  const dashboardPages = [
    {
      src: 'src/pages/client/ClientDashboard.tsx',
      dest: 'app/client/dashboard/page.tsx'
    },
    {
      src: 'src/pages/provider/ProviderDashboard.tsx',
      dest: 'app/provider/dashboard/page.tsx'
    },
    {
      src: 'src/pages/admin/AdminPanel.tsx',
      dest: 'app/admin/page.tsx'
    }
  ];

  dashboardPages.forEach(page => {
    if (fs.existsSync(page.src)) {
      try {
        // Read source file
        let content = fs.readFileSync(page.src, 'utf8');
        
        // Convert React Router to Next.js
        content = content
          .replace(/import.*from.*react-router-dom.*/g, '')
          .replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'")
          .replace(/import.*useLocation.*/g, '')
          .replace(/import.*useNavigate.*/g, '')
          .replace(/useLocation\(\)/g, 'useRouter()')
          .replace(/useNavigate\(\)/g, 'useRouter()')
          .replace(/navigate\(/g, 'router.push(')
          .replace(/location\.pathname/g, 'router.pathname');

        // Add Next.js imports
        if (content.includes('useRouter')) {
          content = "import { useRouter } from 'next/navigation';\n" + content;
        }
        if (content.includes('Link')) {
          content = "import Link from 'next/link';\n" + content;
        }

        // Ensure directory exists
        const destDir = path.dirname(page.dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Write converted file
        fs.writeFileSync(page.dest, content);
        console.log(`  ✅ ${page.src} → ${page.dest}`);
      } catch (error) {
        console.log(`  ❌ Error migrating ${page.src}: ${error.message}`);
      }
    } else {
      console.log(`  ⚠️  Source file not found: ${page.src}`);
    }
  });
}

// 4. Create 404 page
function create404Page() {
  console.log('\n🚫 Creating 404 page...');
  
  const notFoundContent = `'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}`;

  try {
    fs.writeFileSync('app/not-found.tsx', notFoundContent);
    console.log('  ✅ Created app/not-found.tsx');
  } catch (error) {
    console.log(`  ❌ Error creating 404 page: ${error.message}`);
  }
}

// Run migration
migrateAboutPages();
migrateAuthPages();
migrateDashboardPages();
create404Page();

console.log('\n🎉 Remaining Pages Migration Complete!');
console.log('\n📋 Next steps:');
console.log('1. Test: npm run dev');
console.log('2. Check all pages are accessible');
console.log('3. Migrate booking pages if needed');
