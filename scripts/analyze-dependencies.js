import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

// Common patterns for unused dependencies
const potentiallyUnused = [
  'mapbox-gl', // Only used if maps are implemented
  'embla-carousel-react', // Only used if carousels are implemented
  'react-resizable-panels', // Only used if resizable panels are implemented
  'vaul', // Only used if drawer components are implemented
  'input-otp', // Only used if OTP inputs are implemented
  'cmdk', // Only used if command palette is implemented
  'dompurify', // Only used if HTML sanitization is needed
  'msw', // Only used in development/testing
  'jsdom', // Only used in testing
  'react-error-boundary', // Check if actually used
  'recharts', // Only used if charts are implemented
  'sonner', // Check if toast notifications are used
  'tailwindcss-animate', // Check if animations are used
  'class-variance-authority', // Check if CVA is used
  'browserslist', // Usually not needed in runtime
  '@testing-library/jest-dom', // Only for testing
  '@testing-library/react', // Only for testing
  '@testing-library/user-event', // Only for testing
  '@vitest/ui', // Only for testing
  'vitest', // Only for testing
  '@types/dompurify', // Only for TypeScript
  '@types/react-slick', // Only for TypeScript
  '@tailwindcss/typography', // Check if typography plugin is used
  'autoprefixer', // Build tool
  'postcss', // Build tool
  'lovable-tagger' // Development tool
];

// Check if files exist that use these dependencies
function checkDependencyUsage(dependency) {
  const patterns = {
    'mapbox-gl': ['mapbox', 'Mapbox'],
    'embla-carousel-react': ['embla', 'Embla', 'carousel'],
    'react-resizable-panels': ['resizable', 'ResizablePanel'],
    'vaul': ['vaul', 'Drawer'],
    'input-otp': ['otp', 'OTP', 'InputOTP'],
    'cmdk': ['cmdk', 'Command'],
    'dompurify': ['dompurify', 'DOMPurify'],
    'msw': ['msw', 'MockServiceWorker'],
    'jsdom': ['jsdom', 'JSDOM'],
    'react-error-boundary': ['ErrorBoundary', 'error-boundary'],
    'recharts': ['recharts', 'Recharts', 'Chart'],
    'sonner': ['sonner', 'toast', 'Toast'],
    'tailwindcss-animate': ['animate-', 'animation'],
    'class-variance-authority': ['cva', 'class-variance-authority'],
    'browserslist': ['browserslist'],
    '@testing-library/jest-dom': ['@testing-library/jest-dom'],
    '@testing-library/react': ['@testing-library/react'],
    '@testing-library/user-event': ['@testing-library/user-event'],
    '@vitest/ui': ['@vitest/ui'],
    'vitest': ['vitest', 'describe', 'it', 'test'],
    '@types/dompurify': ['@types/dompurify'],
    '@types/react-slick': ['@types/react-slick'],
    '@tailwindcss/typography': ['@tailwindcss/typography', 'prose'],
    'autoprefixer': ['autoprefixer'],
    'postcss': ['postcss'],
    'lovable-tagger': ['lovable-tagger']
  };

  const searchPatterns = patterns[dependency] || [dependency];
  
  try {
    // Search in src directory
    const srcDir = path.join(__dirname, '../src');
    const files = getAllFiles(srcDir);
    
    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of searchPatterns) {
          if (content.includes(pattern)) {
            return true;
          }
        }
      }
    }
    
    // Check config files
    const configFiles = [
      'tailwind.config.ts',
      'postcss.config.js',
      'vite.config.ts',
      'tsconfig.json'
    ];
    
    for (const configFile of configFiles) {
      const configPath = path.join(__dirname, '..', configFile);
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf8');
        for (const pattern of searchPatterns) {
          if (content.includes(pattern)) {
            return true;
          }
        }
      }
    }
    
    return false;
  } catch (error) {
    console.warn(`Error checking ${dependency}:`, error.message);
    return true; // Assume it's used if we can't check
  }
}

function getAllFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Analyze dependencies
console.log('🔍 Analyzing dependencies...\n');

const unusedDependencies = [];
const usedDependencies = [];

for (const dependency of potentiallyUnused) {
  if (dependencies[dependency]) {
    const isUsed = checkDependencyUsage(dependency);
    if (isUsed) {
      usedDependencies.push(dependency);
      console.log(`✅ ${dependency} - USED`);
    } else {
      unusedDependencies.push(dependency);
      console.log(`❌ ${dependency} - UNUSED`);
    }
  }
}

console.log('\n📊 Analysis Results:');
console.log(`Total analyzed: ${potentiallyUnused.length}`);
console.log(`Used: ${usedDependencies.length}`);
console.log(`Unused: ${unusedDependencies.length}`);

if (unusedDependencies.length > 0) {
  console.log('\n🗑️  Potentially unused dependencies:');
  unusedDependencies.forEach(dep => {
    console.log(`  - ${dep}`);
  });
  
  console.log('\n💡 To remove unused dependencies, run:');
  console.log(`npm uninstall ${unusedDependencies.join(' ')}`);
} else {
  console.log('\n🎉 All analyzed dependencies are being used!');
}

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  totalAnalyzed: potentiallyUnused.length,
  used: usedDependencies,
  unused: unusedDependencies,
  recommendations: unusedDependencies.length > 0 ? [
    'Remove unused dependencies to reduce bundle size',
    'Consider moving dev-only dependencies to devDependencies',
    'Review if testing dependencies are needed in production build'
  ] : [
    'All dependencies appear to be in use',
    'Consider regular dependency audits',
    'Monitor bundle size for new dependencies'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../dependency-analysis-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n📄 Report saved to dependency-analysis-report.json');
