
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMobileInteractions';

// Lazy load components for better performance
const HomeDetailsSection = lazy(() => import('../HomeDetailsSection'));
const ServiceOptions = lazy(() => import('../ServiceOptions'));
const EnhancedMobileHours = lazy(() => import('./EnhancedMobileHours'));
const AccessibleMobileCalendar = lazy(() => import('./AccessibleMobileCalendar'));
const MobileTimeSelection = lazy(() => import('./MobileTimeSelection'));
const EnhancedExtras = lazy(() => import('../EnhancedExtras'));

interface OptimizedProgressiveFormProps {
  form: UseFormReturn<BookingFormData>;
  currentStep: number;
  onStepChange: (step: number) => void;
}

interface FormSection {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isComplete: (formData: any) => boolean;
  required: boolean;
  icon: string;
}

const LoadingFallback = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center gap-2 text-gray-500">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading {title}...</span>
    </div>
  </div>
);

const OptimizedProgressiveForm = ({ form, currentStep, onStepChange }: OptimizedProgressiveFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [loadedSections, setLoadedSections] = useState<Set<number>>(new Set([0])); // Preload first section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const formData = form.watch();
  const frequency = form.watch('frequency');

  // Form sections configuration with lazy components
  const sections: FormSection[] = [
    {
      id: 'home-details',
      title: 'About Your Home',
      component: HomeDetailsSection,
      isComplete: (data) => data.propertySize > 0 && data.bedrooms > 0 && data.bathrooms > 0,
      required: true,
      icon: '🏠'
    },
    {
      id: 'frequency',
      title: 'Cleaning Frequency',
      component: ServiceOptions,
      isComplete: (data) => !!data.frequency,
      required: true,
      icon: '📅'
    },
    {
      id: 'hours',
      title: 'Duration',
      component: EnhancedMobileHours,
      isComplete: (data) => data.hours > 0,
      required: true,
      icon: '⏰'
    },
    {
      id: 'calendar',
      title: 'Date',
      component: AccessibleMobileCalendar,
      isComplete: (data) => !!data.date,
      required: frequency !== Frequency.Custom,
      icon: '📆'
    },
    {
      id: 'time',
      title: 'Time',
      component: MobileTimeSelection,
      isComplete: (data) => !!data.preferredTime,
      required: frequency !== Frequency.Custom,
      icon: '🕐'
    },
    {
      id: 'extras',
      title: 'Additional Services',
      component: EnhancedExtras,
      isComplete: () => true, // Optional section
      required: false,
      icon: '➕'
    }
  ];

  // Filter sections based on requirements
  const visibleSections = sections.filter(section => 
    section.required || section.id === 'extras'
  );

  // Intersection Observer for lazy loading
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-section-index') || '0');
            setLoadedSections(prev => new Set([...prev, index, index + 1])); // Preload next section
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before section comes into view
    );

    return () => intersectionObserver.current?.disconnect();
  }, []);

  // Observe section elements
  useEffect(() => {
    sectionRefs.current.forEach((ref, index) => {
      if (ref && intersectionObserver.current) {
        ref.setAttribute('data-section-index', index.toString());
        intersectionObserver.current.observe(ref);
      }
    });
  }, [visibleSections]);

  // Browser back button support with improved UX
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      if (currentSection > 0) {
        setCurrentSection(prev => Math.max(0, prev - 1));
        // Smooth scroll to previous section
        setTimeout(() => {
          sectionRefs.current[Math.max(0, currentSection - 1)]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      } else if (currentStep > 1) {
        onStepChange(currentStep - 1);
      }
      
      // Maintain history state
      window.history.pushState({ section: currentSection }, '', window.location.pathname);
    };

    // Initialize history state
    window.history.replaceState({ section: currentSection }, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentSection, currentStep, onStepChange]);

  // Smart auto-advancement with completion tracking
  useEffect(() => {
    const currentSectionData = visibleSections[currentSection];
    if (currentSectionData && currentSectionData.isComplete(formData)) {
      setCompletedSections(prev => new Set([...prev, currentSection]));
      
      // Auto-advance with optimized timing
      const timer = setTimeout(() => {
        if (currentSection < visibleSections.length - 1) {
          handleSectionComplete();
        }
      }, 600); // Reduced delay for better UX

      return () => clearTimeout(timer);
    }
  }, [formData, currentSection, visibleSections]);

  const handleSectionComplete = () => {
    if (currentSection < visibleSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      
      // Preload next section
      setLoadedSections(prev => new Set([...prev, nextSection, nextSection + 1]));
      
      // Update history
      window.history.pushState({ section: nextSection }, '', window.location.pathname);
      
      // Optimized scroll with reduced motion support
      setTimeout(() => {
        sectionRefs.current[nextSection]?.scrollIntoView({ 
          behavior: prefersReducedMotion ? 'auto' : 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    setLoadedSections(prev => new Set([...prev, index]));
    window.history.pushState({ section: index }, '', window.location.pathname);
    
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth', 
      block: 'start' 
    });
  };

  const getAnimationProps = (index: number) => {
    if (prefersReducedMotion) return {};
    
    return {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: index <= currentSection ? 1 : 0.3, 
        y: index <= currentSection ? 0 : 20,
        scale: index <= currentSection ? 1 : 0.95
      },
      transition: { duration: 0.3, delay: Math.min(index * 0.1, 0.3) }
    };
  };

  return (
    <div className="space-y-4">
      {/* Enhanced progress indicators with icons */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {visibleSections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap
              transition-all duration-200 touch-manipulation min-h-[44px]
              ${index === currentSection 
                ? 'bg-primary text-white shadow-md' 
                : completedSections.has(index)
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }
            `}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label={`${section.title} - ${completedSections.has(index) ? 'Completed' : index === currentSection ? 'Current' : 'Pending'}`}
          >
            {completedSections.has(index) ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <span className="text-sm">{section.icon}</span>
            )}
            <span>{section.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Optimized form sections with lazy loading */}
      <div className="space-y-6">
        {visibleSections.map((section, index) => {
          const Component = section.component;
          const isActive = index <= currentSection;
          const isCompleted = completedSections.has(index);
          const isLoaded = loadedSections.has(index);

          return (
            <motion.div
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              {...getAnimationProps(index)}
              className={`relative ${!isActive ? 'pointer-events-none' : ''}`}
            >
              <Card className={`
                p-6 transition-all duration-300
                ${isCompleted ? 'ring-2 ring-green-200 bg-green-50/30 dark:bg-green-900/10' : ''}
                ${index === currentSection ? 'ring-2 ring-primary/20 shadow-lg' : ''}
              `}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    <span className="text-xl mr-2">{section.icon}</span>
                    {section.title}
                  </h3>
                  {index === currentSection && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {isLoaded ? (
                        <Suspense fallback={<LoadingFallback title={section.title} />}>
                          <Component
                            form={form}
                            frequency={frequency}
                            setFrequency={(freq: any) => form.setValue('frequency', freq)}
                            isRegularCleaning={true}
                            onComplete={handleSectionComplete}
                            onSuggestedTimeSelect={(hours: number) => form.setValue('hours', hours)}
                          />
                        </Suspense>
                      ) : (
                        <LoadingFallback title={section.title} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OptimizedProgressiveForm;
