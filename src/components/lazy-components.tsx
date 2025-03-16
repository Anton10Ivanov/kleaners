
import { lazy, Suspense } from 'react';
import { useLazyComponentTimer } from '@/hooks/useLazyComponentTimer';
import { SectionLoading } from '@/components/ui/section-loading';

// Use the performance-optimized lazy loading hook
// Fix import path to ensure we're importing a component with a default export
export const LazyWhyChooseUs = useLazyComponentTimer(
  () => import('./why-choose-us/WhyChooseUsContent').then(module => ({
    default: module.default || module.whyChooseUsContent || module
  })),
  'WhyChooseUs'
);

export const LazyOurOptions = useLazyComponentTimer(
  () => import('./options/OurOptions'),
  'OurOptions'
);

export const LazyTestimonials = useLazyComponentTimer(
  () => import('./Testimonials'),
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
