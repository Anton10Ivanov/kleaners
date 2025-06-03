
import { lazy } from 'react';

// Lazy load components for better performance
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyWhyChooseUs = lazy(() => import('./WhyChooseUs'));
export const LazyFAQSection = lazy(() => import('./faq/FAQSection'));
export const LazyContactForm = lazy(() => import('./contact/ContactForm'));

// Admin components
export const LazyAdminDashboard = lazy(() => import('./admin/Dashboard'));
export const LazyAdminBookings = lazy(() => import('./admin/sections/BookingsSection'));

// Booking components
export const LazyBookingContent = lazy(() => import('./booking/BookingContent'));
export const LazyOptimizedCalendar = lazy(() => import('./booking/OptimizedCalendar'));

// Chat components
export const LazyChatInterface = lazy(() => import('./chat/ChatInterface'));

export default {
  LazyTestimonials,
  LazyWhyChooseUs,
  LazyFAQSection,
  LazyContactForm,
  LazyAdminDashboard,
  LazyAdminBookings,
  LazyBookingContent,
  LazyOptimizedCalendar,
  LazyChatInterface,
};
