# Kleaners - PRD Integration & Project Overview

## 🏢 Project Summary
**Kleaners** is a comprehensive cleaning services platform that connects clients with professional cleaning service providers. The platform offers a wide range of cleaning services including home cleaning, office cleaning, deep cleaning, move-in/out cleaning, and specialized services.

## 🎯 Core Features

### Client Features
- **Service Selection**: Browse and select from 40+ cleaning services
- **Booking System**: Multi-step booking flow with property details, service selection, and scheduling
- **Real-time Pricing**: Dynamic pricing based on property size, service type, and frequency
- **Provider Matching**: Automatic matching with qualified cleaning professionals
- **Payment Processing**: Secure payment handling with multiple options
- **Communication**: Built-in messaging system for client-provider communication
- **Booking Management**: View, modify, and track booking history

### Provider Features
- **Profile Management**: Comprehensive provider profiles with skills and availability
- **Booking Management**: Accept, manage, and track assigned bookings
- **Earnings Tracking**: Monitor income and payment history
- **Schedule Management**: Set availability and working hours
- **Client Communication**: Direct messaging with clients

### Admin Features
- **Dashboard**: Comprehensive admin dashboard with analytics
- **User Management**: Manage clients, providers, and admin users
- **Booking Oversight**: Monitor and manage all bookings
- **Provider Verification**: Review and approve provider applications
- **Settings Management**: Configure platform settings and policies

## 🛠 Technical Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand for global state
- **UI Components**: Custom component library with shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Supabase Auth integration

### Backend
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth with role-based access
- **API**: Next.js API routes with TypeScript
- **Real-time**: Supabase real-time subscriptions
- **File Storage**: Supabase Storage for images and documents

### Key Technologies
- **TypeScript**: Full type safety across the application
- **React 18**: Modern React with hooks and concurrent features
- **Next.js 14**: App Router, Server Components, and API routes
- **Supabase**: Backend-as-a-Service with PostgreSQL
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: Schema validation and type inference
- **React Hook Form**: Performant forms with validation

## 📁 Project Structure

```
kleaners/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard layouts
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin-specific pages
│   ├── booking/           # Booking flow pages
│   ├── client/            # Client dashboard pages
│   ├── provider/          # Provider dashboard pages
│   └── services/          # Service listing pages
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── booking/           # Booking flow components
│   ├── forms/             # Form components
│   ├── ui/                # Base UI components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── schemas/               # Zod validation schemas
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
└── supabase/              # Database migrations and functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy from `.env.example`)
4. Run database migrations: `npx supabase db push`
5. Start development server: `npm run dev`

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Schema
The application uses a comprehensive database schema with tables for:
- Users (clients, providers, admins)
- Bookings and booking details
- Services and service categories
- Provider profiles and availability
- Payments and transactions
- Messages and notifications

## 📋 Current Status

### Completed Features
- ✅ User authentication and authorization
- ✅ Service catalog with 40+ cleaning services
- ✅ Multi-step booking flow
- ✅ Provider dashboard and management
- ✅ Client dashboard and booking management
- ✅ Admin panel with user management
- ✅ Real-time messaging system
- ✅ Payment integration (Stripe)
- ✅ Responsive design for all devices

### In Progress
- 🔄 Provider application and verification system
- 🔄 Advanced scheduling and availability management
- 🔄 Enhanced analytics and reporting
- 🔄 Mobile app development

### Planned Features
- 📋 Push notifications
- 📋 Advanced search and filtering
- 📋 Rating and review system
- 📋 Multi-language support
- 📋 API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions, please contact the development team.

---

**Last Updated**: September 2025
**Version**: 1.0.0
**Status**: Active Development
