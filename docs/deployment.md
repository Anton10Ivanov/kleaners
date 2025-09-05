
# Deployment Guide

## Lovable Platform Deployment

The easiest way to deploy is using the Lovable platform:

1. Click "Publish" in the Lovable editor
2. Your app will be available at `yourproject.lovable.app`
3. Configure custom domain in Project Settings if needed

## External Deployment Options

### Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in Netlify dashboard
4. Configure SPA redirects: `_redirects` file with `/* /index.html 200`

### Vercel

1. Import your GitHub repository
2. Configure environment variables
3. Vercel automatically handles SPA routing

### Environment Variables

Required environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build Configuration

The project uses Vite with the following optimizations:
- Path aliases with `@/` prefix
- Automatic code splitting
- CSS optimization with TailwindCSS
- TypeScript type checking

## Supabase Configuration

1. Create a Supabase project
2. Configure authentication providers
3. Set up database schema (see `src/integrations/supabase/types.ts`)
4. Deploy Edge Functions if needed

## Performance Considerations

- Enable compression (gzip/brotli) on your hosting platform
- Configure proper caching headers
- Use CDN for static assets
- Monitor Core Web Vitals

## Security

- Never commit environment variables
- Use Supabase RLS (Row Level Security) policies
- Configure CORS properly for your domain
- Keep dependencies updated
