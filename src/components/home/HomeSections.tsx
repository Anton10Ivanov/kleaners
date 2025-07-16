
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SectionLoading } from '@/components/ui/section-loading';

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
          <LazyTestimonials />
        </Suspense>
      </ErrorBoundary>
      
      <div className="py-8"></div>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <LazyFAQSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
