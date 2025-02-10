import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, ArrowLeft, Feather, Shield, Clock, Phone, Check, Minus, Plus, Info, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [hours, setHours] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [accessMethod, setAccessMethod] = useState<string[]>([]);
  
  const [instructions, setInstructions] = useState('');
  const [hasPets, setHasPets] = useState(false);
  
  const [promoCode, setPromoCode] = useState('');

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedService) {
      toast.error("Please select a service type");
      return;
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

  const extraServices = [
    { id: 'windows', name: 'Windows', icon: <Shield className="w-6 h-6" />, price: 15 },
    { id: 'dishes', name: 'Dishes', icon: <Feather className="w-6 h-6" />, price: 10 },
    { id: 'laundry', name: 'Laundry', icon: <Clock className="w-6 h-6" />, price: 12 },
    { id: 'fridge', name: 'Fridge', icon: <Phone className="w-6 h-6" />, price: 20 },
  ];

  const toggleExtra = (extraId: string) => {
    setExtras(current =>
      current.includes(extraId)
        ? current.filter(id => id !== extraId)
        : [...current, extraId]
    );
  };

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

  const renderInitialStep = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Select Your Service</h3>
      <div className="grid grid-cols-3 gap-6">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular Cleaning</SelectItem>
            <SelectItem value="deep">Deep Cleaning</SelectItem>
            <SelectItem value="moving">Move In/Out Cleaning</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          type="text"
          placeholder="Enter postal code or city"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full"
        />
        
        <Button 
          onClick={handleNextStep}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderServiceOptions = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">How often should we clean?</h3>
      <div className="grid grid-cols-3 gap-6">
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'onetime' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('onetime')}
        >
          <h4 className="font-semibold mb-2">One Time</h4>
          <p className="text-gray-600">{34.00} €/hour</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all relative ${frequency === 'weekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('weekly')}
        >
          {frequency === 'weekly' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
          )}
          <h4 className="font-semibold mb-2">Weekly</h4>
          <p className="text-gray-600">{29.00} €/hour</p>
          <p className="text-sm text-gray-500 mt-2">You get the same cleaning professional</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'biweekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('biweekly')}
        >
          <h4 className="font-semibold mb-2">Every 2 Weeks</h4>
          <p className="text-gray-600">{32.00} €/hour</p>
          <p className="text-sm text-gray-500 mt-2">You get the same cleaning professional</p>
        </div>
      </div>
    </div>
  );

  const renderExtras = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Which extras would you be interested in?</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {extraServices.map((service) => (
          <div
            key={service.id}
            onClick={() => toggleExtra(service.id)}
            className={`flex flex-col items-center text-center space-y-2 cursor-pointer`}
          >
            <div className={`p-4 border rounded-lg transition-all ${extras.includes(service.id) ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}>
              {service.icon}
            </div>
            <span className="font-medium">{service.name}</span>
            <span className="text-sm text-gray-500">+{service.price}€</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHoursSelection = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">How much time would you need?</h3>
        <Button variant="link" className="text-primary">
          Calculate Time
        </Button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setHours(prev => Math.max(2, prev - 0.5))}
          disabled={hours <= 2}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold min-w-[100px] text-center">{hours} hours</span>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setHours(prev => prev + 0.5)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
        <Info className="w-4 h-4 mr-2" />
        Minimum booking: 2 hours
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Choose your preferred date</h3>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-4">Available Times</h4>
          <div className="grid grid-cols-3 gap-2">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'].map((time) => (
              <Button
                key={time}
                variant="outline"
                className="w-full"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
          {extras.length > 0 && (
            <div className="space-y-2">
              <div className="font-medium">Extra Services:</div>
              {extras.map(extraId => {
                const service = extraServices.find(s => s.id === extraId);
                return service ? (
                  <div key={extraId} className="flex items-center gap-3 pl-4">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>{service.name}</span>
                    <span className="ml-auto">+{service.price}€</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
          {date && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>{date.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          )}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between font-semibold">
              <span>TOTAL</span>
              <span>
                {(
                  currentPrice * hours +
                  extras.reduce((acc, extraId) => {
                    const service = extraServices.find(s => s.id === extraId);
                    return acc + (service?.price || 0);
                  }, 0)
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
    <div className="min-h-screen font-raleway bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {renderProgressBar()}
          
          <div className="flex gap-8">
            <div className="w-[70%]">
              {currentStep === 1 && renderInitialStep()}
              {currentStep === 2 && (
                <>
                  {renderServiceOptions()}
                  {renderHoursSelection()}
                  {renderExtras()}
                  {renderCalendar()}
                </>
              )}
              {currentStep === 3 && renderFinalStep()}
            </div>
            <div className="w-[30%]">
              {renderSummary()}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button 
                onClick={handleBackStep}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {currentStep < 3 && (
              <div className="ml-auto">
                <Button 
                  onClick={handleNextStep}
                  className="bg-primary hover:bg-primary/90"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
