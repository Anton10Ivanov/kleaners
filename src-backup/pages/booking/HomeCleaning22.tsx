import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from '@/components/ui/mobile-card';
import { MobileForm, MobileFormField, MobileFormLabel } from '@/components/ui/mobile-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Euro, 
  Key, 
  CheckCircle, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Heart, 
  Zap,
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus
} from 'lucide-react';

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

  // Handle automatic hours calculation when property size or clutter changes
  useEffect(() => {
    if (bookingData22.flowType === 'one-time' && bookingData22.clutterLevel) {
      const recommendedHours = calculateRecommendedHours22(bookingData22.propertySize, bookingData22.clutterLevel);
      updateBookingData22({ hours: recommendedHours });
    }
  }, [bookingData22.propertySize, bookingData22.clutterLevel, bookingData22.flowType]);

  const nextStep22 = () => {
    setCurrentStep22(prev => prev + 1 as Step22);
  };

  const prevStep22 = () => {
    setCurrentStep22(prev => Math.max(0, prev - 1) as Step22);
  };

  // Step 0: Service Selection
  const renderStep0 = () => (
    <div className="max-w-5xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-heading-color mb-4 tracking-tight">
          Find Your Cleaning Solution
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the option that fits your needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* One-Time Clean */}
        <MobileCard 
          className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary/30 bg-gradient-to-br from-background to-primary/2"
          onClick={() => { updateBookingData22({ flowType: 'one-time' }); nextStep22(); }}
        >
          <MobileCardHeader className="pb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="card-spacing-sm bg-primary/10 rounded-2xl">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <MobileCardTitle className="text-2xl font-bold">Try Us Out</MobileCardTitle>
            </div>
          </MobileCardHeader>
          <MobileCardContent className="form-spacing-loose">
            <ul className="form-spacing-relaxed">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">Perfect for your first clean</strong> — no commitment required
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">€50/hour</strong> — pay only for the time we work
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">Secure spot with payment</strong> today
                </span>
              </li>
            </ul>
            
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
              Book One-Time
              <ChevronRight className="h-5 w-5" />
            </Button>
          </MobileCardContent>
        </MobileCard>

        {/* Recurring Plan */}
        <MobileCard 
          className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 border-accent/30 bg-gradient-to-br from-background to-accent/5"
          onClick={() => { updateBookingData22({ flowType: 'recurring' }); nextStep22(); }}
        >
          <MobileCardHeader className="pb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="card-spacing-sm bg-accent/10 rounded-2xl">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <MobileCardTitle className="text-2xl font-bold">Never Clean Again</MobileCardTitle>
              </div>
              <Badge className="bg-accent/15 text-accent border-accent/30 font-semibold px-3 py-1">
                Most Popular
              </Badge>
            </div>
          </MobileCardHeader>
          <MobileCardContent className="form-spacing-loose">
            <ul className="form-spacing-relaxed">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">Lock in a regular schedule</strong> & save 10%
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">Your priority crew</strong> — 3-month commitment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary/10 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground leading-relaxed">
                  <strong className="text-heading-color">Pay after each clean</strong> — no upfront costs
                </span>
              </li>
            </ul>
            
            <Button className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
              Subscribe & Save
              <ChevronRight className="h-5 w-5" />
            </Button>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  );

  // Flow A Steps (One-Time)
  const renderOneTimeEstimate = () => {
    const recommendedHours = calculateRecommendedHours22(bookingData22.propertySize, bookingData22.clutterLevel);
    const estimatedPrice = calculatePrice22(recommendedHours, null, null);

    return (
      <div className="max-w-3xl mx-auto px-4 section-spacing-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading-color mb-2">Let's see what you need.</h1>
          <p className="text-muted-foreground text-lg">Get your custom estimate in seconds</p>
        </div>
        
        <MobileCard className="border-2 border-primary/10 shadow-lg">
          <MobileCardContent className="card-spacing-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MobileFormField>
                <MobileFormLabel htmlFor="propertySize22" className="text-lg font-semibold mb-3">
                  Property Size (sq. m.) *
                </MobileFormLabel>
                <Input
                  id="propertySize22"
                  type="number"
                  placeholder="e.g., 85"
                  value={bookingData22.propertySize || ''}
                  onChange={(e) => updateBookingData22({ propertySize: parseInt(e.target.value) || 70 })}
                  className="h-14 text-lg border-2 rounded-xl"
                  min="30"
                  max="500"
                />
                <p className="text-sm text-muted-foreground mt-2">≈ 2-3 rooms</p>
              </MobileFormField>

              <MobileFormField>
                <MobileFormLabel htmlFor="clutterLevel22" className="text-lg font-semibold mb-3">
                  Clutter Level *
                </MobileFormLabel>
                <Select 
                  value={bookingData22.clutterLevel || ''} 
                  onValueChange={(value: ClutterLevel22) => updateBookingData22({ clutterLevel: value })}
                >
                  <SelectTrigger className="h-14 text-lg border-2 rounded-xl">
                    <SelectValue placeholder="How cluttered is your space?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-2 border-border shadow-xl z-50 rounded-xl">
                    <SelectItem value="minimalist" className="text-lg section-spacing-xs cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span>Minimalist</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="lived-in" className="text-lg section-spacing-xs cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>Lived-in</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="cluttered" className="text-lg section-spacing-xs cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span>Cluttered</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="full" className="text-lg section-spacing-xs cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        <span>Full</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </MobileFormField>
            </div>

            {bookingData22.clutterLevel && (
              <div className="mt-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 card-spacing-lg rounded-2xl border-2 border-primary/10">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-heading-color">Your Custom Recommendation</h3>
                  </div>
                  
                  <p className="text-foreground text-lg mb-6 leading-relaxed max-w-lg mx-auto">
                    For a home of <span className="font-bold text-primary text-xl">{bookingData22.propertySize} sq. m.</span>, we recommend starting with <span className="font-bold text-primary text-xl">{recommendedHours} hours</span> to see a real difference.
                  </p>
                  
                  <div className="bg-background/60 card-spacing-md rounded-xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">
                      €{estimatedPrice}
                    </div>
                    <div className="text-muted-foreground text-lg">
                      {recommendedHours}h × €50/h
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep22}
                className="h-14 flex-1 border-2 rounded-xl text-lg font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep22}
                disabled={!bookingData22.clutterLevel}
                className="h-14 flex-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    );
  };

  const renderTimeAdjustment = () => {
    const currentPrice = calculatePrice22(bookingData22.hours, null, null);

    return (
      <div className="max-w-3xl mx-auto px-4 section-spacing-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading-color mb-2">Adjust & Confirm Time</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You can book fewer hours to start. We'll focus on the most important areas to show you what we can do.
          </p>
        </div>
        
        <MobileCard className="border-2 border-primary/10 shadow-lg">
          <MobileCardContent className="card-spacing-lg">
            <div className="text-center component-spacing-xl">
              <div className="inline-flex items-center gap-8 card-spacing-md bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updateBookingData22({ hours: Math.max(3, bookingData22.hours - 1) })}
                  disabled={bookingData22.hours <= 3}
                  className="h-16 w-16 rounded-2xl border-2 border-primary/20 hover:border-primary/40 disabled:opacity-50"
                >
                  <Minus className="h-6 w-6" />
                </Button>
                
                <div className="text-center min-w-[160px]">
                  <div className="text-6xl font-bold text-primary mb-2">{bookingData22.hours}</div>
                  <div className="text-lg text-muted-foreground font-medium">Hours</div>
                </div>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updateBookingData22({ hours: bookingData22.hours + 1 })}
                  className="h-16 w-16 rounded-2xl border-2 border-primary/20 hover:border-primary/40"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>

              <div className="bg-gradient-to-br from-secondary/5 via-background to-primary/5 card-spacing-lg rounded-2xl border-2 border-secondary/20">
                <p className="text-muted-foreground mb-4 text-lg">Updated Price</p>
                <div className="text-5xl font-bold text-secondary mb-2">€{currentPrice}</div>
                <div className="text-sm text-muted-foreground">Total Price</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={prevStep22} 
                className="h-touch flex-1 border-border"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep22} 
                className="h-touch flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    );
  };

  // Flow B Steps (Recurring)
  const renderFrequencySelection = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Smart choice! Let's get your schedule set up.</CardTitle>
        <p className="text-lg"><strong>Enjoy between 10% and 15% off</strong> for scheduling regularly. The more flexible you are, the more you save!</p>
      </CardHeader>
      <CardContent className="form-spacing-loose">
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
        </CardHeader>
        <CardContent className="form-spacing-loose">
          <div className="form-spacing-tight">
            <Label htmlFor="propertySizeRecurring22">What is your home's size?</Label>
            <Select 
              value={bookingData22.propertySize.toString()} 
              onValueChange={(value) => updateBookingData22({ propertySize: parseInt(value) })}
            >
              <SelectTrigger className="h-14 text-lg border-2 rounded-xl">
                <SelectValue placeholder="Select your home size" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-border shadow-xl z-50 rounded-xl">
                <SelectItem value="60" className="text-lg section-spacing-xs cursor-pointer">
                  Studio / 1-bed (~50-70m²)
                </SelectItem>
                <SelectItem value="80" className="text-lg section-spacing-xs cursor-pointer">
                  2-bed Apartment (~70-90m²)
                </SelectItem>
                <SelectItem value="105" className="text-lg section-spacing-xs cursor-pointer">
                  3-bed Home (~90-120m²)
                </SelectItem>
                <SelectItem value="140" className="text-lg section-spacing-xs cursor-pointer">
                  4+bed Home (120m²+)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="form-spacing-tight">
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
                      <div className="component-spacing-xs">
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
      <div className="max-w-4xl mx-auto px-4 section-spacing-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading-color mb-2">Maximize your savings!</h1>
          <p className="text-muted-foreground text-lg">How flexible can you be? Help us optimize our routes and we'll reward you with an extra discount.</p>
        </div>

        <MobileCard className="border-2 border-accent/10 shadow-lg">
          <MobileCardContent className="card-spacing-lg">
            <RadioGroup
              value={bookingData22.flexibilityType || ''}
              onValueChange={(value: FlexibilityType22) => updateBookingData22({ flexibilityType: value })}
              className="form-spacing-loose"
            >
              <MobileCard 
                className={`card-spacing-md cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  bookingData22.flexibilityType === 'flexible' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                }`}
                onClick={() => updateBookingData22({ flexibilityType: 'flexible' })}
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="flexible" id="flexible22" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">💰</div>
                      <Label htmlFor="flexible22" className="text-lg font-bold text-heading-color cursor-pointer">
                        Flexible Super Saver
                      </Label>
                      <Badge className="bg-primary/15 text-primary border-primary/30">
                        Extra 5% Off
                      </Badge>
                    </div>
                    <p className="text-foreground mb-3 leading-relaxed">
                      I provide key access/am always home. Schedule me on any weekday within 8 AM - 6 PM.
                    </p>
                    <div className="bg-primary/10 card-spacing-xs rounded-lg">
                      <div className="text-primary font-bold text-lg">
                        Save an extra 5% (15% total off!) - €{monthlyFlexible}/month
                      </div>
                    </div>
                  </div>
                </div>
              </MobileCard>

              <MobileCard 
                className={`card-spacing-md cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  bookingData22.flexibilityType === 'preferred' ? 'border-secondary bg-secondary/5' : 'border-border hover:border-secondary/30'
                }`}
                onClick={() => updateBookingData22({ flexibilityType: 'preferred' })}
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="preferred" id="preferred22" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">👍</div>
                      <Label htmlFor="preferred22" className="text-lg font-bold text-heading-color cursor-pointer">
                        Preferred Window
                      </Label>
                      <Badge variant="secondary" className="bg-secondary/15 text-secondary">
                        Standard Discount
                      </Badge>
                    </div>
                    <p className="text-foreground mb-3 leading-relaxed">
                      I prefer a specific window. Choose a day and a 4-hour block.
                    </p>
                    <div className="bg-secondary/10 card-spacing-xs rounded-lg">
                      <div className="text-secondary font-bold text-lg">
                        Your standard 10% discount applies - €{monthlyStandard}/month
                      </div>
                    </div>
                  </div>
                </div>
              </MobileCard>

              <MobileCard 
                className={`card-spacing-md cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  bookingData22.flexibilityType === 'fixed' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'
                }`}
                onClick={() => updateBookingData22({ flexibilityType: 'fixed' })}
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="fixed" id="fixed22" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">⏰</div>
                      <Label htmlFor="fixed22" className="text-lg font-bold text-heading-color cursor-pointer">
                        Fixed Time
                      </Label>
                      <Badge variant="secondary" className="bg-accent/15 text-accent">
                        Standard Discount
                      </Badge>
                    </div>
                    <p className="text-foreground mb-3 leading-relaxed">
                      I need a guaranteed time. Choose a day and exact start time.
                    </p>
                    <div className="bg-accent/10 card-spacing-xs rounded-lg">
                      <div className="text-accent font-bold text-lg">
                        Your standard 10% discount applies - €{monthlyStandard}/month
                      </div>
                    </div>
                  </div>
                </div>
              </MobileCard>
            </RadioGroup>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep22} 
                className="h-14 flex-1 border-2 rounded-xl text-lg font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep22} 
                disabled={!bookingData22.flexibilityType}
                className="h-14 flex-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
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
        <CardContent className="form-spacing-loose">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-spacing-tight">
              <Label htmlFor="name22">Full Name</Label>
              <Input
                id="name22"
                value={bookingData22.customerInfo.name}
                onChange={(e) => updateBookingData22({
                  customerInfo: { ...bookingData22.customerInfo, name: e.target.value }
                })}
              />
            </div>
            <div className="form-spacing-tight">
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

          <div className="form-spacing-tight">
            <Label htmlFor="phone22">Phone Number</Label>
            <Input
              id="phone22"
              value={bookingData22.customerInfo.phone}
              onChange={(e) => updateBookingData22({
                customerInfo: { ...bookingData22.customerInfo, phone: e.target.value }
              })}
            />
          </div>

          <div className="form-spacing-tight">
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
        case 2: return renderFlexibilityOptions();
        case 3: return renderPackageSelection();
        case 4: return renderFinalDetails();
        default: return renderStep0();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background section-spacing-md px-4">
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