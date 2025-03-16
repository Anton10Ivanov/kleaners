
import { lazy } from 'react';

// Lazy loaded components
export const LazyOurOptions = lazy(() => import('./options/OurOptions'));
export const LazyWhyChooseUs = lazy(() => import('./WhyChooseUs'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyBookingSummary = lazy(() => import('./booking/BookingSummary'));
export const LazyBookingContent = lazy(() => import('./booking/BookingContent'));

// Export a map of components for easier reference
export const LazyComponents = {
  OurOptions: LazyOurOptions,
  WhyChooseUs: LazyWhyChooseUs,
  Testimonials: LazyTestimonials,
  BookingSummary: LazyBookingSummary,
  BookingContent: LazyBookingContent,
};

export default LazyComponents;
