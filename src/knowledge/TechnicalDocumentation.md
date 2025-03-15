
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

Currently, some of these are hardcoded in `src/integrations/supabase/config.ts` and should be updated for production deployments.

### 3. Mock Service Worker

The application uses MSW for API mocking in development. For production:

- Ensure it's properly disabled in production builds
- If seeing "Failed to register ServiceWorker" errors, you can safely ignore these in production

### 4. Vite Configuration

There are two vite.config.ts files:
- Root `/vite.config.ts`: Main configuration
- `src/vite.config.ts`: Contains duplicate settings

For external deployment, standardize to using only the root configuration file.

### 5. 404 Handling for SPA

Configure your hosting platform to serve `index.html` for 404 errors to support client-side routing.

### 6. Supabase Edge Functions

For Supabase Edge Functions (in `supabase/functions/`), ensure:
- They're properly deployed to your Supabase instance
- CORS settings are configured for your domain

## Performance Considerations

The application includes several performance optimizations:

- Code splitting with React lazy loading (not fully implemented)
- Asset optimization in build configuration
- Tailwind purging for CSS size reduction
- React Query for efficient data fetching and caching

## Security Considerations

- Authentication is handled through Supabase Auth with JWT
- API keys should be stored as environment variables
- XSS prevention through React's built-in protections
- CORS headers for Supabase Edge Functions
