
// This script runs after the build process to execute react-snap
const reactSnap = require('react-snap');

const run = async () => {
  const options = {
    // Configuration options for react-snap
    inlineCss: true,
    source: 'dist',
    destination: 'dist',
    minifyHtml: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
      sortClassName: true
    },
    // Ensure React Hooks work properly
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    // Handle dynamic routes
    include: ['/'], // Add all your routes that need pre-rendering
    // Skip service worker registration during prerendering
    skipThirdPartyRequests: false,
    // Fix for SPAs with client-side routing
    fixWebpackChunksIssue: false,
    // Use these options to debug if needed
    // headless: false,
    // puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  };

  try {
    await reactSnap.run(options);
    console.log('✅ Successfully generated static HTML files with react-snap');
  } catch (error) {
    console.error('❌ Error generating static HTML files:', error);
    process.exit(1);
  }
};

run();
