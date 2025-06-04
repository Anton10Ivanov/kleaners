
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMobileInteractions';

// Lazy load components for better performance
const HomeDetailsSection = lazy(() => import('../HomeDetailsSection').then(module => ({ default: module.HomeDetailsSection })));
const ServiceOptions = lazy(() => import('../ServiceOptions'));
const AccessibleMobileCalendar = lazy(() => import('./AccessibleMobileCalendar'));
const MobileTimeSelection = lazy(() => import('./MobileTimeSelection'));
const MobileOptimizedExtras = lazy(() => import('./MobileOptimizedExtras'));

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
  <div className="flex items-center justify-center py-4">
    <div className="flex items-center gap-2 text-gray-500">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">Loading {title}...</span>
    </div>
  </div>
);

const OptimizedProgressiveForm = ({ form, currentStep, onStepChange }: OptimizedProgressiveFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [loadedSections, setLoadedSections] = useState<Set<number>>(new Set([0, 1])); // Load first two sections
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const formData = form.watch();
  const frequency = form.watch('frequency');

  // Form sections configuration
  const sections: FormSection[] = [
    {
      id: 'home-details',
      title: 'About Your Home',
      component: HomeDetailsSection,
      isComplete: (data) => data.propertySize > 0 && 
                           data.bedrooms !== undefined && data.bedrooms !== null &&
                           data.bathrooms !== undefined && data.bathrooms !== null &&
                           data.hours > 0,
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
      component: MobileOptimizedExtras,
      isComplete: () => true,
      required: false,
      icon: '➕'
    }
  ];

  // Filter sections based on requirements
  const visibleSections = sections.filter(section => 
    section.required || section.id === 'extras'
  );

  // Intersection Observer for progressive loading
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-section-index') || '0');
            setLoadedSections(prev => new Set([...prev, index, index + 1, index + 2])); // Load current + next 2
          }
        });
      },
      { rootMargin: '50px' }
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

  // Auto-advancement logic
  useEffect(() => {
    const currentSectionData = visibleSections[currentSection];
    if (currentSectionData && currentSectionData.isComplete(formData)) {
      setCompletedSections(prev => new Set([...prev, currentSection]));
      
      // Auto-advance after completion
      const timer = setTimeout(() => {
        if (currentSection < visibleSections.length - 1) {
          handleSectionComplete();
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [formData, currentSection, visibleSections]);

  const handleSectionComplete = () => {
    if (currentSection < visibleSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      
      // Load next sections proactively
      setLoadedSections(prev => new Set([...prev, nextSection, nextSection + 1, nextSection + 2]));
      
      // Smooth scroll to next section with delay for better disclosure
      setTimeout(() => {
        sectionRefs.current[nextSection]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 200);
    }
  };

  const handleSuggestedTimeSelect = (hours: number) => {
    form.setValue('hours', hours);
  };

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    setLoadedSections(prev => new Set([...prev, index, index + 1]));
    
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const getAnimationProps = (index: number) => {
    return {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { 
        opacity: index <= currentSection ? 1 : 0.6, 
        y: index <= currentSection ? 0 : 20,
        scale: index <= currentSection ? 1 : 0.95
      },
      transition: { duration: 0.4, delay: Math.min(index * 0.1, 0.3) }
    };
  };

  return (
    <div className="space-y-3 px-1">
      <div className="space-y-3">
        {visibleSections.map((section, index) => {
          const Component = section.component;
          const isActive = index <= currentSection;
          const isCompleted = completedSections.has(index);
          const isLoaded = loadedSections.has(index);
          const isCurrent = index === currentSection;

          return (
            <motion.div
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              {...getAnimationProps(index)}
              className={`relative ${!isActive ? 'pointer-events-none' : ''}`}
            >
              <Card className={`
                p-4 transition-all duration-300 
                ${isCompleted ? 'ring-2 ring-green-200 bg-green-50/30 dark:bg-green-900/10' : ''}
                ${isCurrent ? 'ring-2 ring-primary/30 shadow-lg' : 'shadow-sm'}
                ${!isActive ? 'opacity-60' : 'opacity-100'}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                    <span className="text-lg mr-1">{section.icon}</span>
                    {section.title}
                  </h3>
                  {isCurrent && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`section-${index}-content`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      {isLoaded ? (
                        <Suspense fallback={<LoadingFallback title={section.title} />}>
                          <Component
                            form={form}
                            frequency={frequency}
                            setFrequency={(freq: any) => form.setValue('frequency', freq)}
                            isRegularCleaning={true}
                            onComplete={handleSectionComplete}
                            onSuggestedTimeSelect={handleSuggestedTimeSelect}
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
