import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ServiceOptions from '../components/booking/ServiceOptions';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Check, Minus, Plus, Info, Clock } from 'lucide-react';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [hours, setHours] = useState(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [instructions, setInstructions] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cleanlinessLevel, setCleanlinessLevel] = useState(2);
  const [lastCleaningLevel, setLastCleaningLevel] = useState(2);
  const [deepCleaningIssues, setDeepCleaningIssues] = useState({
    mold: false,
    feces: false,
    animalHair: false,
    flood: false,
    cloggedDrains: false,
    cloggedToilets: false
  });

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

  const renderProgressBar = () => (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          1
        </div>
        <div className="ml-2">Service Details</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${(currentStep - 1) * 50}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          2
        </div>
        <div className="ml-2">Cleaning Details</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${Math.max(0, (currentStep - 2) * 50)}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          3
        </div>
        <div className="ml-2">Schedule</div>
      </div>
    </div>
  );

  const renderTimeCalculator = () => (
    <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculate Cleaning Time</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Bedrooms</label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBedrooms(prev => Math.max(1, prev - 1))}
                  disabled={bedrooms <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold min-w-[40px] text-center">{bedrooms}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBedrooms(prev => Math.min(10, prev + 1))}
                  disabled={bedrooms >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bathrooms</label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBathrooms(prev => Math.max(1, prev - 1))}
                  disabled={bathrooms <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold min-w-[40px] text-center">{bathrooms}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBathrooms(prev => Math.min(10, prev + 1))}
                  disabled={bathrooms >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-4 text-center">
              <p className="text-muted-foreground">
                We recommend you {calculateRecommendedTime()} hours of cleaning
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Living room, kitchen & all commons areas are included!
              </p>
            </div>
          </div>
          <Button 
            onClick={() => {
              setHours(calculateRecommendedTime());
              setIsCalculatorOpen(false);
            }}
          >
            Apply Recommendation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const calculateRecommendedTime = () => {
    return Math.min(Math.max(bathrooms * 0.5 + bedrooms * 0.5 + 1, 2), 8);
  };

  const renderFinalStep = () => (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Cleaning Address</h3>
        <div className="space-y-4">
          <Input
            placeholder="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="How can we get in?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="keys">Keys will be provided</SelectItem>
              <SelectItem value="present">Someone will be present</SelectItem>
              <SelectItem value="code">Door code will be provided</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Special Instructions</h3>
        <Textarea
          placeholder="Any special instructions for our cleaning team?"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mb-4"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pets"
            checked={hasPets}
            onCheckedChange={(checked) => setHasPets(checked as boolean)}
          />
          <label htmlFor="pets" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Do you have pets?
          </label>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Promo Code</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button variant="outline">Apply</Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
        <div className="space-y-4">
          <Input placeholder="Card Number" />
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="MM/YY" />
            <Input placeholder="CVC" />
            <Input placeholder="ZIP Code" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => {
    if (currentStep === 1) return null;
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
        <h3 className="text-xl font-semibold mb-6">Summary</h3>
        <div className="space-y-4">
          {selectedService && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-400" />
              <span>{selectedService === 'regular' ? 'Regular Cleaning' : selectedService === 'deep' ? 'Deep Cleaning' : 'Move In/Out Cleaning'}</span>
            </div>
          )}
          {frequency && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
              <span className="ml-auto">{currentPrice.toFixed(2)} €/h</span>
            </div>
          )}
          {hours > 0 && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{hours} Cleaning Hours</span>
            </div>
          )}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between font-semibold">
              <span>TOTAL</span>
              <span>
                {(
                  currentPrice * hours
                ).toFixed(2)} €
              </span>
            </div>
            <div className="text-sm text-gray-500">per cleaning</div>
          </div>
        </div>
      </div>
    );
  };

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
            {renderProgressBar()}
            
            <div className="flex gap-8">
              <div className="w-[70%]">
                {currentStep === 2 && selectedService === 'regular' && (
                  <>
                    <ServiceOptions frequency={frequency} setFrequency={setFrequency} />
                    {renderTimeCalculator()}
                  </>
                )}
                {currentStep === 2 && selectedService === 'deep' && renderFinalStep()}
                {currentStep === 3 && renderFinalStep()}
              </div>
              <div className="w-[30%]">
                {renderSummary()}
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
