
# Technical Documentation

## Application Architecture

The Kleaners application is built using a component-based architecture with React and TypeScript. It follows modern frontend development practices with a focus on modularity, reusability, and maintainability.

### Core Technologies

- **Frontend Framework**: React with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: 
  - Local state with React hooks
  - Server state with React Query
  - Global state with Zustand
- **Routing**: React Router v6
- **API Integration**: Supabase for backend services
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Not currently implemented

## Project Structure

The project follows a feature-based organization with the following main directories:

```
src/
├── components/      # UI components organized by domain
├── hooks/           # Custom React hooks
├── integrations/    # External service integrations
├── lib/             # Utility libraries and helpers
├── mocks/           # Mock data and MSW handlers
├── pages/           # Page components
├── schemas/         # Validation schemas
├── services/        # Business logic services
├── store/           # Global state management
├── types/           # TypeScript type definitions
└── utils/           # General utility functions
```

## State Management Strategy

The application uses a combination of state management approaches:

1. **Component State**: For UI-specific, ephemeral state
2. **React Query**: For server state, caching, and data fetching
3. **Zustand**: For global application state
4. **URL State**: For shareable, bookmarkable state

## Authentication Flow

The application uses Supabase Auth for authentication, which provides:

- Email/password authentication
- Magic link authentication
- Social login (not currently implemented)
- JWT-based session management

The authentication flow is managed across:
- `src/integrations/supabase/auth.ts`: Core auth functions
- `src/components/auth/`: Authentication UI components
- `src/pages/auth/`: Authentication pages
- `src/hooks/useAuthState.ts`: Custom hook for auth state management

## Import Path Management

This project uses the `@/` path alias for imports, which is configured in both the `vite.config.ts` and `tsconfig.json` files. This approach offers several benefits:

### Benefits of Path Aliases

1. **Simplified Imports**: No need for complex relative paths (`../../../../components/Button`)
2. **Easier Refactoring**: Moving files doesn't break import paths
3. **Better Readability**: Clear indication of where modules come from

### Configuration

The path alias is configured in:

1. **TypeScript Configuration**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. **Vite Configuration**:
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Deployment Considerations

When deploying to various platforms:

1. **Vercel/Netlify**: These platforms automatically handle path aliases based on the build configuration.

2. **Static Hosting**: The built JavaScript files will have resolved imports, so no additional configuration is needed.

3. **Custom Servers**: If using a custom build process, ensure both TypeScript and Vite configurations are properly set up.

### Troubleshooting Import Issues

If you encounter import errors during build or deployment:

1. Check that the path alias is properly configured in both `tsconfig.json` and `vite.config.ts`
2. Verify that all imports use the correct case (imports are case-sensitive)
3. Ensure the imported file exists at the specified path
4. For dynamic imports, use the `@` alias with string concatenation: `import(\`@/components/${componentName}\`)`

## External Deployment Considerations

To deploy this application outside of the lovable.dev platform, consider the following:

### 1. Base URL Configuration

The application uses a `<base href="/" />` tag in `index.html`. For deployments to non-root paths:

- Update this tag to match your deployment path
- Configure your hosting platform for proper SPA routing

### 2. Environment Variables

The following environment variables should be configured:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Mock Service Worker

The application uses MSW for API mocking in development. For production:

- It's properly disabled by default in production builds
- It can be explicitly enabled in production with `VITE_ENABLE_MOCK_API=true`
- If seeing "Failed to register ServiceWorker" errors in production, this is expected when MSW is disabled

### 4. SPA Routing

Configure your hosting platform to serve `index.html` for 404 errors to support client-side routing. See the Deployment Guide for platform-specific instructions.

### 5. Supabase Edge Functions

For Supabase Edge Functions, ensure:
- They're properly deployed to your Supabase instance
- CORS settings are configured for your domain in `_shared/cors.ts`

## Performance Considerations

The application includes several performance optimizations:

- Code splitting with React lazy loading
- Asset optimization in build configuration
- Tailwind purging for CSS size reduction
- React Query for efficient data fetching and caching

## Security Considerations

- Authentication is handled through Supabase Auth with JWT
- API keys are stored as environment variables
- XSS prevention through React's built-in protections
- CORS headers for Supabase Edge Functions
