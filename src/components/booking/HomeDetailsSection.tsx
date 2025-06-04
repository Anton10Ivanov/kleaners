import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle, Settings, Info, Clock, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { DeepCleaningPopup } from './DeepCleaningPopup';
interface HomeDetailsSectionProps {
  form: UseFormReturn<BookingFormData>;
  onSuggestedTimeSelect?: (hours: number) => void;
}
function estimateDuration(size: number, bedrooms: number, bathrooms: number, pace: 'standard' | 'quick' = 'standard'): number {
  let duration = 2; // Base

  if (size > 60) duration += Math.ceil((size - 60) / 20) * 0.5;
  if (bedrooms > 1) duration += (bedrooms - 1) * 0.3;
  if (bathrooms > 1) duration += (bathrooms - 1) * 0.5;
  let finalDuration = Math.min(duration, 8);

  // Apply quick pace reduction (20% off, but not below 2 hours)
  if (pace === 'quick') {
    finalDuration = Math.max(2, finalDuration * 0.8);
  }
  return Math.round(finalDuration * 2) / 2; // Round to nearest 0.5
}
export const HomeDetailsSection = ({
  form,
  onSuggestedTimeSelect
}: HomeDetailsSectionProps) => {
  const [showDeepCleaningPopup, setShowDeepCleaningPopup] = useState(false);
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;
  const cleaningPace = form.watch('cleaningPace') || 'standard';
  const hours = form.watch('hours') || 2;

  // Set default property size on mount
  useEffect(() => {
    if (!form.watch('propertySize')) {
      form.setValue('propertySize', 70);
    }
  }, [form]);
  const allFieldsFilled = propertySize > 0 && bedrooms > 0 && bathrooms > 0;

  // Calculate duration with standard pace for popup trigger
  const standardDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms, 'standard') : 0;
  const suggestedDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms, cleaningPace as 'standard' | 'quick') : 0;

  // Check if deep cleaning should be suggested (based on standard duration before quick adjustment)
  const shouldSuggestDeepCleaning = standardDuration >= 6 || bathrooms >= 3;
  useEffect(() => {
    if (allFieldsFilled && shouldSuggestDeepCleaning) {
      setShowDeepCleaningPopup(true);
    }
  }, [allFieldsFilled, shouldSuggestDeepCleaning]);
  const handleUseSuggestedDuration = () => {
    if (onSuggestedTimeSelect && suggestedDuration > 0) {
      form.setValue('hours', suggestedDuration);
      onSuggestedTimeSelect(suggestedDuration);
    }
  };
  const handleSizeIncrement = (increment: number) => {
    const currentSize = propertySize || 70;
    const newSize = Math.max(0, currentSize + increment);
    form.setValue('propertySize', newSize);
  };
  const handleHoursChange = (newHours: number) => {
    const adjustedHours = Math.max(2, Math.min(8, newHours));
    form.setValue('hours', adjustedHours);
  };
  const incrementHours = () => {
    handleHoursChange(hours + 0.5);
  };
  const decrementHours = () => {
    handleHoursChange(hours - 0.5);
  };
  const getServiceType = (duration: number) => {
    if (duration <= 2.5) return {
      text: "Quick clean",
      color: "text-blue-600"
    };
    if (duration <= 4) return {
      text: "Standard clean",
      color: "text-green-600"
    };
    if (duration <= 6) return {
      text: "Deep clean",
      color: "text-orange-600"
    };
    return {
      text: "Extensive clean",
      color: "text-purple-600"
    };
  };
  const serviceType = getServiceType(hours);
  return <div className="space-y-6">
      <div className="space-y-6">
        {/* Home Size */}
        <div className="space-y-2">
          <Label htmlFor="property-size" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Home size (m²)
          </Label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => handleSizeIncrement(-5)} className="h-12 w-12 p-0">
              -
            </Button>
            <Input id="property-size" type="number" placeholder="70" value={propertySize || 70} onChange={e => form.setValue('propertySize', Number(e.target.value))} className="h-12 text-center" min="20" max="500" step="5" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleSizeIncrement(5)} className="h-12 w-12 p-0">
              +
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            A rough estimate is fine. Please include all living areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bedrooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of bedrooms
            </Label>
            <Select value={bedrooms?.toString()} onValueChange={value => form.setValue('bedrooms', Number(value))}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of bathrooms
            </Label>
            <Select value={bathrooms?.toString()} onValueChange={value => form.setValue('bathrooms', Number(value))}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferred Cleaning Pace - Toggle Switch */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred cleaning pace
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Quick cleans are ideal for homes that are already tidy and only need a light refresh. 
                    Not suitable for first-time or deep cleaning. Used to calculate your recommended duration.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className={`text-sm font-medium transition-colors ${cleaningPace === 'quick' ? 'text-red-600' : 'text-gray-500'}`}>
              Quick
            </div>
            <Switch checked={cleaningPace === 'standard'} onCheckedChange={checked => form.setValue('cleaningPace', checked ? 'standard' : 'quick')} className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-500 mx-[5px] px-[36px] text-base" />
            <div className={`text-sm font-medium transition-colors ${cleaningPace === 'standard' ? 'text-green-600' : 'text-gray-500'}`}>
              Standard
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {cleaningPace === 'quick' ? 'Faster and lighter – reduces estimated duration by 20%' : 'Thorough and well-paced cleaning'}
          </p>
        </div>
      </div>

      {/* Estimation Display */}
      <AnimatePresence>
        {allFieldsFilled && suggestedDuration > 0 && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.4
      }}>
            <Alert className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-primary/20 rounded-full mt-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <AlertDescription>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-base">
                        🧹 Estimated cleaning time: {suggestedDuration} hours{cleaningPace === 'quick' ? ' (Quick Clean)' : ''}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Based on {propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}{cleaningPace === 'quick' ? ', and a quick pace' : ''}.
                      </p>
                    </div>
                  </AlertDescription>
                  
                  {/* Duration Selector Integrated */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Adjust duration:
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4">
                      <Button type="button" variant="outline" size="sm" onClick={decrementHours} disabled={hours <= 2} className="h-10 w-10 p-0 rounded-full disabled:opacity-30">
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <motion.div className="text-center" key={hours} initial={{
                    scale: 1.05
                  }} animate={{
                    scale: 1
                  }} transition={{
                    duration: 0.2
                  }}>
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-lg px-4 py-2">
                          <span className="text-xl font-bold text-primary">{hours}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">hours</span>
                        </div>
                      </motion.div>
                      
                      <Button type="button" variant="outline" size="sm" onClick={incrementHours} disabled={hours >= 8} className="h-10 w-10 p-0 rounded-full disabled:opacity-30">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-center space-y-1">
                      <div className={`text-sm font-medium ${serviceType.color}`}>
                        {serviceType.text}
                      </div>
                      <div className="text-sm text-gray-500">
                        Estimated cost: €{hours * 30} per session
                      </div>
                    </div>
                  </div>
                  
                  <Button type="button" onClick={handleUseSuggestedDuration} className="w-full bg-primary hover:bg-primary/90">
                    Use Suggested Duration ({suggestedDuration} hours)
                  </Button>
                </div>
              </div>
            </Alert>
          </motion.div>}
      </AnimatePresence>

      {/* Deep Cleaning Popup */}
      <DeepCleaningPopup isOpen={showDeepCleaningPopup} onClose={() => setShowDeepCleaningPopup(false)} onSwitchToDeepCleaning={() => {
      // This would redirect to deep cleaning booking
      window.location.href = '/deep-cleaning';
    }} onContinueStandard={() => setShowDeepCleaningPopup(false)} />
    </div>;
};