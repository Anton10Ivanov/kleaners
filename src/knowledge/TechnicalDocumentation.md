
# Technical Documentation

## Authentication Flow

The application uses Supabase Auth for authentication with the following flows:

1. **Login**: Email/password authentication with option for reset
2. **Signup**: New user registration
3. **Password Reset**: Email-based reset flow
4. **Session Management**: Auth state tracking with protected routes

Authentication state is checked in layout components (ClientLayout, ProviderLayout, AdminLayout) to ensure users are redirected to login when necessary.

## State Management

The application uses a combination of approaches for state management:

1. **React Query**: For server state and data fetching
2. **Zustand**: For global client state
3. **React Context**: For specific feature contexts
4. **Local Component State**: For UI-specific state

## API Integration

### Supabase Integration

Supabase is used for:
- Authentication
- Database access
- Storage
- Realtime subscriptions

The integration is set up in `src/integrations/supabase/client.ts` and related files.

## Single Page App (SPA) Routing

React Router is used for client-side routing. The application includes a special SPA fallback script in `index.html` to handle deep linking and refreshes on deployed platforms.

### Route Structure

- Public routes under the root layout
- Protected client routes under `/client/*`
- Protected provider routes under `/provider/*`
- Protected admin routes under `/admin/*`

## Form Handling

The application uses React Hook Form for form management, with Zod for validation.

## Error Handling

Error handling is implemented using:
- React Error Boundary
- Try/catch blocks in API calls
- Toast notifications for user feedback
