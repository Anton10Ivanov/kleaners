
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ProgressBar from '../components/booking/ProgressBar';
import BookingSummary from '../components/booking/BookingSummary';
import BookingContent from '../components/booking/BookingContent';
import { AnimatePresence, motion } from 'framer-motion';
import { useBookingForm } from '../hooks/useBookingForm';
import { calculatePrice } from '../utils/bookingCalculations';

const Index = () => {
  const { form, currentStep, handleNextStep, handleBackStep, watch, setValue } = useBookingForm();

  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const date = watch('date');
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const selectedExtras = watch('extras') || [];

  const currentPrice = calculatePrice(
    frequency || 'onetime',
    frequency === 'weekly' ? 29 : frequency === 'biweekly' ? 32 : 34
  );

  return (
    <div className="min-h-screen font-raleway bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Hero 
              selectedService={selectedService || ''}
              setSelectedService={(service) => setValue('service', service)}
              postalCode={watch('postalCode')}
              setPostalCode={(code) => setValue('postalCode', code)}
              handleNextStep={handleNextStep}
            />
            <Services />
            <WhyChooseUs />
            <Testimonials />
          </motion.div>
        ) : (
          <motion.div
            className="pt-32 pb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              <ProgressBar currentStep={currentStep} />
              
              <div className="flex flex-col md:flex-row gap-8">
                <BookingContent 
                  currentStep={currentStep}
                  selectedService={selectedService || ''}
                  frequency={frequency || ''}
                  hours={hours}
                  date={date}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  selectedExtras={selectedExtras}
                  setValue={setValue}
                />
                <div className="w-full md:w-[30%]">
                  <div className="md:sticky md:top-8">
                    <BookingSummary 
                      selectedService={selectedService || ''}
                      frequency={frequency || ''}
                      hours={hours}
                      currentPrice={currentPrice}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={handleBackStep}
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < 3 && (
                  <Button 
                    onClick={handleNextStep}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Index;
