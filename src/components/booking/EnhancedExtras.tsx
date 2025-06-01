
import { Shirt, WashingMachine, Bed, Wrench, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useCallback } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExtraService {
  id: string;
  title: string;
  hasPopup?: boolean;
  icon: LucideIcon;
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
    icon: WashingMachine,
    description: 'Interior window cleaning',
    basePrice: 5
  },
  {
    id: 'ironing',
    title: 'Ironing',
    hasPopup: true,
    icon: Shirt,
    description: 'Professional ironing service',
    basePrice: 20
  },
  {
    id: 'carpet',
    title: 'Carpet Washing',
    icon: WashingMachine,
    description: 'Deep carpet cleaning',
    basePrice: 15
  },
  {
    id: 'mattress',
    title: 'Mattress Washing',
    icon: Bed,
    description: 'Mattress deep cleaning',
    basePrice: 25
  },
  {
    id: 'repair',
    title: 'Small Repair',
    icon: Wrench,
    description: 'Minor household repairs',
    basePrice: 30
  },
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    time: '30 min',
    icon: Archive,
    description: 'Interior cabinet cleaning',
    basePrice: 13.5
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    time: '30 min',
    icon: Archive,
    description: 'Deep fridge cleaning',
    basePrice: 13.5
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    time: '60 min',
    icon: Wrench,
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
  
  const selectedExtras = form.watch('extras') || [];
  const frequency = form.watch('frequency') || 'onetime';
  const hourlyRate = getHourlyRate(frequency);

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
      
      // Store configuration in localStorage for persistence
      if (extraId === 'ironing') {
        localStorage.setItem('ironingTime', ironingTime.toString());
      } else if (extraId === 'windows') {
        localStorage.setItem('windowCount', windowCount.toString());
      }
    }
    setOpenDialog(null);
  }, [selectedExtras, setSelectedExtras, ironingTime, windowCount]);

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

  const totalExtrasPrice = selectedExtras.reduce((total, extraId) => {
    const extra = AVAILABLE_EXTRAS.find(e => e.id === extraId);
    if (!extra) return total;
    
    if (extraId === 'ironing') {
      const savedTime = localStorage.getItem('ironingTime');
      const time = savedTime ? parseInt(savedTime) : 30;
      return total + (time / 60) * hourlyRate;
    }
    
    return total + calculateExtraPrice(extra);
  }, 0);

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatePresence>
          {AVAILABLE_EXTRAS.map((extra) => {
            const Icon = extra.icon;
            const isSelected = selectedExtras.includes(extra.id);
            const price = calculateExtraPrice(extra);
            
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
                    h-auto p-3 transition-all duration-200 relative
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
                  
                  <div className="text-center space-y-2 w-full">
                    <div className="flex flex-col items-center gap-1">
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                      <span className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                        {extra.title}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {extra.time && (
                        <div className="text-xs text-gray-500">
                          {extra.time}
                        </div>
                      )}
                      <div className="text-xs font-medium text-primary">
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

      {/* Window Cleaning Dialog */}
      <Dialog open={openDialog === 'windows'} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <WashingMachine className="h-5 w-5 text-primary" />
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
            <div className="text-center text-sm text-gray-600">
              Price: <span className="font-semibold text-primary">{(windowCount * 5).toFixed(0)} €</span>
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
              <Shirt className="h-5 w-5 text-primary" />
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
              Price: <span className="font-semibold text-primary">{((ironingTime / 60) * hourlyRate).toFixed(0)} €</span>
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
