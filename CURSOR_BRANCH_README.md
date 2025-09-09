# Kleaners - Cursor Branch

## 🎯 Project Overview
This is the **cursor** branch of the Kleaners cleaning services platform. This branch contains the complete project with comprehensive documentation and development tools.

## 📋 What's Included

### Core Application
- **Next.js 14** application with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for backend services
- **React Hook Form** with Zod validation

### Key Features
- Multi-role authentication (Client, Provider, Admin)
- Comprehensive booking system
- Real-time messaging
- Payment processing
- Provider management
- Admin dashboard

### Documentation
- PRD Integration README
- Project architecture documentation
- Development workflow guides
- API documentation

### Development Tools
- Chrome debug startup script
- PRD integration testing
- Automated requirement validation
- Development utilities

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
kleaners/
├── app/                    # Next.js App Router pages
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── schemas/               # Zod validation schemas
├── types/                 # TypeScript types
├── utils/                 # Helper functions
└── supabase/              # Database files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📊 Project Status

- ✅ **Authentication System** - Complete
- ✅ **Booking Flow** - Complete
- ✅ **Provider Dashboard** - Complete
- ✅ **Admin Panel** - Complete
- ✅ **Real-time Messaging** - Complete
- ✅ **Payment Integration** - Complete
- ✅ **Responsive Design** - Complete

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For technical support or questions, please contact the development team.

---

**Branch**: cursor-docs  
**Last Updated**: September 9, 2025  
**Status**: Active Development
