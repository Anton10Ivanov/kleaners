import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Sparkles, Shield, Clock, Phone, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isFlexible, setIsFlexible] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const validatePostalCode = (code: string) => code === "1";

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) {
        toast.error("Please select a service");
        return;
      }
      if (!validatePostalCode(postalCode)) {
        toast.error("Service not available in your area");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const calculatePrice = (basePrice: number) => {
    let price = basePrice;
    if (frequency === 'weekly') {
      price *= 0.8; // 20% discount for weekly
    } else if (frequency === 'biweekly') {
      price *= 0.9; // 10% discount for bi-weekly
    }
    if (isFlexible) price *= 0.95; // 5% discount for flexible timing
    if (hasKey) price *= 0.95; // 5% discount for key access
    return price;
  };

  const renderStep1 = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Select Service</h3>
        <RadioGroup value={selectedService} onValueChange={setSelectedService}>
          {services.map((service) => (
            <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value={service.id} id={service.id} />
              <div className="space-y-1">
                <Label htmlFor={service.id}>{service.title}</Label>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Enter Postal Code</h3>
        <div className="flex space-x-4">
          <Input 
            type="text" 
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            className="w-full"
          />
          <Button onClick={handleNextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Cleaning Frequency</h3>
      <RadioGroup value={frequency} onValueChange={setFrequency}>
        <div className="grid gap-4">
          <div className="relative flex items-start p-4 border rounded-lg">
            {frequency === 'weekly' && (
              <div className="absolute -top-2 -right-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
                Best Value!
              </div>
            )}
            <RadioGroupItem value="weekly" id="weekly" />
            <div className="ml-3 space-y-1">
              <Label htmlFor="weekly">Weekly Cleaning</Label>
              <p className="text-sm text-gray-500">
                ${calculatePrice(30)}/hour (20% discount)
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 border rounded-lg">
            <RadioGroupItem value="biweekly" id="biweekly" />
            <div className="ml-3 space-y-1">
              <Label htmlFor="biweekly">Bi-weekly Cleaning</Label>
              <p className="text-sm text-gray-500">
                ${calculatePrice(35)}/hour (10% discount)
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 border rounded-lg">
            <RadioGroupItem value="onetime" id="onetime" />
            <div className="ml-3 space-y-1">
              <Label htmlFor="onetime">One-time Cleaning</Label>
              <p className="text-sm text-gray-500">${calculatePrice(40)}/hour</p>
            </div>
          </div>
        </div>
      </RadioGroup>
      <Button onClick={handleNextStep} className="mt-4">Next</Button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Additional Options</h3>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full"
        />
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flexible"
              checked={isFlexible}
              onCheckedChange={(checked) => setIsFlexible(checked as boolean)}
            />
            <label htmlFor="flexible" className="text-sm">
              Flexible timing (5% discount)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="key"
              checked={hasKey}
              onCheckedChange={(checked) => setHasKey(checked as boolean)}
            />
            <label htmlFor="key" className="text-sm">
              Key access available (5% discount)
            </label>
          </div>
        </div>
      </div>
      <Button onClick={handleNextStep}>Next</Button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Payment</h3>
      <div className="p-6 border rounded-lg">
        <div className="space-y-2">
          <p className="text-lg font-medium">Order Summary</p>
          <div className="flex justify-between">
            <span>Service:</span>
            <span>{services.find(s => s.id === selectedService)?.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Frequency:</span>
            <span>{frequency}</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${calculatePrice(frequency === 'weekly' ? 30 : frequency === 'biweekly' ? 35 : 40)}/hour</span>
          </div>
        </div>
      </div>
      <Button onClick={() => toast.success("Booking completed!")}>Complete Booking</Button>
    </div>
  );

  return (
    <div className="min-h-screen font-raleway">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-secondary">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn text-center">
            Book Your Cleaning Service
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Trusted & Reliable"
              description="Fully insured and bonded cleaning services you can trust"
            />
            <Feature
              icon={<Sparkles className="w-8 h-8 text-primary" />}
              title="Expert Team"
              description="Professionally trained and experienced cleaning specialists"
            />
            <Feature
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="Flexible Scheduling"
              description="Convenient scheduling that works around your timetable"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Get in Touch</h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Contact Us
                <Phone size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 SparkleClean. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const services = [
  {
    id: 'home',
    title: "Home Cleaning",
    description: "Comprehensive cleaning services for homes of all sizes",
  },
  {
    id: 'office',
    title: "Office Cleaning",
    description: "Professional cleaning solutions for commercial spaces",
  },
  {
    id: 'deep',
    title: "Deep Cleaning",
    description: "Thorough deep cleaning for a pristine environment",
  },
];

export default Index;
