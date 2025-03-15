
// Knowledge Base Validation Script
// This script checks the knowledge base against the codebase to ensure consistency
// Run with: node src/knowledge/validate.js

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '../..');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const KNOWLEDGE_DIR = path.resolve(SRC_DIR, 'knowledge');

// ANSI color codes for terminal output
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${COLORS.blue}=== Kleaners Knowledge Base Validation ===${COLORS.reset}\n`);

// Function to read directory recursively
function readDirRecursive(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
        allFiles = readDirRecursive(filePath, allFiles);
      }
    } else {
      allFiles.push(filePath);
    }
  });
  
  return allFiles;
}

// Validate component structure
function validateComponents() {
  console.log(`${COLORS.cyan}Validating component structure...${COLORS.reset}`);
  
  const componentDirs = [
    'src/components/ui',
    'src/components/layout',
    'src/components/client',
    'src/components/provider',
    'src/components/admin',
    'src/components/auth',
    'src/components/booking'
  ];
  
  let missingDirs = 0;
  
  componentDirs.forEach(dir => {
    const fullPath = path.resolve(ROOT_DIR, dir);
    if (fs.existsSync(fullPath)) {
      console.log(`${COLORS.green}✓ ${dir} exists${COLORS.reset}`);
    } else {
      console.log(`${COLORS.red}✗ ${dir} is missing${COLORS.reset}`);
      missingDirs++;
    }
  });
  
  if (missingDirs === 0) {
    console.log(`${COLORS.green}All component directories verified!${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.yellow}${missingDirs} component directories missing!${COLORS.reset}\n`);
  }
}

// Validate routes
function validateRoutes() {
  console.log(`${COLORS.cyan}Validating routes...${COLORS.reset}`);
  
  const routesFile = path.resolve(ROOT_DIR, 'src/App.tsx');
  
  if (fs.existsSync(routesFile)) {
    const content = fs.readFileSync(routesFile, 'utf8');
    
    const routePatterns = [
      { pattern: /\/client/, name: 'Client routes' },
      { pattern: /\/provider/, name: 'Provider routes' },
      { pattern: /\/admin/, name: 'Admin routes' },
      { pattern: /\/login/, name: 'Auth routes' }
    ];
    
    routePatterns.forEach(({ pattern, name }) => {
      if (pattern.test(content)) {
        console.log(`${COLORS.green}✓ ${name} found${COLORS.reset}`);
      } else {
        console.log(`${COLORS.red}✗ ${name} missing${COLORS.reset}`);
      }
    });
  } else {
    console.log(`${COLORS.red}✗ Routes file not found!${COLORS.reset}`);
  }
  
  console.log('');
}

// Validate tech stack
function validateTechStack() {
  console.log(`${COLORS.cyan}Validating technology stack...${COLORS.reset}`);
  
  // We won't read package.json directly to avoid any modification
  // Instead, check for evidence of these technologies in the codebase
  
  const techEvidence = [
    { files: ['src/**/*.tsx', 'src/**/*.ts'], name: 'React & TypeScript' },
    { files: ['src/**/*.css', 'tailwind.config.ts'], name: 'TailwindCSS' },
    { files: ['src/components/ui/*.tsx'], name: 'ShadcnUI' },
    { files: ['src/**/*useQuery*', 'src/**/*useMutation*'], name: 'React Query' },
    { files: ['src/**/*zustand*', 'src/store/*.ts'], name: 'Zustand' },
    { files: ['src/integrations/supabase/**/*.ts'], name: 'Supabase' }
  ];
  
  const allFiles = readDirRecursive(SRC_DIR)
    .map(file => file.replace(ROOT_DIR + '/', ''));
  
  techEvidence.forEach(tech => {
    const patterns = Array.isArray(tech.files) ? tech.files : [tech.files];
    
    const matchingFiles = allFiles.filter(file => {
      return patterns.some(pattern => {
        const regexPattern = pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*');
        return new RegExp(regexPattern).test(file);
      });
    });
    
    if (matchingFiles.length > 0) {
      console.log(`${COLORS.green}✓ ${tech.name} evidence found${COLORS.reset}`);
    } else {
      console.log(`${COLORS.yellow}? ${tech.name} evidence not found${COLORS.reset}`);
    }
  });
  
  console.log('');
}

// Check knowledge base files
function checkKnowledgeFiles() {
  console.log(`${COLORS.cyan}Checking knowledge base files...${COLORS.reset}`);
  
  const requiredFiles = [
    'README.md',
    'ProjectOverview.md',
    'ComponentGuide.md',
    'TechnicalDocumentation.md',
    'UIDesignSystem.md',
    'RolesAndResponsibilities.md'
  ];
  
  const existingFiles = fs.readdirSync(KNOWLEDGE_DIR);
  
  requiredFiles.forEach(file => {
    if (existingFiles.includes(file)) {
      console.log(`${COLORS.green}✓ ${file} exists${COLORS.reset}`);
    } else {
      console.log(`${COLORS.red}✗ ${file} is missing${COLORS.reset}`);
    }
  });
  
  console.log('');
}

// Run validations
validateComponents();
validateRoutes();
validateTechStack();
checkKnowledgeFiles();

console.log(`${COLORS.blue}=== Validation Complete ===${COLORS.reset}`);
console.log(`${COLORS.cyan}Run this script regularly to ensure knowledge base consistency.${COLORS.reset}`);
console.log(`${COLORS.cyan}Last validated: ${new Date().toISOString()}${COLORS.reset}`);
