import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Clock, Euro, Key, CheckCircle } from 'lucide-react';

type FlowType22 = 'one-time' | 'recurring';
type Step22 = 0 | 1 | 2 | 3 | 4 | 5;
type Frequency22 = 'weekly' | 'biweekly' | 'monthly';
type ClutterLevel22 = 'minimalist' | 'lived-in' | 'cluttered' | 'full';
type Package22 = 'basic' | 'standard' | 'premium';
type FlexibilityType22 = 'flexible' | 'preferred' | 'fixed';

interface BookingData22 {
  flowType: FlowType22 | null;
  propertySize: number;
  clutterLevel: ClutterLevel22 | null;
  hours: number;
  frequency: Frequency22 | null;
  package: Package22 | null;
  flexibilityType: FlexibilityType22 | null;
  preferredDay: string;
  preferredTime: string;
  selectedDate: Date | null;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  keyAccess: boolean;
}

const HomeCleaning22 = () => {
  const [currentStep22, setCurrentStep22] = useState<Step22>(0);
  const [bookingData22, setBookingData22] = useState<BookingData22>({
    flowType: null,
    propertySize: 70,
    clutterLevel: null,
    hours: 3,
    frequency: null,
    package: null,
    flexibilityType: null,
    preferredDay: '',
    preferredTime: '',
    selectedDate: null,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    keyAccess: false
  });

  // Calculate recommended hours based on property size and clutter
  const calculateRecommendedHours22 = (size: number, clutter: ClutterLevel22 | null): number => {
    let baseHours = Math.ceil(size / 30); // Base calculation
    const clutterMultiplier = {
      minimalist: 0.8,
      'lived-in': 1.0,
      cluttered: 1.3,
      full: 1.6
    };
    
    if (clutter) {
      baseHours = Math.ceil(baseHours * clutterMultiplier[clutter]);
    }
    
    return Math.max(3, baseHours); // Minimum 3 hours
  };

  // Calculate pricing with discounts
  const calculatePrice22 = (hours: number, frequency: Frequency22 | null, flexibilityType: FlexibilityType22 | null): number => {
    const baseRate = 50; // €50/hour
    let price = hours * baseRate;
    
    if (frequency) {
      price *= 0.9; // 10% recurring discount
      
      if (flexibilityType === 'flexible') {
        price *= 0.95; // Additional 5% for flexibility (15% total)
      }
    }
    
    return Math.round(price);
  };

  // Calculate monthly total for recurring plans
  const calculateMonthlyTotal22 = (pricePerClean: number, frequency: Frequency22): number => {
    const cleansPerMonth = {
      weekly: 4,
      biweekly: 2,
      monthly: 1
    };
    
    return pricePerClean * cleansPerMonth[frequency];
  };

  const updateBookingData22 = (updates: Partial<BookingData22>) => {
    setBookingData22(prev => ({ ...prev, ...updates }));
  };

  const nextStep22 = () => {
    setCurrentStep22(prev => prev + 1 as Step22);
  };

  const prevStep22 = () => {
    setCurrentStep22(prev => Math.max(0, prev - 1) as Step22);
  };

  // Step 0: Service Selection
  const renderStep0 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Find Your Cleaning Solution</CardTitle>
        <p className="text-lg text-muted-foreground">Choose the option that fits your needs.</p>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        {/* One-Time Clean */}
        <Card className="border-2 hover:border-primary cursor-pointer transition-colors"
              onClick={() => { updateBookingData22({ flowType: 'one-time' }); nextStep22(); }}>
          <CardHeader>
            <CardTitle className="text-xl text-center">Try Us Out</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Perfect for your first clean</strong> or if you need flexibility.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>No commitment required.</strong> Book once and see if we're the right fit.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Pay a flat rate based on the time we work (<strong>€50/hour</strong>).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Secure your spot with a payment today.</strong></span>
            </div>
          </CardContent>
        </Card>

        {/* Recurring Plan */}
        <Card className="border-2 hover:border-primary cursor-pointer transition-colors border-primary"
              onClick={() => { updateBookingData22({ flowType: 'recurring' }); nextStep22(); }}>
          <CardHeader>
            <CardTitle className="text-xl text-center">Never Clean Again</CardTitle>
            <Badge className="mx-auto">Most Popular</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Lock in a regular schedule</strong> and save 10% vs. one-time rates.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Your priority crew</strong> knows your home and your preferences.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Forget upfront payments.</strong> You only pay <em>after</em> we clean.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Requires a 3-month commitment</strong> to secure your discount.</span>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );

  // Flow A Steps (One-Time)
  const renderOneTimeEstimate = () => {
    const recommendedHours = calculateRecommendedHours22(bookingData22.propertySize, bookingData22.clutterLevel);
    const estimatedPrice = calculatePrice22(recommendedHours, null, null);

    useEffect(() => {
      updateBookingData22({ hours: recommendedHours });
    }, [recommendedHours]);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Let's see what you need.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="propertySize22">Property Size (sq. m.)</Label>
            <Input
              id="propertySize22"
              type="number"
              value={bookingData22.propertySize}
              onChange={(e) => updateBookingData22({ propertySize: parseInt(e.target.value) || 70 })}
              min="30"
              max="500"
            />
          </div>

          <div className="space-y-2">
            <Label>How would you describe the clutter level?</Label>
            <Select onValueChange={(value: ClutterLevel22) => updateBookingData22({ clutterLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select clutter level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="lived-in">Lived-in</SelectItem>
                <SelectItem value="cluttered">Cluttered</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {bookingData22.clutterLevel && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-center">
                  For a home of <strong>{bookingData22.propertySize} sq. m.</strong>, we recommend starting with{' '}
                  <strong>{recommendedHours} hours</strong> to see a real difference.
                </p>
                <p className="text-center text-xl font-semibold mt-2">
                  Estimated Price: {recommendedHours}h × €50/h = <span className="text-green-600">€{estimatedPrice}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={nextStep22} 
            className="w-full" 
            disabled={!bookingData22.clutterLevel}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderTimeAdjustment = () => {
    const currentPrice = calculatePrice22(bookingData22.hours, null, null);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Adjust & Confirm Time</CardTitle>
          <p className="text-muted-foreground">
            You can book fewer hours to start. We'll focus on the most important areas to show you what we can do.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => updateBookingData22({ hours: Math.max(3, bookingData22.hours - 1) })}
              disabled={bookingData22.hours <= 3}
            >
              -
            </Button>
            <div className="text-center">
              <div className="text-3xl font-bold">{bookingData22.hours}</div>
              <div className="text-sm text-muted-foreground">hours</div>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => updateBookingData22({ hours: bookingData22.hours + 1 })}
            >
              +
            </Button>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">€{currentPrice}</div>
              <div className="text-sm text-muted-foreground">Total Price</div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={prevStep22} className="flex-1">
              Back
            </Button>
            <Button onClick={nextStep22} className="flex-1">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Flow B Steps (Recurring)
  const renderFrequencySelection = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Smart choice! Let's get your schedule set up.</CardTitle>
        <p className="text-lg"><strong>Enjoy between 10% and 15% off</strong> for scheduling regularly. The more flexible you are, the more you save!</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={bookingData22.frequency || ''}
          onValueChange={(value: Frequency22) => updateBookingData22({ frequency: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly22" />
            <Label htmlFor="weekly22" className="text-lg">Weekly</Label>
            <Badge variant="secondary">Most Popular</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="biweekly" id="biweekly22" />
            <Label htmlFor="biweekly22" className="text-lg">Every 2 Weeks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly22" />
            <Label htmlFor="monthly22" className="text-lg">Every 4 Weeks</Label>
          </div>
        </RadioGroup>

        {bookingData22.frequency && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <p className="font-semibold">Our recurring plans require a minimum commitment of 3 months.</p>
              <p className="text-sm mt-2">
                This allows us to reserve your spot in our schedule and guarantee your discount. 
                You can cancel anytime after your third clean.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={prevStep22} className="flex-1">
            Back
          </Button>
          <Button 
            onClick={nextStep22} 
            className="flex-1"
            disabled={!bookingData22.frequency}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPackageSelection = () => {
    const packages = [
      { id: 'basic', name: 'Basic Clean', hours: 2, basePrice: 100 },
      { id: 'standard', name: 'Standard Clean', hours: 3, basePrice: 150 },
      { id: 'premium', name: 'Premium Clean', hours: 4, basePrice: 200 }
    ];

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Find Your Package</CardTitle>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>• Studio / 1-bed: ~50-70m²</div>
            <div>• 2-bed Apartment: ~70-90m²</div>
            <div>• 3-bed Home: ~90-120m²</div>
            <div>• 4+bed Home: 120m²+</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="propertySizeRecurring22">What is your home's size? (sq. m.)</Label>
            <Input
              id="propertySizeRecurring22"
              type="number"
              value={bookingData22.propertySize}
              onChange={(e) => updateBookingData22({ propertySize: parseInt(e.target.value) || 70 })}
              min="30"
              max="500"
            />
          </div>

          <div className="space-y-2">
            <Label>How would you describe the clutter level?</Label>
            <Select onValueChange={(value: ClutterLevel22) => updateBookingData22({ clutterLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select clutter level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="lived-in">Lived-in</SelectItem>
                <SelectItem value="cluttered">Cluttered</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {bookingData22.clutterLevel && (
            <div className="grid md:grid-cols-3 gap-4">
              {packages.map((pkg) => {
                const discountedPrice = calculatePrice22(pkg.hours, bookingData22.frequency, null);
                const monthlyTotal = bookingData22.frequency ? calculateMonthlyTotal22(discountedPrice, bookingData22.frequency) : 0;
                
                return (
                  <Card 
                    key={pkg.id}
                    className={`cursor-pointer border-2 transition-colors ${
                      bookingData22.package === pkg.id ? 'border-primary' : 'hover:border-primary'
                    }`}
                    onClick={() => updateBookingData22({ package: pkg.id as Package22, hours: pkg.hours })}
                  >
                    <CardHeader>
                      <CardTitle className="text-center">{pkg.name}</CardTitle>
                      <p className="text-center text-sm text-muted-foreground">{pkg.hours}h base</p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="space-y-1">
                        <div className="text-sm line-through text-muted-foreground">
                          Standard: €{pkg.basePrice}
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                          Your Price: €{discountedPrice} (-10%)
                        </div>
                        {bookingData22.frequency && (
                          <div className="text-sm">
                            Monthly Total: €{monthlyTotal}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={prevStep22} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={nextStep22} 
              className="flex-1"
              disabled={!bookingData22.package}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFlexibilityOptions = () => {
    const basePrice = calculatePrice22(bookingData22.hours, bookingData22.frequency, null);
    const flexiblePrice = calculatePrice22(bookingData22.hours, bookingData22.frequency, 'flexible');
    const monthlyFlexible = bookingData22.frequency ? calculateMonthlyTotal22(flexiblePrice, bookingData22.frequency) : 0;
    const monthlyStandard = bookingData22.frequency ? calculateMonthlyTotal22(basePrice, bookingData22.frequency) : 0;

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Maximize your savings! How flexible can you be?</CardTitle>
          <p className="text-muted-foreground">Help us optimize our routes and we'll reward you with an extra discount.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={bookingData22.flexibilityType || ''}
            onValueChange={(value: FlexibilityType22) => updateBookingData22({ flexibilityType: value })}
          >
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="flexible" id="flexible22" />
                <Label htmlFor="flexible22" className="text-lg font-semibold">
                  💰 Flexible Super Saver (Extra 5% Discount - 15% Total)
                </Label>
              </div>
              <p className="ml-6 text-sm">
                I provide key access/am always home. Schedule me on any weekday within 8 AM - 6 PM.
              </p>
              <div className="ml-6 mt-2 text-green-600 font-semibold">
                Save an extra 5% (15% total off!) - €{monthlyFlexible}/month
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="preferred" id="preferred22" />
                <Label htmlFor="preferred22" className="text-lg font-semibold">
                  👍 Preferred Window (Standard Discount - 10% Total)
                </Label>
              </div>
              <p className="ml-6 text-sm">
                I prefer a specific window. Choose a day and a 4-hour block.
              </p>
              <div className="ml-6 mt-2 text-blue-600 font-semibold">
                Your standard 10% discount applies - €{monthlyStandard}/month
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="fixed" id="fixed22" />
                <Label htmlFor="fixed22" className="text-lg font-semibold">
                  ⏰ Fixed Time (Standard Discount - 10% Total)
                </Label>
              </div>
              <p className="ml-6 text-sm">
                I need a guaranteed time. Choose a day and exact start time.
              </p>
              <div className="ml-6 mt-2 text-blue-600 font-semibold">
                Your standard 10% discount applies - €{monthlyStandard}/month
              </div>
            </Card>
          </RadioGroup>

          <div className="flex gap-3">
            <Button variant="outline" onClick={prevStep22} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={nextStep22} 
              className="flex-1"
              disabled={!bookingData22.flexibilityType}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Final step for both flows
  const renderFinalDetails = () => {
    const isRecurring = bookingData22.flowType === 'recurring';
    const finalPrice = calculatePrice22(
      bookingData22.hours, 
      bookingData22.frequency, 
      bookingData22.flexibilityType
    );
    const monthlyTotal = isRecurring && bookingData22.frequency ? 
      calculateMonthlyTotal22(finalPrice, bookingData22.frequency) : 0;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {isRecurring ? 'Enter Details & Start Subscription' : 'Enter Details & Pay'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name22">Full Name</Label>
              <Input
                id="name22"
                value={bookingData22.customerInfo.name}
                onChange={(e) => updateBookingData22({
                  customerInfo: { ...bookingData22.customerInfo, name: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email22">Email</Label>
              <Input
                id="email22"
                type="email"
                value={bookingData22.customerInfo.email}
                onChange={(e) => updateBookingData22({
                  customerInfo: { ...bookingData22.customerInfo, email: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone22">Phone Number</Label>
            <Input
              id="phone22"
              value={bookingData22.customerInfo.phone}
              onChange={(e) => updateBookingData22({
                customerInfo: { ...bookingData22.customerInfo, phone: e.target.value }
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address22">Address</Label>
            <Input
              id="address22"
              value={bookingData22.customerInfo.address}
              onChange={(e) => updateBookingData22({
                customerInfo: { ...bookingData22.customerInfo, address: e.target.value }
              })}
            />
          </div>

          {isRecurring && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keyAccess22"
                checked={bookingData22.keyAccess}
                onCheckedChange={(checked) => updateBookingData22({ keyAccess: !!checked })}
              />
              <Label htmlFor="keyAccess22">Will you provide key/access code for even faster service?</Label>
            </div>
          )}

          {/* Payment Summary */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              {isRecurring ? (
                <div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg">No Charge Today. Only Pay After We Clean.</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll securely store your card and charge you after each clean is completed. 
                      You only ever pay for service you've received.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">€{monthlyTotal} / month</div>
                    <div className="text-sm text-green-600">
                      {bookingData22.flexibilityType === 'flexible' ? '15% off' : '10% off'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold">€{finalPrice}</div>
                  <div className="text-sm text-muted-foreground">Total Price</div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={prevStep22} className="flex-1">
              Back
            </Button>
            <Button className="flex-1">
              {isRecurring ? 'Start My Plan & Save' : `Book & Pay €${finalPrice}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCurrentStep = () => {
    if (currentStep22 === 0) return renderStep0();
    
    if (bookingData22.flowType === 'one-time') {
      switch (currentStep22) {
        case 1: return renderOneTimeEstimate();
        case 2: return renderTimeAdjustment();
        case 3: return renderFinalDetails();
        default: return renderStep0();
      }
    } else {
      switch (currentStep22) {
        case 1: return renderFrequencySelection();
        case 2: return renderPackageSelection();
        case 3: return renderFlexibilityOptions();
        case 4: return renderFinalDetails();
        default: return renderStep0();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Home Cleaning 22</h1>
          <p className="text-lg text-muted-foreground mt-2">Professional cleaning service booking</p>
        </div>
        
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default HomeCleaning22;