#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧩 Starting Complete Component Migration...\n');

// 1. Migrate HomePage and its dependencies
function migrateHomePage() {
  console.log('🏠 Migrating HomePage component...');
  
  const homePageSrc = 'src/components/home/HomePage.tsx';
  const homePageDest = 'components/home/HomePage.tsx';
  
  if (fs.existsSync(homePageSrc)) {
    try {
      // Read source file
      let content = fs.readFileSync(homePageSrc, 'utf8');
      
      // Convert imports to Next.js compatible
      content = content
        .replace(/import.*from.*react-router-dom.*/g, '')
        .replace(/import.*useLocation.*/g, '')
        .replace(/import.*useNavigate.*/g, '')
        .replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'")
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
      const destDir = path.dirname(homePageDest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Write converted file
      fs.writeFileSync(homePageDest, content);
      console.log(`  ✅ ${homePageSrc} → ${homePageDest}`);
    } catch (error) {
      console.log(`  ❌ Error migrating ${homePageSrc}: ${error.message}`);
    }
  }
}

// 2. Migrate all components from src/components
function migrateAllComponents() {
  console.log('\n🧩 Migrating all components...');
  
  const componentsDir = 'src/components';
  const destDir = 'components';
  
  if (fs.existsSync(componentsDir)) {
    try {
      // Copy entire components directory
      if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
      }
      fs.cpSync(componentsDir, destDir, { recursive: true });
      console.log(`  ✅ ${componentsDir} → ${destDir}/`);
      
      // Process all .tsx files to convert React Router to Next.js
      processDirectory(destDir);
    } catch (error) {
      console.log(`  ❌ Error migrating components: ${error.message}`);
    }
  }
}

// 3. Process directory recursively to convert React Router imports
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.isFile() && path.extname(fullPath) === '.tsx') {
      convertFileToNextJS(fullPath);
    }
  });
}

// 4. Convert individual file to Next.js
function convertFileToNextJS(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Convert React Router to Next.js
    const routerImports = content.match(/import.*from.*react-router-dom.*/g);
    if (routerImports) {
      content = content.replace(/import.*from.*react-router-dom.*/g, '');
      hasChanges = true;
    }
    
    // Convert Link imports
    if (content.includes("from 'react-router-dom'") && content.includes('Link')) {
      content = content.replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'");
      hasChanges = true;
    }
    
    // Convert other React Router imports
    content = content
      .replace(/import.*useLocation.*from.*react-router-dom.*/g, '')
      .replace(/import.*useNavigate.*from.*react-router-dom.*/g, '')
      .replace(/import.*useParams.*from.*react-router-dom.*/g, '')
      .replace(/import.*useSearchParams.*from.*react-router-dom.*/g, '')
      .replace(/import.*Outlet.*from.*react-router-dom.*/g, '')
      .replace(/import.*Routes.*from.*react-router-dom.*/g, '')
      .replace(/import.*Route.*from.*react-router-dom.*/g, '')
      .replace(/import.*Navigate.*from.*react-router-dom.*/g, '');
    
    // Convert React Router hooks to Next.js
    content = content
      .replace(/useLocation\(\)/g, 'useRouter()')
      .replace(/useNavigate\(\)/g, 'useRouter()')
      .replace(/useParams\(\)/g, 'useParams()')
      .replace(/useSearchParams\(\)/g, 'useSearchParams()')
      .replace(/navigate\(/g, 'router.push(')
      .replace(/location\.pathname/g, 'router.pathname')
      .replace(/location\.search/g, 'router.query')
      .replace(/<Outlet \/>/g, '{children}');
    
    // Add Next.js imports if needed
    if (content.includes('useRouter') && !content.includes("from 'next/navigation'")) {
      content = "import { useRouter } from 'next/navigation';\n" + content;
      hasChanges = true;
    }
    
    if (content.includes('useParams') && !content.includes("from 'next/navigation'")) {
      if (!content.includes("from 'next/navigation'")) {
        content = "import { useParams } from 'next/navigation';\n" + content;
      } else {
        content = content.replace(
          "import { useRouter } from 'next/navigation';",
          "import { useRouter, useParams } from 'next/navigation';"
        );
      }
      hasChanges = true;
    }
    
    if (content.includes('useSearchParams') && !content.includes("from 'next/navigation'")) {
      if (!content.includes("from 'next/navigation'")) {
        content = "import { useSearchParams } from 'next/navigation';\n" + content;
      } else {
        content = content.replace(
          "import { useRouter } from 'next/navigation';",
          "import { useRouter, useSearchParams } from 'next/navigation';"
        );
      }
      hasChanges = true;
    }
    
    if (content.includes('Link') && !content.includes("from 'next/link'")) {
      content = "import Link from 'next/link';\n" + content;
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Converted: ${path.relative('components', filePath)}`);
    }
  } catch (error) {
    console.log(`  ❌ Error converting ${filePath}: ${error.message}`);
  }
}

// 5. Migrate remaining pages
function migrateRemainingPages() {
  console.log('\n📄 Migrating remaining pages...');
  
  const pagesDir = 'src/pages';
  const destDir = 'app';
  
  if (fs.existsSync(pagesDir)) {
    const pages = [
      'About.tsx',
      'BusinessSolutions.tsx', 
      'FAQ.tsx',
      'CompanyValues.tsx'
    ];
    
    pages.forEach(page => {
      const srcPath = path.join(pagesDir, page);
      const destPath = path.join(destDir, page.toLowerCase().replace('.tsx', '/page.tsx'));
      
      if (fs.existsSync(srcPath)) {
        try {
          // Read source file
          let content = fs.readFileSync(srcPath, 'utf8');
          
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
          const destDirPath = path.dirname(destPath);
          if (!fs.existsSync(destDirPath)) {
            fs.mkdirSync(destDirPath, { recursive: true });
          }

          // Write converted file
          fs.writeFileSync(destPath, content);
          console.log(`  ✅ ${srcPath} → ${destPath}`);
        } catch (error) {
          console.log(`  ❌ Error migrating ${srcPath}: ${error.message}`);
        }
      }
    });
  }
}

// 6. Update app/page.tsx to use simple components
function updateHomePage() {
  console.log('\n🏠 Updating home page...');
  
  const homePageContent = `'use client'

import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/services-section'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  )
}`;

  fs.writeFileSync('app/page.tsx', homePageContent);
  console.log('  ✅ Updated app/page.tsx with simple components');
}

// Run migration
migrateHomePage();
migrateAllComponents();
migrateRemainingPages();
updateHomePage();

console.log('\n🎉 Complete Component Migration Finished!');
console.log('\n📋 Next steps:');
console.log('1. Test: npm run dev');
console.log('2. Check for any remaining import errors');
console.log('3. Migrate auth and booking pages if needed');
