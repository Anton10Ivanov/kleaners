
import { lazy, Suspense } from 'react';
import { useLazyComponentTimer } from '@/hooks/useLazyComponentTimer';
import { SectionLoading } from '@/components/ui/section-loading';

// Use the performance-optimized lazy loading hook with optimized components
export const LazyWhyChooseUs = useLazyComponentTimer(
  () => import('./why-choose-us/ModernWhyChooseUs'),
  'WhyChooseUs'
);

export const LazyOurOptions = useLazyComponentTimer(
  () => import('./options/OptimizedOurOptions'),
  'OurOptions'
);

export const LazyTestimonials = useLazyComponentTimer(
  () => import('./testimonials/CompactTestimonials'),
  'Testimonials'
);

export const LazyBookingContent = useLazyComponentTimer(
  () => import('./booking/BookingContent'),
  'BookingContent'
);

export const LazyBookingSummary = useLazyComponentTimer(
  () => import('./booking/BookingSummary'),
  'BookingSummary'
);
