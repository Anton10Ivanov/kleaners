
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
const EnhancedMobileHours = lazy(() => import('./EnhancedMobileHours'));
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

  // Auto-advancement logic - improved
  useEffect(() => {
    const currentSectionData = visibleSections[currentSection];
    if (currentSectionData && currentSectionData.isComplete(formData)) {
      setCompletedSections(prev => new Set([...prev, currentSection]));
      
      // Auto-advance after completion with shorter delay
      const timer = setTimeout(() => {
        if (currentSection < visibleSections.length - 1) {
          handleSectionComplete();
        }
      }, 400); // Reduced from 600ms

      return () => clearTimeout(timer);
    }
  }, [formData, currentSection, visibleSections]);

  const handleSectionComplete = () => {
    if (currentSection < visibleSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      
      // Load next sections proactively
      setLoadedSections(prev => new Set([...prev, nextSection, nextSection + 1, nextSection + 2]));
      
      // Smooth scroll to next section
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
    setLoadedSections(prev => new Set([...prev, index, index + 1]));
    
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth', 
      block: 'start' 
    });
  };

  const getAnimationProps = (index: number) => {
    if (prefersReducedMotion) return {};
    
    return {
      initial: { opacity: 0, y: 15 },
      animate: { 
        opacity: index <= currentSection ? 1 : 0.4, 
        y: index <= currentSection ? 0 : 15,
        scale: index <= currentSection ? 1 : 0.98
      },
      transition: { duration: 0.2, delay: Math.min(index * 0.05, 0.15) }
    };
  };

  return (
    <div className="space-y-2 px-1">
      <div className="space-y-2">
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
                p-2 transition-all duration-200 
                ${isCompleted ? 'ring-1 ring-green-200 bg-green-50/20 dark:bg-green-900/5' : ''}
                ${index === currentSection ? 'ring-1 ring-primary/20 shadow-sm' : ''}
              `}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    {isCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
                    <span className="text-base mr-1">{section.icon}</span>
                    {section.title}
                  </h3>
                  {index === currentSection && (
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
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
