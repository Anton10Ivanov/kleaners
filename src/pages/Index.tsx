
import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ServiceOptions from '../components/booking/ServiceOptions';
import ProgressBar from '../components/booking/ProgressBar';
import BookingSummary from '../components/booking/BookingSummary';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [hours, setHours] = useState(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const calculateRecommendedTime = () => {
    const baseTime = 2; // Base cleaning time
    const bedroomTime = bedrooms * 0.5; // 30 mins per bedroom
    const bathroomTime = bathrooms * 0.5; // 30 mins per bathroom
    return Math.max(2, Math.ceil(baseTime + bedroomTime + bathroomTime));
  };

  const renderFinalStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Almost done!</h3>
        <p className="text-gray-600">
          Please review your booking details and confirm.
        </p>
      </div>
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) {
        toast.error("Please select a service type");
        return;
      }
      if (selectedService !== 'regular' && selectedService !== 'deep') {
        toast.error("This service is currently not available");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const calculatePrice = (basePrice: number) => {
    let price = basePrice;
    if (frequency === 'weekly') {
      price *= 0.8;
    } else if (frequency === 'biweekly') {
      price *= 0.9;
    }
    return price;
  };

  const currentPrice = calculatePrice(frequency === 'weekly' ? 29 : frequency === 'biweekly' ? 32 : 34);

  return (
    <div className="min-h-screen font-raleway bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {currentStep === 1 ? (
        <>
          <Hero 
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNextStep={handleNextStep}
          />
          <Services />
          <WhyChooseUs />
          <Testimonials />
        </>
      ) : (
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ProgressBar currentStep={currentStep} />
            
            <div className="flex gap-8">
              <div className="w-[70%]">
                {currentStep === 2 && selectedService === 'regular' && (
                  <>
                    <ServiceOptions frequency={frequency} setFrequency={setFrequency} />
                    <div className="pt-4 text-center">
                      <p className="text-muted-foreground">
                        We recommend you {calculateRecommendedTime()} hours of cleaning
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Living room, kitchen & all commons areas are included!
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        setHours(calculateRecommendedTime());
                      }}
                    >
                      Apply Recommendation
                    </Button>
                  </>
                )}
                {currentStep === 2 && selectedService === 'deep' && renderFinalStep()}
                {currentStep === 3 && renderFinalStep()}
              </div>
              <div className="w-[30%]">
                <BookingSummary 
                  selectedService={selectedService}
                  frequency={frequency}
                  hours={hours}
                  currentPrice={currentPrice}
                />
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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Index;
