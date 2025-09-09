
# Deployment Guide

## Local Development

### Running on Localhost

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

### Environment Setup

Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Production Deployment Options

### Vercel (Recommended)

1. Import your GitHub repository
2. Configure environment variables in Vercel dashboard
3. Vercel automatically handles Next.js routing and optimization

### Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Environment Variables

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build Configuration

The project uses Next.js 15 with the following optimizations:
- App Router for file-based routing
- Automatic code splitting and optimization
- CSS optimization with TailwindCSS
- TypeScript type checking
- Image optimization

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
