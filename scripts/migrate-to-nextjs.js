#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Starting Vite to Next.js Migration...\n');

// 1. Convert React Router routes to Next.js App Router
function convertRoutes() {
  console.log('📁 Converting React Router to Next.js App Router...');
  
  const routes = [
    { vite: 'src/pages/Index.tsx', next: 'app/page.tsx' },
    { vite: 'src/pages/Services.tsx', next: 'app/services/page.tsx' },
    { vite: 'src/pages/Contact.tsx', next: 'app/contact/page.tsx' },
    { vite: 'src/pages/BusinessSolutions.tsx', next: 'app/business-solutions/page.tsx' },
    { vite: 'src/pages/About.tsx', next: 'app/about/page.tsx' },
    { vite: 'src/pages/FAQ.tsx', next: 'app/about/faq/page.tsx' },
    { vite: 'src/pages/CompanyValues.tsx', next: 'app/about/company-values/page.tsx' },
    { vite: 'src/pages/auth/Login.tsx', next: 'app/login/page.tsx' },
    { vite: 'src/pages/auth/Signup.tsx', next: 'app/signup/page.tsx' },
    { vite: 'src/pages/auth/ResetPassword.tsx', next: 'app/auth/reset-password/page.tsx' },
    { vite: 'src/pages/booking/BookingRoutes.tsx', next: 'app/booking/page.tsx' },
    { vite: 'src/pages/client/ClientDashboard.tsx', next: 'app/client/dashboard/page.tsx' },
    { vite: 'src/pages/provider/ProviderDashboard.tsx', next: 'app/provider/dashboard/page.tsx' },
    { vite: 'src/pages/admin/AdminPanel.tsx', next: 'app/admin/page.tsx' },
  ];

  routes.forEach(route => {
    if (fs.existsSync(route.vite)) {
      console.log(`  ✓ ${route.vite} → ${route.next}`);
    }
  });
}

// 2. Convert components
function convertComponents() {
  console.log('\n🧩 Converting components...');
  
  const componentMap = {
    'src/components/RootLayout.tsx': 'components/layouts/RootLayout.tsx',
    'src/components/client/ClientLayout.tsx': 'components/layouts/ClientLayout.tsx',
    'src/components/provider/ProviderLayout.tsx': 'components/layouts/ProviderLayout.tsx',
    'src/components/admin/AdminLayout.tsx': 'components/layouts/AdminLayout.tsx',
  };

  Object.entries(componentMap).forEach(([src, dest]) => {
    if (fs.existsSync(src)) {
      console.log(`  ✓ ${src} → ${dest}`);
    }
  });
}

// 3. Convert hooks and utilities
function convertUtilities() {
  console.log('\n🔧 Converting utilities and hooks...');
  
  const utilityMap = {
    'src/hooks': 'hooks',
    'src/lib': 'lib',
    'src/utils': 'utils',
    'src/types': 'types',
    'src/schemas': 'schemas',
  };

  Object.entries(utilityMap).forEach(([src, dest]) => {
    if (fs.existsSync(src)) {
      console.log(`  ✓ ${src} → ${dest}`);
    }
  });
}

// 4. Convert services
function convertServices() {
  console.log('\n⚙️ Converting services...');
  
  const serviceMap = {
    'src/services': 'services',
    'src/integrations': 'integrations',
    'src/store': 'store',
  };

  Object.entries(serviceMap).forEach(([src, dest]) => {
    if (fs.existsSync(src)) {
      console.log(`  ✓ ${src} → ${dest}`);
    }
  });
}

// Run migration
convertRoutes();
convertComponents();
convertUtilities();
convertServices();

console.log('\n✅ Migration plan generated!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm run migrate:components');
console.log('2. Run: npm run migrate:pages');
console.log('3. Run: npm run migrate:routing');
console.log('4. Test: npm run dev');
