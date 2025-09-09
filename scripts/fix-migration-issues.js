#!/usr/bin/env node

/**
 * Vite to Next.js Migration Fix Script
 * 
 * This script helps fix the critical migration issues identified in the analysis.
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Vite to Next.js migration issues...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Kleaners Next.js Environment Variables
# Fill in your actual Supabase values

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG=true
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('⚠️  Please update the Supabase credentials in .env.local\n');
} else {
  console.log('✅ .env.local already exists\n');
}

// Check if critical components exist
const criticalFiles = [
  'components/navbar/Navbar.tsx',
  'components/Footer.tsx',
  'components/ui/toaster.tsx',
  'hooks/useAuth.ts'
];

console.log('🔍 Checking critical components...');
let missingFiles = [];

criticalFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing critical files:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
  console.log('\n⚠️  These files need to be created or restored from src-backup/');
} else {
  console.log('✅ All critical components exist\n');
}

// Check if providers are properly configured
const providersPath = path.join(process.cwd(), 'app/providers.tsx');
if (fs.existsSync(providersPath)) {
  const providersContent = fs.readFileSync(providersPath, 'utf8');
  if (providersContent.includes('SessionContextProvider') && providersContent.includes('QueryClientProvider')) {
    console.log('✅ Providers are properly configured');
  } else {
    console.log('⚠️  Providers need to be updated for proper Supabase and React Query integration');
  }
} else {
  console.log('❌ app/providers.tsx is missing');
}

console.log('\n🎯 Next steps:');
console.log('1. Update Supabase credentials in .env.local');
console.log('2. Run: npm run dev');
console.log('3. Test basic navigation and authentication');
console.log('4. Check console for any remaining errors');

console.log('\n📚 For detailed migration guide, see: docs/VITE_TO_NEXTJS_MIGRATION_ANALYSIS.md');
