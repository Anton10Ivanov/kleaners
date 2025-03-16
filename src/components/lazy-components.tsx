
import { lazy, Suspense } from 'react';
import { useLazyComponentTimer } from '@/hooks/useLazyComponentTimer';
import { SectionLoading } from '@/components/ui/section-loading';

// Use the performance-optimized lazy loading hook
export const LazyWhyChooseUs = useLazyComponentTimer(
  () => import('./why-choose-us/WhyChooseUsComponent'),
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
