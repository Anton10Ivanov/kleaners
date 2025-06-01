
# Architecture Overview

## Application Structure

The Kleaners application follows a feature-based architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── booking/        # Booking-specific components
│   ├── navbar/         # Navigation components
│   └── ...
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── integrations/       # External service integrations
```

## Design Principles

### Mobile-First Development
- All components are designed for mobile first
- Touch targets minimum 44px
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

### Component Design
- Components should be under 50 lines when possible
- Single responsibility principle
- Consistent prop interfaces
- Proper TypeScript typing

### State Management
- Local state for UI components
- React Query for server state
- Zustand for global application state
- URL state for shareable data

## Key Patterns

### Error Handling
- Comprehensive error boundaries
- Standardized error utilities in `src/utils/errors/`
- Toast notifications for user feedback
- Development-friendly error logging

### Performance
- React.memo for expensive components
- Lazy loading for route-based code splitting
- Optimized re-renders with proper dependencies

### Authentication
- Supabase Auth integration
- Role-based access control
- Protected routes with proper redirects

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State**: React Query + Zustand
- **Routing**: React Router v6
- **Backend**: Supabase
- **Build**: Vite
