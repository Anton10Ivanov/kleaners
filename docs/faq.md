
# Frequently Asked Questions

## Development

### Q: Why are components limited to 50 lines?
A: Smaller components are easier to test, debug, and maintain. They promote single responsibility and better reusability.

### Q: How do I handle errors in the application?
A: Use the standardized error utilities in `src/utils/errors/`. The system provides error boundaries, logging, and user-friendly notifications.

### Q: What's the mobile-first approach?
A: Write CSS for mobile devices first, then use responsive breakpoints (`md:`, `lg:`) to enhance for larger screens.

## Architecture

### Q: When should I use React Query vs Zustand?
A: Use React Query for server state (API calls, caching). Use Zustand for global client state (user preferences, UI state).

### Q: How do I add a new page/route?
A: 1. Create component in `src/pages/`, 2. Add route to `AppRoutes.tsx`, 3. Update navigation if needed.

## Deployment

### Q: How do I deploy outside of Lovable?
A: Connect to GitHub, then deploy to Netlify/Vercel. See the [Deployment Guide](./deployment.md) for details.

### Q: What environment variables do I need?
A: At minimum: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. See environment documentation for full list.

## Troubleshooting

### Q: Build fails with TypeScript errors
A: Check that all imports exist and prop interfaces match. The codebase enforces strict TypeScript rules.

### Q: Component not rendering on mobile
A: Verify responsive classes and touch target sizes (minimum 44px for interactive elements).

### Q: Authentication not working
A: Check Supabase configuration and ensure environment variables are set correctly.
