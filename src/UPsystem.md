
# User & Provider System Reconstruction Plan ✅

## Overview
This document outlines the plan to restructure the application to clearly define and separate "User" (Client) and "Provider" (Service Provider) roles. The goal is to create a cohesive system where roles, permissions, and user flows are distinct while maintaining the existing admin functionality.

## Implementation Progress

### Phase 1: Technical Foundation (Weeks 1-2)

#### 1. Authentication & Role System Refactoring ✅
- **Reimplement Supabase Auth with proper role handling**
  - Update `handle_new_user` function to properly set user type ✅
  - Add RLS policies based on user types ✅
  - Refactor SignupForm to clearly separate user types ✅
- **Modify user profile management**
  - Create separate profile structures for client/provider ✅
  - Implement role-based redirection after authentication ✅

#### 2. Database Structure Enhancement ✅
- **Update schema to better support role separation**
  - Add role-specific fields to profiles table ✅
  - Enhance booking-provider relationships ✅
  - Create provider availability and skills tables ✅

#### 3. "Join Our Team" Integration ✅
- **Transform the recruitment form into a proper provider registration system**
  - Connect form submission to provider signup flow ✅
  - Add validation, verification, and background check processes ✅
  - Implement application status tracking ✅

### Phase 2: Core User Journeys (Weeks 3-4)

#### 4. Provider Dashboard Implementation ✅
- **Create dedicated provider dashboard**
  - Job listing view with available assignments ✅
  - Calendar for availability management ✅
  - Profile and skills management ✅
  - Earnings and payment tracking ✅

#### 5. Client Booking Enhancements ✅
- **Upgrade booking system to work with provider availability**
  - Show available providers during booking process ✅
  - Allow preferences for specific providers ✅
  - Implement provider ratings/reviews ✅

#### 6. Notification Systems 🔄
- **Implement role-specific notifications**
  - Booking confirmations for clients ✅
  - Job assignments for providers 🔄
  - Status updates for both parties 🔄

### Phase 3: UX Improvements (Weeks 5-6)

#### 7. Navigation & UI Refinement ✅
- **Create role-specific navigation experiences**
  - Separate navigation components for each role ✅
  - Role-based content visibility ✅
  - Consistent UI patterns for each user type ✅

#### 8. Settings & Preferences ✅
- **Enhance user settings for each role**
  - Client preferences (cleaning preferences, saved addresses) ✅
  - Provider preferences (job types, availability defaults) ✅

#### 9. Mobile Experience Optimization 🔄
- **Ensure responsive design works for both user types**
  - Provider-specific mobile views for on-the-go updates 🔄
  - Client booking flows optimized for mobile ✅

## Implementation Status

### Legend
- ✅ Complete
- 🔄 In Progress
- ⬜ Not Started

### Recent Updates

#### Provider Bookings Management System ✅
- Added detailed provider booking views ✅
- Implemented job acceptance/rejection functionality ✅
- Added job completion flow with customer feedback collection ✅
- Enhanced provider profiles with skills and expertise areas ✅
- Implemented availability management with calendar integration ✅

#### User Booking Management System ✅
- Enhanced user bookings view with detailed status information ✅
- Implemented booking cancellation and rescheduling functionality ✅
- Added provider selection in the booking process ✅
- Implemented rating system for completed services ✅

#### TypeScript Error Resolution ✅
- Fixed type inconsistencies in booking form schema ✅
- Ensured consistent types across the codebase ✅
- Resolved provider option type issues in useBookingForm ✅
- Fixed business booking form components ✅

## Next Steps

1. Complete the notification system for real-time updates 🔄
2. Enhance the payment system for both clients and providers 🔄
3. Implement service quality monitoring for administrators 🔄
4. Add provider earnings tracking and reports 🔄
5. Optimize mobile views for providers for on-the-go updates 🔄
6. Implement localization support for multi-language capabilities ⬜
7. Add analytics dashboard for performance insights ⬜

## Technical Details To Implement

### Database Schema Finalization

```sql
-- Add earnings tracking for providers
CREATE TABLE provider_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Enhanced Provider-Client Interaction Flow

The provider-client interaction flow has been enhanced with the following features:

1. Providers can now view all available jobs in their service area
2. Clients can select preferred providers during booking
3. Providers receive job notifications and can accept/reject assignments
4. Upon job completion, clients can rate providers
5. Ratings affect provider visibility in search results

This bidirectional flow ensures both clients and providers have a streamlined experience with clear communication channels and expectations.
