# User & Provider System Reconstruction Plan

## Overview
This document outlines the plan to restructure the application to clearly define and separate "User" (Client) and "Provider" (Service Provider) roles. The goal is to create a cohesive system where roles, permissions, and user flows are distinct while maintaining the existing admin functionality.

## Implementation Progress

### Phase 1: Technical Foundation (Weeks 1-2)

#### 1. Authentication & Role System Refactoring ✅
- **Reimplement Supabase Auth with proper role handling**
  - Update `handle_new_user` function to properly set user type
  - Add RLS policies based on user types
  - Refactor SignupForm to clearly separate user types
- **Modify user profile management**
  - Create separate profile structures for client/provider
  - Implement role-based redirection after authentication

#### 2. Database Structure Enhancement ✅
- **Update schema to better support role separation**
  - Add role-specific fields to profiles table
  - Enhance booking-provider relationships
  - Create provider availability and skills tables

#### 3. "Join Our Team" Integration 🔄
- **Transform the recruitment form into a proper provider registration system**
  - Connect form submission to provider signup flow
  - Add validation, verification, and background check processes
  - Implement application status tracking

### Phase 2: Core User Journeys (Weeks 3-4)

#### 4. Provider Dashboard Implementation 🔄
- **Create dedicated provider dashboard**
  - Job listing view with available assignments
  - Calendar for availability management
  - Profile and skills management
  - Earnings and payment tracking

#### 5. Client Booking Enhancements 🔄
- **Upgrade booking system to work with provider availability**
  - Show available providers during booking process
  - Allow preferences for specific providers
  - Implement provider ratings/reviews

#### 6. Notification Systems ⬜
- **Implement role-specific notifications**
  - Booking confirmations for clients
  - Job assignments for providers
  - Status updates for both parties

### Phase 3: UX Improvements (Weeks 5-6)

#### 7. Navigation & UI Refinement 🔄
- **Create role-specific navigation experiences**
  - Separate navigation components for each role
  - Role-based content visibility
  - Consistent UI patterns for each user type

#### 8. Settings & Preferences ⬜
- **Enhance user settings for each role**
  - Client preferences (cleaning preferences, saved addresses)
  - Provider preferences (job types, availability defaults)

#### 9. Mobile Experience Optimization ⬜
- **Ensure responsive design works for both user types**
  - Provider-specific mobile views for on-the-go updates
  - Client booking flows optimized for mobile

## Implementation Status

### Legend
- ✅ Complete
- 🔄 In Progress
- ⬜ Not Started

### Recent Updates

#### Provider Framework Implementation
- Added Provider dedicated layout and navigation system
- Created provider-specific routes in the application
- Implemented initial provider dashboard
- Added availability management system for providers
- Integrated provider bookings management

#### Booking System Enhancements
- Updated booking schema to support provider selection
- Added provider selection in the final booking step
- Fixed frequency issues in the booking system

#### Authentication Improvements
- Enhanced the booking form to allow password creation for new users
- Fixed user type handling in form submissions
- Updated validation to properly handle provider-specific fields

## Next Steps

1. Complete the provider onboarding flow via the "Join Our Team" page
2. Implement provider verification process
3. Enhance booking-provider matching algorithm
4. Build out notification system for booking assignments
5. Implement provider ratings and reviews
6. Improve role-based access controls

## Technical Details To Implement

### Database Schema Updates

```sql
-- Enhance profiles with role-specific fields
ALTER TABLE profiles ADD COLUMN user_type TEXT NOT NULL DEFAULT 'client';
ALTER TABLE profiles ADD COLUMN provider_status TEXT;
ALTER TABLE profiles ADD COLUMN verification_level TEXT;

-- Create provider skills table
CREATE TABLE provider_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  experience_years INTEGER,
  certification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create provider service areas
CREATE TABLE provider_service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  postal_code TEXT NOT NULL,
  travel_distance INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create provider availability
CREATE TABLE provider_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create unavailable dates for special occasions
CREATE TABLE provider_unavailable_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Update bookings to track provider assignments
ALTER TABLE bookings ADD COLUMN assigned_provider_id UUID REFERENCES profiles(id);
ALTER TABLE bookings ADD COLUMN provider_accepted BOOLEAN DEFAULT FALSE;
```
