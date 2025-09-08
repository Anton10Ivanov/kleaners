
# Component Guide

## Component Organization

Components in the Kleaners project are organized by functionality and domain:

### UI Components
Located in `src/components/ui`, these are shared UI elements based on shadcn/ui:
- Button
- Dialog
- Input
- Card
- etc.

### Layout Components
Located in `src/components/layout`, these define the structure of pages:
- Container
- Section
- Stack
- Grid
- Box

### Domain-Specific Components

#### Client Components
Located in `src/components/client`, these are used in the client dashboard:
- ClientLayout
- ClientSidebar
- ClientBottomNav

#### Provider Components
Located in `src/components/provider`, these are used in the provider dashboard:
- ProviderLayout
- TopNav
- ProviderBottomNav

#### Admin Components
Located in `src/components/admin`, these are used in the admin dashboard:
- AdminLayout
- AdminHeader
- Dashboard components

#### Auth Components
Located in `src/components/auth`, these handle user authentication:
- LoginForm
- SignupForm
- ResetPasswordForm

#### Booking Components
Located in `src/components/booking`, these handle the booking flow:
- BookingServiceSelector (main service selection)
- EnhancedHomeDetailsSection
- Various service-specific components
- Summary components (SummaryPill, SummaryDrawer)
- Shared components (AutoProgressiveWrapper, EnhancedProgressIndicator)

## Component Usage Guidelines

1. **Component Creation**: Create new files for each component, keeping them focused and small
2. **Props**: Use TypeScript interfaces to define component props
3. **State Management**: Use hooks for local state, React Query for server state
4. **Styling**: Use TailwindCSS for all styling
5. **Reusability**: Aim for reusable components with clear interfaces
