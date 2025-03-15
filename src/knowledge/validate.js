
const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

// ANSI colors for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const logSuccess = (message) => console.log(`${colors.green}✓ ${message}${colors.reset}`);
const logWarning = (message) => console.log(`${colors.yellow}⚠ ${message}${colors.reset}`);
const logError = (message) => console.log(`${colors.red}✗ ${message}${colors.reset}`);
const logInfo = (message) => console.log(`${colors.blue}ℹ ${message}${colors.reset}`);
const logHeader = (message) => console.log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}`);

// Knowledge base files that should exist
const knowledgeFiles = [
  'README.md',
  'ProjectOverview.md',
  'ComponentGuide.md',
  'TechnicalDocumentation.md',
  'UIDesignSystem.md',
  'RolesAndResponsibilities.md',
  'DeploymentGuide.md'
];

// Start validation
(async function() {
  logHeader('KLEANERS KNOWLEDGE BASE VALIDATION');
  console.log('Validating that knowledge base is in sync with codebase...\n');
  
  // 1. Check if all knowledge base files exist
  logHeader('CHECKING KNOWLEDGE FILES');
  let filesExist = true;
  for (const file of knowledgeFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      logSuccess(`${file} exists`);
    } else {
      logError(`${file} is missing`);
      filesExist = false;
    }
  }
  
  if (!filesExist) {
    logError('Some knowledge files are missing. Please create them.');
  }
  
  // 2. Validate component structure against ComponentGuide.md
  logHeader('VALIDATING COMPONENT STRUCTURE');
  try {
    const componentGuide = await readFile(path.join(__dirname, 'ComponentGuide.md'), 'utf8');
    const componentFolders = await readdir(path.join(__dirname, '..', 'components'));
    
    // Check if documented component folders exist
    const mentionedFolders = componentGuide.match(/components\/([a-z-]+)/g);
    if (mentionedFolders) {
      const uniqueFolders = [...new Set(mentionedFolders.map(f => f.split('/')[1]))];
      
      for (const folder of uniqueFolders) {
        if (componentFolders.includes(folder)) {
          logSuccess(`Component folder "${folder}" exists`);
        } else {
          logWarning(`Component folder "${folder}" mentioned in docs but not found in codebase`);
        }
      }
    }
    
    // Check for components not documented
    for (const folder of componentFolders) {
      // Skip certain generic folders that might not need detailed docs
      if (['ui', 'layout'].includes(folder)) continue;
      
      if (!componentGuide.includes(`components/${folder}`)) {
        logWarning(`Component folder "${folder}" exists but not documented in ComponentGuide.md`);
      }
    }
  } catch (err) {
    logError(`Failed to validate component structure: ${err.message}`);
  }
  
  // 3. Validate routes against ProjectOverview.md
  logHeader('VALIDATING ROUTES');
  try {
    const projectOverview = await readFile(path.join(__dirname, 'ProjectOverview.md'), 'utf8');
    const appFile = await readFile(path.join(__dirname, '..', 'App.tsx'), 'utf8');
    
    // Extract routes from App.tsx
    const routeMatches = appFile.match(/<Route\s+path=["']([^"']+)["']/g);
    if (routeMatches) {
      const routes = routeMatches.map(r => {
        const match = r.match(/<Route\s+path=["']([^"']+)["']/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      let documentedRoutes = 0;
      for (const route of routes) {
        // Skip index and wildcard routes
        if (route === '*' || route === '/') continue;
        
        // Clean the route for searching
        const cleanRoute = route.replace(/:[^/]+/g, '').replace(/\*$/, '');
        if (projectOverview.includes(cleanRoute)) {
          logSuccess(`Route "${route}" is documented`);
          documentedRoutes++;
        } else {
          logWarning(`Route "${route}" not found in ProjectOverview.md`);
        }
      }
      
      if (documentedRoutes === 0) {
        logWarning('No routes are documented in ProjectOverview.md');
      }
    } else {
      logWarning('No routes found in App.tsx');
    }
  } catch (err) {
    logError(`Failed to validate routes: ${err.message}`);
  }
  
  // 4. Validate tech stack against TechnicalDocumentation.md
  logHeader('VALIDATING TECH STACK');
  try {
    const techDoc = await readFile(path.join(__dirname, 'TechnicalDocumentation.md'), 'utf8');
    const packageJson = require('../../package.json');
    
    const keyDependencies = [
      'react', 'react-dom', 'react-router-dom', '@tanstack/react-query',
      '@supabase/supabase-js', 'zod', 'react-hook-form'
    ];
    
    for (const dep of keyDependencies) {
      if (packageJson.dependencies[dep] && techDoc.includes(dep)) {
        logSuccess(`Dependency "${dep}" is documented`);
      } else if (packageJson.dependencies[dep]) {
        logWarning(`Dependency "${dep}" is not documented in TechnicalDocumentation.md`);
      }
    }
  } catch (err) {
    logError(`Failed to validate tech stack: ${err.message}`);
  }
  
  // 5. Check deployment configuration
  logHeader('VALIDATING DEPLOYMENT CONFIGURATION');
  try {
    const indexHtml = await readFile(path.join(__dirname, '../../index.html'), 'utf8');
    const baseTag = indexHtml.includes('<base href="/"');
    if (baseTag) {
      logSuccess('Base tag is configured in index.html');
    } else {
      logWarning('Base tag may not be properly configured in index.html');
    }
    
    // Check for hard-coded Supabase credentials
    const supabaseConfig = await readFile(path.join(__dirname, '../integrations/supabase/config.ts'), 'utf8');
    if (supabaseConfig.includes('import.meta.env')) {
      logSuccess('Supabase config uses environment variables');
    } else {
      logWarning('Supabase config may contain hard-coded credentials');
    }
    
    // Check vite config
    const rootViteConfig = fs.existsSync(path.join(__dirname, '../../vite.config.ts'));
    const srcViteConfig = fs.existsSync(path.join(__dirname, '../vite.config.ts'));
    
    if (rootViteConfig && srcViteConfig) {
      logWarning('Multiple vite.config.ts files found, may cause build issues');
    } else if (rootViteConfig) {
      logSuccess('Vite config is in root directory');
    } else if (srcViteConfig) {
      logWarning('Vite config is in src directory, should be in root');
    } else {
      logError('No vite.config.ts file found');
    }
    
    // Check for SPA fallback
    if (indexHtml.includes('SPA fallback')) {
      logSuccess('SPA fallback script is present in index.html');
    } else {
      logWarning('SPA fallback script may be missing from index.html');
    }
  } catch (err) {
    logError(`Failed to validate deployment configuration: ${err.message}`);
  }
  
  // 6. Check for MSW configuration
  logHeader('VALIDATING MSW CONFIGURATION');
  try {
    const mainFile = await readFile(path.join(__dirname, '../main.tsx'), 'utf8');
    
    if (mainFile.includes('startMockServiceWorker') && mainFile.includes('import.meta.env.DEV')) {
      logSuccess('MSW is only enabled in development environment');
    } else if (mainFile.includes('startMockServiceWorker')) {
      logWarning('MSW may be enabled in production environment');
    }
  } catch (err) {
    logError(`Failed to validate MSW configuration: ${err.message}`);
  }
  
  console.log('\n');
  logHeader('KNOWLEDGE BASE VALIDATION COMPLETE');
  console.log('Review any warnings or errors above and update documentation accordingly.');
})();
