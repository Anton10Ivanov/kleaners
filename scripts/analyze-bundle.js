import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Analyze bundle size and chunks
function analyzeBundle() {
  const distDir = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distDir)) {
    console.log('❌ Dist folder not found. Please run "npm run build" first.');
    return;
  }

  console.log('📊 Analyzing bundle size...\n');

  // Get all files in dist
  const files = getAllFiles(distDir);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  const assetFiles = files.filter(file => 
    file.endsWith('.png') || 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg') || 
    file.endsWith('.gif') || 
    file.endsWith('.svg') || 
    file.endsWith('.ico')
  );

  // Analyze JavaScript files
  const jsAnalysis = jsFiles.map(file => {
    const stats = fs.statSync(file);
    const size = stats.size;
    const relativePath = path.relative(distDir, file);
    
    return {
      file: relativePath,
      size: size,
      sizeKB: Math.round(size / 1024 * 100) / 100,
      sizeMB: Math.round(size / (1024 * 1024) * 100) / 100
    };
  }).sort((a, b) => b.size - a.size);

  // Analyze CSS files
  const cssAnalysis = cssFiles.map(file => {
    const stats = fs.statSync(file);
    const size = stats.size;
    const relativePath = path.relative(distDir, file);
    
    return {
      file: relativePath,
      size: size,
      sizeKB: Math.round(size / 1024 * 100) / 100
    };
  }).sort((a, b) => b.size - a.size);

  // Analyze assets
  const assetAnalysis = assetFiles.map(file => {
    const stats = fs.statSync(file);
    const size = stats.size;
    const relativePath = path.relative(distDir, file);
    
    return {
      file: relativePath,
      size: size,
      sizeKB: Math.round(size / 1024 * 100) / 100
    };
  }).sort((a, b) => b.size - a.size);

  // Calculate totals
  const totalJSSize = jsAnalysis.reduce((sum, file) => sum + file.size, 0);
  const totalCSSSize = cssAnalysis.reduce((sum, file) => sum + file.size, 0);
  const totalAssetSize = assetAnalysis.reduce((sum, file) => sum + file.size, 0);
  const totalSize = totalJSSize + totalCSSSize + totalAssetSize;

  // Display results
  console.log('📦 JavaScript Files:');
  console.log('==================');
  jsAnalysis.forEach(file => {
    const sizeStr = file.sizeMB > 1 ? `${file.sizeMB}MB` : `${file.sizeKB}KB`;
    console.log(`${file.file.padEnd(50)} ${sizeStr}`);
  });

  console.log('\n🎨 CSS Files:');
  console.log('=============');
  cssAnalysis.forEach(file => {
    console.log(`${file.file.padEnd(50)} ${file.sizeKB}KB`);
  });

  console.log('\n🖼️  Assets:');
  console.log('===========');
  assetAnalysis.slice(0, 10).forEach(file => { // Show top 10 largest assets
    console.log(`${file.file.padEnd(50)} ${file.sizeKB}KB`);
  });

  console.log('\n📊 Summary:');
  console.log('============');
  console.log(`Total JavaScript: ${Math.round(totalJSSize / (1024 * 1024) * 100) / 100}MB`);
  console.log(`Total CSS: ${Math.round(totalCSSSize / 1024 * 100) / 100}KB`);
  console.log(`Total Assets: ${Math.round(totalAssetSize / (1024 * 1024) * 100) / 100}MB`);
  console.log(`Total Bundle: ${Math.round(totalSize / (1024 * 1024) * 100) / 100}MB`);

  // Identify large chunks
  const largeChunks = jsAnalysis.filter(file => file.sizeMB > 0.5);
  if (largeChunks.length > 0) {
    console.log('\n⚠️  Large Chunks (>500KB):');
    console.log('==========================');
    largeChunks.forEach(file => {
      console.log(`${file.file}: ${file.sizeMB}MB`);
    });
  }

  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('===================');
  
  if (totalSize > 2 * 1024 * 1024) { // > 2MB
    console.log('• Bundle size is large. Consider further code splitting.');
  }
  
  if (largeChunks.length > 0) {
    console.log('• Large chunks detected. Consider splitting them further.');
  }
  
  if (jsAnalysis.length > 20) {
    console.log('• Many JavaScript files. Consider consolidating small chunks.');
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalJSSize: totalJSSize,
      totalCSSSize: totalCSSSize,
      totalAssetSize: totalAssetSize,
      totalSize: totalSize,
      jsFileCount: jsAnalysis.length,
      cssFileCount: cssAnalysis.length,
      assetFileCount: assetAnalysis.length
    },
    jsFiles: jsAnalysis,
    cssFiles: cssAnalysis,
    assets: assetAnalysis,
    largeChunks: largeChunks,
    recommendations: [
      totalSize > 2 * 1024 * 1024 ? 'Bundle size is large. Consider further code splitting.' : null,
      largeChunks.length > 0 ? 'Large chunks detected. Consider splitting them further.' : null,
      jsAnalysis.length > 20 ? 'Many JavaScript files. Consider consolidating small chunks.' : null
    ].filter(Boolean)
  };

  fs.writeFileSync(
    path.join(__dirname, '../bundle-analysis-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Detailed report saved to bundle-analysis-report.json');
}

function getAllFiles(dir) {
  const files = [];
  
  try {
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
  } catch (error) {
    console.warn(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Run analysis
analyzeBundle();
