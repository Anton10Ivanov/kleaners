# Kleaners - Professional Cleaning Services Platform

## Project Overview
**Kleaners** is a comprehensive cleaning services marketplace built with React, TypeScript, and Supabase. The platform connects customers with professional cleaning service providers across multiple service categories.

## Core Architecture & Technology Stack

### Frontend Technology
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.11 with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Routing**: React Router DOM 6.26.2
- **State Management**: Zustand 5.0.3
- **Forms**: React Hook Form 7.53.0 with Zod validation
- **Animations**: Framer Motion 12.4.7 + Tailwind CSS Animate

### Backend & Database
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **API Client**: @supabase/supabase-js 2.48.1
- **Data Fetching**: TanStack React Query 5.56.2

### Design System
- **Primary Color**: Prussian Blue (#003049) - Headers, navigation, borders
- **Accent Color**: Laser Lime (#00FF87) - CTAs, key actions
- **Text Colors**: Titanium Text (#2B2D42) - Body text
- **Background**: Surgical White (#FFFFFF)
- **Typography**: Inter font family with design system scale
- **Responsive**: Mobile-first approach with unified container system

## User Roles & Permissions

### 1. **Customers/Clients** (`/client/*`)
- Browse and book cleaning services
- Manage bookings and schedules
- View invoices and payment history
- Communicate with service providers
- Rate and review services

### 2. **Service Providers** (`/provider/*`)
- Create and manage professional profiles
- Set availability and service areas
- Accept/decline booking requests
- Track earnings and performance
- Communicate with customers

### 3. **System Administrators** (`/admin/*`)
- Verify and manage service providers
- Monitor platform analytics and metrics
- Handle customer support and disputes
- Manage system settings and configurations
- Access comprehensive reporting tools

## Service Categories (32+ Services)

### Residential Services
- **Home Cleaning**: Regular house cleaning and maintenance
- **Deep Cleaning**: Comprehensive intensive cleaning
- **Move-In/Out Cleaning**: Specialized transition cleaning
- **Window Cleaning**: Interior and exterior windows
- **Carpet Cleaning**: Professional carpet and rug care
- **Upholstery Cleaning**: Furniture and fabric cleaning
- **Pet Hair Removal**: Specialized pet-related cleaning

### Commercial Services
- **Office Cleaning**: Workplace and business cleaning
- **Medical Practice Cleaning**: Healthcare facility sanitation
- **Kindergarten Cleaning**: Educational facility cleaning
- **Industrial Cleaning**: Manufacturing and warehouse cleaning
- **Care Facility Cleaning**: Healthcare and elderly care cleaning

### Specialized Services
- **Construction Cleaning**: Post-construction cleanup
- **Disinfection Cleaning**: Sanitization and disinfection
- **Crime Scene Cleaning**: Trauma and biohazard cleanup
- **Mold Removal**: Mold remediation and prevention
- **Hoarder Cleaning**: Extreme cleaning situations

### Maintenance Services
- **Facade Cleaning**: Building exterior cleaning
- **Roof Cleaning**: Professional roof maintenance
- **Graffiti Removal**: Vandalism cleanup
- **Pipe Cleaning**: Drainage and plumbing cleaning
- **Stone Surface Cleaning**: Natural stone maintenance

## Key Features & Functionality

### Booking System
- **Multi-step Booking Flow**: Service selection → Date/time → Personal info → Confirmation
- **Smart Scheduling**: Calendar integration with availability checking
- **Service Customization**: Add-ons, special requirements, and preferences
- **Pricing Calculator**: Dynamic pricing based on service type, size, and extras
- **Mobile-Responsive**: Optimized booking experience across devices

### Payment & Billing
- **Invoice Management**: Automated invoice generation and tracking
- **Payment Processing**: Secure payment handling (integration ready)
- **Promo Codes**: Discount and promotional code system
- **Billing History**: Complete transaction records

### Communication System
- **Messaging**: Real-time messaging between users
- **Notifications**: System notifications for bookings, updates, and reminders
- **Customer Support**: FAQ system and contact forms

### Admin Dashboard
- **Analytics**: Booking trends, revenue metrics, and performance tracking
- **User Management**: Customer and provider account administration
- **Provider Verification**: Application review and approval process
- **Booking Pool**: Pending bookings and assignment management

## Mobile-First Design Philosophy

### Responsive Framework
- **UnifiedContainer**: Consistent spacing and responsive behavior
- **Mobile Optimizations**: Touch-friendly interfaces and interactions
- **Performance**: Fast loading with lazy loading and code splitting
- **Accessibility**: WCAG compliant with proper ARIA labels

### Layout System
- **Unified Spacing**: Design token-based spacing system
- **Component Library**: Reusable UI components with variants
- **Animation System**: Smooth transitions and micro-interactions
- **Dark Mode Ready**: Color system supports theme switching

## Development Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── layout/             # Layout components and containers
│   ├── booking/            # Booking flow components
│   ├── admin/              # Admin panel components
│   ├── client/             # Customer dashboard components
│   ├── provider/           # Provider dashboard components
│   └── auth/               # Authentication components
├── pages/                  # Route components
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── styles/                 # CSS modules and global styles
└── integrations/           # External service integrations
```

### State Management
- **Zustand Stores**: Global state for user authentication, bookings, and app data
- **React Query Cache**: Server state management and caching
- **Form State**: React Hook Form for complex form handling
- **Local Storage**: Persistent user preferences and session data

### Code Quality & Standards
- **TypeScript**: Full type safety with strict configuration
- **ESLint**: Code linting with React and TypeScript rules
- **Component Naming**: Descriptive, domain-relevant component names
- **File Organization**: Feature-based organization with clear separation of concerns

## Security & Performance

### Authentication & Authorization
- **Supabase Auth**: Email/password and social login options
- **Row Level Security**: Database-level access control
- **Role-Based Access**: User type-specific permissions and routes
- **Session Management**: Secure token handling and refresh

### Performance Optimizations
- **Code Splitting**: Lazy loading for route components
- **Image Optimization**: Responsive images with proper loading
- **Bundle Optimization**: Tree shaking and chunk optimization
- **Caching Strategy**: React Query for API caching

## Deployment & Infrastructure

### Production Setup
- **Static Site Generation**: Optimized build for fast loading
- **SPA Routing**: Proper server configuration for client-side routing
- **Environment Configuration**: Separate development and production environments
- **Error Boundaries**: Graceful error handling and user feedback

### Development Environment
- **Hot Module Replacement**: Fast development with Vite
- **TypeScript Support**: Full IDE integration and type checking
- **Developer Tools**: React DevTools and debugging setup

## Business Features

### Service Provider Management
- **Profile Creation**: Comprehensive provider profiles with skills and experience
- **Verification Process**: Admin-controlled provider approval system
- **Availability Management**: Flexible scheduling and time slot management
- **Performance Tracking**: Rating system and service quality metrics

### Customer Experience
- **Service Discovery**: Easy browsing and filtering of services
- **Transparent Pricing**: Clear pricing structure with no hidden fees
- **Booking Flexibility**: Easy rescheduling and cancellation options
- **Quality Assurance**: Rating and review system for service feedback

### Revenue Model
- **Commission Structure**: Platform fee on completed bookings
- **Subscription Options**: Premium features for providers
- **Promotional Tools**: Marketing and discount capabilities
- **Analytics Dashboard**: Revenue tracking and business insights

## Future Expansion Opportunities

### Technical Enhancements
- **Mobile Apps**: Native iOS and Android applications
- **Advanced Analytics**: Machine learning for demand prediction
- **API Integration**: Third-party service integrations
- **Internationalization**: Multi-language and currency support

### Business Growth
- **Geographic Expansion**: Multi-city and regional coverage
- **Service Categories**: Additional service types and specializations
- **Enterprise Solutions**: B2B cleaning service packages
- **Franchise Model**: Licensed operator network expansion

This knowledge base represents the current state of the Kleaners platform as of T=0, providing comprehensive understanding of the system architecture, features, and business model for future development and enhancement.