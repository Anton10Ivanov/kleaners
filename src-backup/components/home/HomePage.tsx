import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SectionLoading } from '@/components/ui/section-loading';

// Centralized imports
import { Hero } from '../hero';

// Consolidated sections
import ConsolidatedTrustSection from '../trust/ConsolidatedTrustSection';
import { EnhancedProcessSteps } from '../hero/EnhancedProcessSteps';
import { EnhancedServiceCategoriesSection } from '../services/EnhancedServiceCategoriesSection';
import { EnhancedBusinessSolutionsSection } from './EnhancedBusinessSolutionsSection';

// Optimized lazy loading
const LazyHomeSections = lazy(() => import('./HomeSections').then(module => ({ default: module.HomeSections })));

// Simple error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center section-spacing-md text-red-500">
    <p>Something went wrong loading this section.</p>
    <p className="text-sm">{error?.message}</p>
  </div>
);

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen font-raleway bg-background transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-background"
      >
        <Hero />
        
        {/* Alternating white/off-white section backgrounds */}
        <div className="bg-off-white">
          <ConsolidatedTrustSection />
        </div>
        
        <div className="bg-background">
          <EnhancedProcessSteps />
        </div>
        
        <div className="bg-off-white">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<SectionLoading />}>
              <EnhancedServiceCategoriesSection />
            </Suspense>
          </ErrorBoundary>
        </div>
        
        <div className="bg-background">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<SectionLoading />}>
              <EnhancedBusinessSolutionsSection />
            </Suspense>
          </ErrorBoundary>
        </div>
        
        <div className="bg-off-white">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<SectionLoading />}>
              <LazyHomeSections />
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
