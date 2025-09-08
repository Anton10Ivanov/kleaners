
# Deployment Guide

This guide provides detailed instructions for deploying the Kleaners application to various hosting environments outside of the lovable.dev platform.

## Pre-Deployment Checklist

Before deploying, ensure the following:

1. **Environment Variables**: Create a `.env` file with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Base URL Configuration**: The application uses a `<base href="/" />` tag in `index.html`. For deployments to non-root paths:
   - Update this base tag to match your deployment path (e.g., `<base href="/my-app/" />` for a /my-app/ subdirectory)
   - Make sure your server is configured to handle deep linking for SPA routes

3. **Build Configuration**: Use the root `vite.config.ts` file for your production build

## Build Process

To build the application for production with static pre-rendering:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Run react-snap to pre-render pages to static HTML
node src/utils/seo/postBuildScript.js

# Preview the production build locally
npm run preview
```

The build output will be in the `dist` directory, with pre-rendered HTML files for improved SEO.

## Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build && node src/utils/seo/postBuildScript.js`
   - Publish directory: `dist`
3. Add environment variables in the Netlify dashboard
4. Configure SPA routing by creating a `netlify.toml` file in your project root:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Vercel

1. Import your GitHub repository to Vercel
2. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build && node src/utils/seo/postBuildScript.js`
   - Output directory: `dist`
3. Add environment variables in the Vercel dashboard
4. Vercel handles SPA routing automatically, but you can also create a `vercel.json` file for custom configuration:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### GitHub Pages

1. Configure your project for GitHub Pages:
   ```bash
   # Add gh-pages package
   npm install --save-dev gh-pages
   
   # Add deploy script to package.json
   # "deploy": "npm run build && node src/utils/seo/postBuildScript.js && gh-pages -d dist"
   ```
2. Create a custom 404.html that redirects to index.html
3. Use the `gh-pages` branch for hosting
4. For SPA support with GitHub Pages, create a `404.html` file in your `public` folder with this content:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <title>Redirecting...</title>
     <script>
       // Single Page Apps for GitHub Pages
       // https://github.com/rafgraph/spa-github-pages
       (function(l) {
         if (l.search[1] === '/' ) {
           var decoded = l.search.slice(1).split('&').map(function(s) { 
             return s.replace(/~and~/g, '&')
           }).join('?');
           window.history.replaceState(null, null,
               l.pathname.slice(0, -1) + decoded + l.hash
           );
         }
       }(window.location))
       
       // Redirect to the home page
       window.location.href = '/';
     </script>
   </head>
   <body>
     Redirecting...
   </body>
   </html>
   ```

### Apache

1. Configure `.htaccess` file in your `dist` directory:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Nginx

1. Configure your Nginx server block:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       root /path/to/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## SEO Benefits of Static Pre-rendering

The application now uses react-snap to pre-render pages to static HTML, which provides several SEO benefits:

1. **Improved Crawlability**: Search engines can now see the full content of your pages without executing JavaScript
2. **Faster Initial Load**: Users see content immediately, improving Core Web Vitals metrics
3. **Better Indexing**: Pre-rendered content is more reliably indexed by search engines
4. **Social Media Sharing**: Open Graph tags are properly read when pages are shared on social platforms

### React-Snap Configuration

The pre-rendering process is configured in `src/utils/seo/postBuildScript.js`. You can customize the following options:

- **Routes to Pre-render**: Add additional routes to the `include` array
- **Minification**: Adjust HTML minification settings
- **Third-party Requests**: Enable/disable skipping third-party requests during pre-rendering
- **Debugging**: Uncomment headless/puppeteerArgs options for debugging

## Supabase Edge Functions

If your application uses Supabase Edge Functions:

1. Deploy the functions to your Supabase instance:
   ```bash
   supabase functions deploy
   ```

2. Update CORS settings for your domain:
   ```typescript
   // in _shared/cors.ts
   export const corsHeaders = {
     'Access-Control-Allow-Origin': 'https://your-domain.com',
     'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
   };
   ```

## Post-Deployment Verification

After deploying:

1. Test authentication flows
2. Verify API integrations
3. Test client-side routing
4. Check for console errors related to MSW or other development tools
5. Verify that environment variables are properly loaded
6. Check if pre-rendered pages are correctly indexed by search engines (use Google Search Console)
7. Verify social sharing by testing Open Graph tags with Facebook/Twitter validators

## Troubleshooting

### Common Issues

1. **Routing Issues**: If routes outside the home page return 404, configure your server for SPA routing.

2. **API Connection Errors**: Verify your Supabase URL and API key.

3. **Missing Assets**: Ensure all assets are properly referenced with relative paths.

4. **Environment Variables**: Make sure environment variables are properly set and accessed with `import.meta.env.VARIABLE_NAME`.

5. **CORS Issues**: Check that Supabase functions have proper CORS configuration for your domain.

6. **Pre-rendering Failures**: If react-snap fails, check for:
   - Network requests that fail during pre-rendering
   - Dynamic content that relies on window/document before mount
   - Ensure puppeteer has necessary permissions in CI/CD environments

### Debugging Tips

1. Check browser console for errors
2. Verify network requests in the browser developer tools
3. Test API endpoints directly to isolate front-end vs back-end issues
4. Review build logs for compilation errors
5. Use "View Source" in the browser to confirm pages are properly pre-rendered
