
import { memo } from 'react';
import { useLazyComponentTimer } from '@/hooks/useLazyComponentTimer';
import { SectionLoading } from '@/components/ui/section-loading';

// Create optimized lazy components with performance tracking
const createLazyComponent = (name: string, importFn: () => Promise<any>) => {
  return {
    Component: useLazyComponentTimer(name, importFn),
    name
  };
};

// Define all lazy components
const lazyComponents = {
  OurOptions: createLazyComponent('OurOptions', () => import('./options/OurOptions')),
  WhyChooseUs: createLazyComponent('WhyChooseUs', () => import('./WhyChooseUs')),
  Testimonials: createLazyComponent('Testimonials', () => import('./Testimonials')),
  BookingSummary: createLazyComponent('BookingSummary', () => import('./booking/BookingSummary')),
  BookingContent: createLazyComponent('BookingContent', () => import('./booking/BookingContent')),
};

// Export individually wrapped components with memoization
export const LazyOurOptions = memo(lazyComponents.OurOptions.Component);
export const LazyWhyChooseUs = memo(lazyComponents.WhyChooseUs.Component);
export const LazyTestimonials = memo(lazyComponents.Testimonials.Component);
export const LazyBookingSummary = memo(lazyComponents.BookingSummary.Component);
export const LazyBookingContent = memo(lazyComponents.BookingContent.Component);

// Add display names for better debugging
LazyOurOptions.displayName = 'LazyOurOptions';
LazyWhyChooseUs.displayName = 'LazyWhyChooseUs';
LazyTestimonials.displayName = 'LazyTestimonials';
LazyBookingSummary.displayName = 'LazyBookingSummary';
LazyBookingContent.displayName = 'LazyBookingContent';

// Export a map for easier reference
export const LazyComponents = {
  OurOptions: LazyOurOptions,
  WhyChooseUs: LazyWhyChooseUs,
  Testimonials: LazyTestimonials,
  BookingSummary: LazyBookingSummary,
  BookingContent: LazyBookingContent,
};

export default LazyComponents;
