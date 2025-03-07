
# User & Provider System Reconstruction Plan

## Overview
This document outlines the plan to restructure the application to clearly define and separate "User" (Client) and "Provider" (Service Provider) roles. The goal is to create a cohesive system where roles, permissions, and user flows are distinct while maintaining the existing admin functionality.

## Current System Analysis

### Issues Identified
1. **Unclear Role Separation**: No clear distinction between Client and Provider user types in the authentication and UI flows
2. **Inconsistent Data Structure**: Database structure doesn't fully support role-based access patterns
3. **Fragmented User Experience**: Different user types don't have dedicated, optimized experiences
4. **Incomplete Provider Onboarding**: "Join Our Team" page exists but doesn't connect to the provider authentication flow
5. **Inconsistent Session Handling**: User session management doesn't properly track and enforce role-based access

## Reconstruction Priorities (Ordered by Impact)

### Phase 1: Technical Foundation (Weeks 1-2)

#### 1. Authentication & Role System Refactoring
- **Reimplement Supabase Auth with proper role handling**
  - Update `handle_new_user` function to properly set user type
  - Add RLS policies based on user types
  - Refactor SignupForm to clearly separate user types
- **Modify user profile management**
  - Create separate profile structures for client/provider
  - Implement role-based redirection after authentication

#### 2. Database Structure Enhancement
- **Update schema to better support role separation**
  - Add role-specific fields to profiles table
  - Enhance booking-provider relationships
  - Create provider availability and skills tables

#### 3. "Join Our Team" Integration
- **Transform the recruitment form into a proper provider registration system**
  - Connect form submission to provider signup flow
  - Add validation, verification, and background check processes
  - Implement application status tracking

### Phase 2: Core User Journeys (Weeks 3-4)

#### 4. Provider Dashboard Implementation
- **Create dedicated provider dashboard**
  - Job listing view with available assignments
  - Calendar for availability management
  - Profile and skills management
  - Earnings and payment tracking

#### 5. Client Booking Enhancements
- **Upgrade booking system to work with provider availability**
  - Show available providers during booking process
  - Allow preferences for specific providers
  - Implement provider ratings/reviews

#### 6. Notification Systems
- **Implement role-specific notifications**
  - Booking confirmations for clients
  - Job assignments for providers
  - Status updates for both parties

### Phase 3: UX Improvements (Weeks 5-6)

#### 7. Navigation & UI Refinement
- **Create role-specific navigation experiences**
  - Separate navigation components for each role
  - Role-based content visibility
  - Consistent UI patterns for each user type

#### 8. Settings & Preferences
- **Enhance user settings for each role**
  - Client preferences (cleaning preferences, saved addresses)
  - Provider preferences (job types, availability defaults)

#### 9. Mobile Experience Optimization
- **Ensure responsive design works for both user types**
  - Provider-specific mobile views for on-the-go updates
  - Client booking flows optimized for mobile

## Implementation Approach

### Starting Point: Join Team Page Transformation

The "Join Our Team" page will be our starting point, as it's the natural entry point for service providers. We'll transform this from a simple form into a comprehensive provider onboarding flow.

#### Step 1: Provider Registration Flow
- Update JoinTeam.tsx to submit provider applications to Supabase
- Add multi-step application form with:
  - Basic information
  - Experience and qualifications
  - Background check consent
  - Service capabilities
  - Availability settings

#### Step 2: Provider Authentication Integration
- Modify SignupForm.tsx to properly handle provider signups
- Create a dedicated ProviderSignup component
- Implement verification process

#### Step 3: Provider Profile Management
- Create dedicated provider profile screens
- Implement service area, skills, and availability management

### Core Files to Modify

1. **Auth System**
   - `src/components/auth/SignupForm.tsx`
   - `src/integrations/supabase/client.ts`

2. **Provider Onboarding**
   - `src/pages/JoinTeam.tsx`
   - Create: `src/components/provider/ProviderOnboarding.tsx`
   - Create: `src/components/provider/ProviderVerification.tsx`

3. **Provider Dashboard**
   - Create: `src/pages/provider/ProviderDashboard.tsx`
   - Create: `src/components/provider/JobsAvailable.tsx`
   - Create: `src/components/provider/ProviderCalendar.tsx`
   - Create: `src/components/provider/EarningsTracker.tsx`

4. **Navigation & Layout**
   - `src/components/navbar/AuthButtons.tsx`
   - Create: `src/components/provider/ProviderSidebar.tsx`
   - Update: `src/components/user/UserSidebar.tsx`

5. **Booking System Connection**
   - `src/components/booking/Calendar.tsx`
   - `src/components/booking/FinalStep.tsx`
   - Create: `src/components/booking/ProviderSelection.tsx`

## Detailed Technical Tasks

### Database Schema Updates

```sql
-- Enhance profiles with role-specific fields
ALTER TABLE profiles ADD COLUMN user_type TEXT NOT NULL DEFAULT 'client';
ALTER TABLE profiles ADD COLUMN provider_status TEXT;
ALTER TABLE profiles ADD COLUMN verification_level TEXT;

-- Create provider skills table
CREATE TABLE provider_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  experience_years INTEGER,
  certification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create provider service areas
CREATE TABLE provider_service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  postal_code TEXT NOT NULL,
  travel_distance INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Update bookings to track provider assignments
ALTER TABLE bookings ADD COLUMN assigned_provider_id UUID REFERENCES service_providers(id);
ALTER TABLE bookings ADD COLUMN provider_accepted BOOLEAN DEFAULT FALSE;
```

### Authentication Flow Refactoring

The signup process will be modified to:
1. Clearly separate client vs provider signup
2. Store proper role information in the user profile
3. Redirect to appropriate dashboards based on role
4. Connect the "Join Our Team" flow to provider registration

### Key UI/UX Components to Implement

1. **Provider Onboarding Wizard**
   - Multi-step form converting from the current JoinTeam page
   - Document upload for verification
   - Service area selection with map integration
   - Skill and experience input

2. **Provider Dashboard**
   - Available jobs matching provider skills and location
   - Calendar view with booked appointments
   - Earnings tracker and history
   - Client feedback and ratings

3. **Enhanced Client Booking**
   - Provider selection based on ratings and availability
   - Preferred provider option
   - Provider details preview during booking

## Testing Strategy

1. **User Journey Testing**
   - End-to-end tests for client booking flow
   - End-to-end tests for provider application and job acceptance
   - Role switching and permission verification

2. **Integration Testing**
   - Authentication with correct role assignment
   - Booking-provider availability matching
   - Notification delivery

3. **Performance Testing**
   - Provider search and filtering
   - Availability calendar rendering
   - Dashboard data loading

## Rollout Strategy

The reconstruction will be implemented in phases:

1. **Alpha Phase**
   - Limited provider accounts
   - Basic role separation
   - Core functionality testing

2. **Beta Phase**
   - Provider onboarding open
   - Complete booking-provider matching
   - Full dashboard functionality

3. **Full Launch**
   - All features enabled
   - Marketing for provider recruitment
   - Client communication about new features

## Success Metrics

1. **Technical Metrics**
   - Clear separation of user types in codebase
   - Reduced code duplication
   - Improved authentication flow timing

2. **Business Metrics**
   - Provider application completion rate
   - Provider retention rate
   - Client satisfaction with provider matching

3. **Performance Metrics**
   - Dashboard load times
   - Booking process completion time
   - System stability under load
