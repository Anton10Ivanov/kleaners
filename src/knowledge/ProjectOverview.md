
# Project Overview

## About Kleaners

Kleaners is a comprehensive cleaning service application designed to connect cleaning service providers with clients. The platform facilitates booking, management, and payment for cleaning services.

## Architecture

The application follows a component-based architecture using React and TypeScript. It is built with the following key technologies:

- **Frontend**: React, TypeScript, TailwindCSS, ShadcnUI
- **State Management**: React Query, Zustand
- **Authentication**: Supabase Auth
- **API Integration**: Supabase
- **Routing**: React Router

## Key Features

1. **User Authentication**: Separate flows for clients, providers, and administrators
2. **Booking System**: Comprehensive booking workflow for various cleaning services
3. **Provider Management**: Tools for providers to manage schedules, availability, and bookings
4. **Client Dashboard**: Interface for clients to manage bookings, profiles, and payments
5. **Admin Panel**: Administrative tools for managing users, bookings, and system settings

## Environment Configuration

The application relies on environment variables for configuration:

- **Supabase Configuration**: For database and authentication
- **API Keys**: For various service integrations
- **Feature Flags**: For enabling/disabling features in different environments

## Application Routes

The application has three main sections:

1. **Client Routes** (`/client/*`): For end users booking services
2. **Provider Routes** (`/provider/*`): For service providers
3. **Admin Routes** (`/admin/*`): For system administrators
4. **Public Routes**: Home page, service information, etc.
