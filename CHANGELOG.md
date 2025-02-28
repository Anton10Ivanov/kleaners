
# Changelog

All notable changes to the Kleaners application will be documented in this file.

## [0.3.0] - 2024-10-22

### Added
- Enhanced logging system with component-specific loggers
- Session and user tracking in logs
- Advanced error handling with error codes and HTTP status mapping
- Support for retry logic with exponential backoff
- Timeout handling for API requests

## [0.2.0] - 2024-10-20

### Added
- Comprehensive error handling system with typed errors
- Centralized logging utility with different log levels
- Enhanced Supabase client with error handling and helper methods
- Expanded TypeScript database type definitions

## [0.1.0] - 2024-10-15

### Added
- Initial application structure with React, TypeScript, and Vite
- UI framework implementation with Shadcn/UI and Tailwind CSS
- Global styling with custom color schemes and responsive design
- Dark/light mode toggle functionality
- Framer Motion animations for enhanced user experience

### Features
- **Homepage**
  - Hero section with call-to-action
  - Services overview with pricing cards
  - "Why Choose Us" section with animations
  - Testimonials section with customer reviews
  - Responsive footer with navigation links

- **Booking System**
  - Multi-step booking form
  - Service selection (Regular, Business, Move In/Out)
  - Date and time selection interface
  - Extras and add-ons selection
  - Form validation and error handling

- **Admin Dashboard**
  - Admin layout with navigation
  - Bookings management with filtering and sorting
  - Customers database with CRUD operations
  - Service providers management
  - Calendar overview for scheduling

- **User Dashboard**
  - User profile management
  - Booking history and status tracking
  - Account settings

- **Authentication**
  - Supabase integration for backend services
  - Login and signup forms
  - Protected routes for authenticated users

### Technical
- Supabase client configuration for database access
- TypeScript interface definitions for database tables
- React Router setup for navigation
- Responsive layouts for mobile and desktop devices

