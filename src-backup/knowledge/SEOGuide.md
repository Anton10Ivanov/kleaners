
# SEO Guide for Kleaners Application

## Overview

This guide provides best practices for Search Engine Optimization (SEO) for the Kleaners application, which uses react-snap for pre-rendering HTML content to improve search engine visibility.

## Current SEO Implementation

The Kleaners application uses the following SEO techniques:

1. **Static HTML Pre-rendering**: Using react-snap to generate static HTML files from React components
2. **Meta Tag Management**: Comprehensive meta tags in index.html
3. **Semantic HTML Structure**: Proper heading hierarchy and semantic elements
4. **Hydration**: Proper client-side hydration for interactive elements

## Pre-rendering with React-Snap

The application uses react-snap to create static HTML versions of pages:

- Pre-rendering happens after the build process via `postBuildScript.js`
- Generated HTML files contain all content needed by search engines
- Client-side JavaScript hydrates the static HTML when loaded

### How It Works

1. Build creates a production bundle with `npm run build`
2. The post-build script runs react-snap: `node src/utils/seo/postBuildScript.js`
3. react-snap crawls the site and generates static HTML files
4. The hydration process in `main.tsx` ensures interactive elements work

## SEO Best Practices

### Meta Tags

Ensure each page has appropriate meta tags:

```html
<title>Page-specific title - Kleaners</title>
<meta name="description" content="Clear, compelling description" />
<meta name="keywords" content="relevant, comma-separated, keywords" />
```

### Open Graph Tags

Include Open Graph tags for better social media sharing:

```html
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="/path-to-image.jpg" />
<meta property="og:url" content="https://yourdomain.com/page-path" />
<meta property="og:type" content="website" />
```

### Semantic HTML

- Use proper heading hierarchy (h1, h2, h3)
- Use semantic elements (article, section, nav)
- Include alt text for all images
- Implement structured data (JSON-LD) for rich snippets

### URL Structure

- Use clean, descriptive URLs
- Include keywords in URLs where natural
- Maintain consistent URL patterns

### Performance Optimization

- Optimize images with proper formats and compression
- Implement lazy loading for images
- Minimize CSS and JavaScript
- Use responsive images with srcset

### Content Best Practices

- Write unique, valuable content for each page
- Include target keywords naturally in:
  - Headings
  - Introduction
  - Body text
  - Image alt tags
- Regularly update content to maintain freshness

## Monitoring SEO Performance

1. Set up Google Search Console and Bing Webmaster Tools
2. Submit a sitemap.xml file
3. Monitor core web vitals in Search Console
4. Track keyword rankings with SEO tools

## Technical SEO Checklist

- [ ] Create and submit a sitemap.xml
- [ ] Implement a robots.txt file
- [ ] Set up canonical URLs
- [ ] Use HTTPS for all pages
- [ ] Ensure mobile friendliness
- [ ] Implement schema markup for services
- [ ] Fix broken links and crawl errors
- [ ] Optimize page load speed

## SEO for Specific Page Types

### Home Page
- Focus on primary services and location
- Include trust indicators and reviews
- Use a clear call-to-action

### Service Pages
- Detailed description of each service
- Include service-specific keywords
- Address common customer questions

### Contact Page
- Include complete business information
- Add schema markup for local business
- Display service areas and hours

## Future SEO Enhancements

1. Implement dynamic meta tags based on page content
2. Add structured data for cleaning services
3. Create a blog section for content marketing
4. Develop location-specific landing pages

## Testing SEO Implementation

Use these tools to test your SEO implementation:
- Google's Rich Results Test
- Mobile-Friendly Test
- PageSpeed Insights
- Structured Data Testing Tool
