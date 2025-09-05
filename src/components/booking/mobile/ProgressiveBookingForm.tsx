
import { useState, useEffect, useRef } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { HomeDetailsSection } from '../HomeDetailsSection';
import ServiceOptions from '../ServiceOptions';
import MobileHoursSelection from './MobileHoursSelection';
import MobileCalendar from './MobileCalendar';
import MobileTimeSelection from './MobileTimeSelection';
import EnhancedExtras from '../EnhancedExtras';

interface ProgressiveBookingFormProps {
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
}

const ProgressiveBookingForm = ({ form, currentStep, onStepChange }: ProgressiveBookingFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const formData = form.watch();
  const frequency = form.watch('frequency');

  // Form sections configuration
  const sections: FormSection[] = [
    {
      id: 'home-details',
      title: 'About Your Home',
      component: HomeDetailsSection,
      isComplete: (data) => data.propertySize > 0 && data.bedrooms > 0 && data.bathrooms > 0,
      required: true
    },
    {
      id: 'frequency',
      title: 'Cleaning Frequency',
      component: ServiceOptions,
      isComplete: (data) => !!data.frequency,
      required: true
    },
    {
      id: 'hours',
      title: 'Duration',
      component: MobileHoursSelection,
      isComplete: (data) => data.hours > 0,
      required: true
    },
    {
      id: 'calendar',
      title: 'Date',
      component: MobileCalendar,
      isComplete: (data) => !!data.date,
      required: frequency !== Frequency.Custom
    },
    {
      id: 'time',
      title: 'Time',
      component: MobileTimeSelection,
      isComplete: (data) => !!data.preferredTime,
      required: frequency !== Frequency.Custom
    },
    {
      id: 'extras',
      title: 'Additional Services',
      component: EnhancedExtras,
      isComplete: () => true, // Optional section
      required: false
    }
  ];

  // Filter sections based on requirements
  const visibleSections = sections.filter(section => 
    section.required || section.id === 'extras'
  );

  // Browser back button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (currentSection > 0) {
        event.preventDefault();
        setCurrentSection(prev => Math.max(0, prev - 1));
        window.history.pushState(null, '', window.location.pathname);
      } else if (currentStep > 1) {
        onStepChange(currentStep - 1);
      }
    };

    // Push initial state
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentSection, currentStep, onStepChange]);

  // Check section completion and auto-advance
  useEffect(() => {
    const currentSectionData = visibleSections[currentSection];
    if (currentSectionData && currentSectionData.isComplete(formData)) {
      setCompletedSections(prev => new Set([...prev, currentSection]));
      
      // Auto-advance after a short delay
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
      setCurrentSection(prev => prev + 1);
      // Smooth scroll to next section
      setTimeout(() => {
        sectionRefs.current[currentSection + 1]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <div className="space-y-4">
      {/* Progress indicators */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {visibleSections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap
              transition-all duration-200
              ${index === currentSection 
                ? 'bg-primary text-white' 
                : completedSections.has(index)
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            {completedSections.has(index) && (
              <CheckCircle className="h-3 w-3" />
            )}
            <span>{section.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Form sections */}
      <div className="space-y-6">
        {visibleSections.map((section, index) => {
          const Component = section.component;
          const isActive = index <= currentSection;
          const isCompleted = completedSections.has(index);

          return (
            <motion.div
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3, 
                y: isActive ? 0 : 20,
                scale: isActive ? 1 : 0.95
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative ${!isActive ? 'pointer-events-none' : ''}`}
            >
              <Card className={`
                p-6 transition-all duration-300
                ${isCompleted ? 'ring-2 ring-green-200 bg-green-50/30 dark:bg-green-900/10' : ''}
                ${index === currentSection ? 'ring-2 ring-primary/20' : ''}
              `}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {section.title}
                  </h3>
                  {index === currentSection && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Component
                        form={form}
                        frequency={frequency}
                        setFrequency={(freq: any) => form.setValue('frequency', freq)}
                        isRegularCleaning={true}
                        onComplete={handleSectionComplete}
                        onSuggestedTimeSelect={(hours: number) => form.setValue('hours', hours)}
                      />
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

export default ProgressiveBookingForm;
