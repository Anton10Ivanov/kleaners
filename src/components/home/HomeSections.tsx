
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SectionLoading } from '@/components/ui/section-loading';

const LazyWhyChooseUs = lazy(() => import('../WhyChooseUs'));
const LazyTestimonials = lazy(() => import('../testimonials/EnhancedTestimonials'));
const LazyFAQSection = lazy(() => import('../faq/FAQSection'));

const ErrorFallback = () => (
  <div className="text-center py-8">
    <p>Something went wrong loading this section.</p>
  </div>
);

export const HomeSections = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <LazyWhyChooseUs />
        </Suspense>
      </ErrorBoundary>
      
      <div className="wave-divider bg-white dark:bg-gray-800 h-16 md:h-24"></div>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <LazyTestimonials />
        </Suspense>
      </ErrorBoundary>
      
      <div className="wave-divider bg-theme-lightblue dark:bg-gray-900 h-16 md:h-24"></div>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <LazyFAQSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
