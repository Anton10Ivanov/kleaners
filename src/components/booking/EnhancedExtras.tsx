
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { motion, AnimatePresence } from 'framer-motion';

interface ExtraService {
  id: string;
  title: string;
  hasPopup?: boolean;
  time?: string;
  description?: string;
  basePrice?: number;
}

interface EnhancedExtrasProps {
  form: UseFormReturn<BookingFormData>;
}

const AVAILABLE_EXTRAS: ExtraService[] = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    hasPopup: true,
    description: 'Interior window cleaning',
    basePrice: 5
  },
  {
    id: 'ironing',
    title: 'Ironing',
    hasPopup: true,
    description: 'Professional ironing service',
    basePrice: 20
  },
  {
    id: 'carpet',
    title: 'Carpet Washing',
    description: 'Deep carpet cleaning',
    basePrice: 15
  },
  {
    id: 'mattress',
    title: 'Mattress Washing',
    description: 'Mattress deep cleaning',
    basePrice: 25
  },
  {
    id: 'repair',
    title: 'Small Repair',
    description: 'Minor household repairs',
    basePrice: 30
  },
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    time: '30 min',
    description: 'Interior cabinet cleaning',
    basePrice: 13.5
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    time: '30 min',
    description: 'Deep fridge cleaning',
    basePrice: 13.5
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    time: '60 min',
    description: 'Deep oven cleaning',
    basePrice: 27
  }
];

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 27;
    case 'biweekly':
      return 30;
    default:
      return 35;
  }
};

const EnhancedExtras = ({ form }: EnhancedExtrasProps) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [windowCount, setWindowCount] = useState(1);
  const [ironingTime, setIroningTime] = useState(30);
  const [framesIncluding, setFramesIncluding] = useState(false);
  
  const selectedExtras = form.watch('extras') || [];
  const frequency = form.watch('frequency') || 'onetime';
  const hourlyRate = getHourlyRate(frequency);

  // Store window cleaning config in form state
  const windowConfig = form.watch('windowConfig') || { count: 1, framesIncluding: false };
  const ironingConfig = form.watch('ironingConfig') || { time: 30 };

  const setSelectedExtras = useCallback((extras: string[]) => {
    form.setValue('extras', extras);
  }, [form]);

  const toggleExtra = useCallback((extraId: string, hasPopup: boolean = false) => {
    if (hasPopup) {
      if (selectedExtras.includes(extraId)) {
        // Remove the extra if already selected
        setSelectedExtras(selectedExtras.filter(id => id !== extraId));
      } else {
        // Open dialog for configuration
        setOpenDialog(extraId);
      }
      return;
    }

    // For non-popup extras, toggle immediately
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  }, [selectedExtras, setSelectedExtras]);

  const handleConfirmPopup = useCallback((extraId: string) => {
    if (!selectedExtras.includes(extraId)) {
      setSelectedExtras([...selectedExtras, extraId]);
      
      // Store configuration in form state
      if (extraId === 'ironing') {
        form.setValue('ironingConfig', { time: ironingTime });
      } else if (extraId === 'windows') {
        form.setValue('windowConfig', { count: windowCount, framesIncluding });
      }
    }
    setOpenDialog(null);
  }, [selectedExtras, setSelectedExtras, ironingTime, windowCount, framesIncluding, form]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(null);
  }, []);

  const calculateExtraPrice = (extra: ExtraService) => {
    if (extra.time) {
      const minutes = parseInt(extra.time);
      return (minutes / 60) * hourlyRate;
    }
    return extra.basePrice || 0;
  };

  const calculateWindowPrice = () => {
    const config = selectedExtras.includes('windows') ? windowConfig : { count: windowCount, framesIncluding };
    const basePrice = config.count * 5;
    return config.framesIncluding ? basePrice * 2 : basePrice;
  };

  const calculateIroningPrice = () => {
    const config = selectedExtras.includes('ironing') ? ironingConfig : { time: ironingTime };
    return (config.time / 60) * hourlyRate;
  };

  const totalExtrasPrice = selectedExtras.reduce((total, extraId) => {
    const extra = AVAILABLE_EXTRAS.find(e => e.id === extraId);
    if (!extra) return total;
    
    if (extraId === 'ironing') {
      return total + calculateIroningPrice();
    }
    
    if (extraId === 'windows') {
      return total + calculateWindowPrice();
    }
    
    return total + calculateExtraPrice(extra);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Additional Services
        </h3>
        {selectedExtras.length > 0 && (
          <div className="text-sm text-primary font-medium">
            +{totalExtrasPrice.toFixed(2)} €
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {AVAILABLE_EXTRAS.map((extra) => {
            const isSelected = selectedExtras.includes(extra.id);
            let price = calculateExtraPrice(extra);
            
            // Override price calculation for special cases
            if (extra.id === 'windows') {
              price = calculateWindowPrice();
            } else if (extra.id === 'ironing') {
              price = calculateIroningPrice();
            }
            
            return (
              <motion.div
                key={extra.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className={`
                    h-auto p-4 transition-all duration-200 relative w-full
                    ${isSelected 
                      ? 'border-primary bg-primary/5 border-2 shadow-md' 
                      : 'hover:border-primary/50 hover:bg-primary/5'
                    }
                  `}
                  onClick={() => toggleExtra(extra.id, extra.hasPopup)}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                  
                  <div className="text-center space-y-3 w-full">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                        {extra.title}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {extra.time && (
                        <div className="text-xs text-gray-500">
                          {extra.time}
                        </div>
                      )}
                      <div className="text-sm font-medium text-primary">
                        +{price.toFixed(0)} €
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Window Cleaning Dialog with Frames Including toggle */}
      <Dialog open={openDialog === 'windows'} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Window Cleaning
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-gray-600">
              How many windows need cleaning?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setWindowCount(Math.max(1, windowCount - 1))} 
                disabled={windowCount <= 1}
                className="h-10 w-10 p-0"
              >
                -
              </Button>
              <div className="text-center">
                <div className="text-2xl font-bold">{windowCount}</div>
                <div className="text-xs text-gray-500">windows</div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setWindowCount(windowCount + 1)}
                className="h-10 w-10 p-0"
              >
                +
              </Button>
            </div>
            
            {/* Frames Including Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Label htmlFor="frames-toggle" className="text-sm font-medium">
                Frames including
              </Label>
              <Switch
                id="frames-toggle"
                checked={framesIncluding}
                onCheckedChange={setFramesIncluding}
              />
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Price: <span className="font-semibold text-primary">{calculateWindowPrice().toFixed(0)} €</span>
              {framesIncluding && <span className="text-xs text-gray-500 block">(doubled for frames)</span>}
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={handleCloseDialog} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => handleConfirmPopup('windows')} className="flex-1">
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ironing Dialog */}
      <Dialog open={openDialog === 'ironing'} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Ironing Service
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-gray-600">
              How much time do you need for ironing?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setIroningTime(Math.max(30, ironingTime - 30))} 
                disabled={ironingTime <= 30}
                className="h-10 w-10 p-0"
              >
                -
              </Button>
              <div className="text-center">
                <div className="text-2xl font-bold">{ironingTime}</div>
                <div className="text-xs text-gray-500">minutes</div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIroningTime(Math.min(240, ironingTime + 30))} 
                disabled={ironingTime >= 240}
                className="h-10 w-10 p-0"
              >
                +
              </Button>
            </div>
            <div className="text-center text-sm text-gray-600">
              Price: <span className="font-semibold text-primary">{calculateIroningPrice().toFixed(0)} €</span>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={handleCloseDialog} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => handleConfirmPopup('ironing')} className="flex-1">
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedExtras;
