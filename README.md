# Kleaners - Professional Cleaning Services Platform

A comprehensive Next.js-based platform connecting clients with professional cleaning service providers. Built with modern web technologies and designed for scalability and user experience.

## 🚀 Features

### Core Functionality
- **Multi-Role Dashboard**: Separate interfaces for clients, providers, and administrators
- **Advanced Booking System**: Multi-step booking flow with real-time scheduling
- **Service Management**: Comprehensive catalog of cleaning services
- **Payment Integration**: Secure payment processing
- **Real-time Communication**: Built-in chat and messaging system
- **Provider Matching**: Intelligent matching based on location and availability

### Service Categories
- **Residential Cleaning**: Home cleaning, deep cleaning, move-in/out
- **Commercial Cleaning**: Office cleaning, industrial cleaning
- **Specialized Services**: Carpet cleaning, window cleaning, post-construction
- **Maintenance Services**: Regular maintenance and upkeep

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Framer Motion**: Animation library

### Backend & Database
- **Supabase**: Backend-as-a-Service
- **PostgreSQL**: Primary database
- **Row Level Security**: Data protection
- **Real-time subscriptions**: Live updates

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Static type checking

## 📁 Project Structure

```
kleaners/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard layouts
│   ├── admin/             # Admin panel
│   ├── booking/           # Booking flow pages
│   ├── services/          # Service pages
│   └── user/              # User management
├── components/            # Reusable components
│   ├── admin/             # Admin-specific components
│   ├── booking/           # Booking flow components
│   ├── ui/                # Base UI components
│   └── forms/             # Form components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── schemas/               # Validation schemas
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── supabase/              # Database migrations and functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anton10Ivanov/kleaners.git
   cd kleaners
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   ```bash
   # Run Supabase migrations
   npx supabase db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests

## 🏗️ Architecture

### Booking Flow
1. **Service Selection**: Choose cleaning service type
2. **Property Details**: Enter property information
3. **Scheduling**: Select date and time
4. **Provider Matching**: System matches available providers
5. **Confirmation**: Review and confirm booking
6. **Payment**: Process payment securely

### User Roles
- **Client**: Book services, manage bookings, communicate with providers
- **Provider**: Manage availability, view bookings, communicate with clients
- **Admin**: Oversee platform, manage users, handle disputes

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `NEXT_PUBLIC_APP_URL`: Application URL

### Database Schema
The application uses a comprehensive database schema with tables for:
- Users and authentication
- Service categories and pricing
- Bookings and scheduling
- Provider availability
- Messages and communications
- Payment records

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Configure your web server to serve the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: anton10ivanov@gmail.com

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] AI-powered pricing recommendations
- [ ] Integration with calendar systems
- [ ] Advanced reporting features

## 📊 Project Status

This project is actively maintained and in continuous development. Current focus areas:
- Booking flow optimization
- Provider onboarding improvements
- Payment system enhancements
- Mobile responsiveness
- Performance optimization

---

**Built with ❤️ by Anton10Ivanov**
