
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { Shirt, WashingMachine, Bed, Wrench, Archive, Refrigerator } from 'lucide-react';

interface ExtraService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  icon: any;
  hasPopup?: boolean;
}

interface EnhancedExtrasProps {
  form: UseFormReturn<BookingFormData>;
}

const AVAILABLE_EXTRAS: ExtraService[] = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    description: 'Interior window cleaning',
    price: 3,
    duration: '5 min',
    icon: WashingMachine,
    hasPopup: true
  },
  {
    id: 'ironing',
    title: 'Ironing Service',
    description: 'Professional ironing',
    price: 25,
    duration: '30 min',
    icon: Shirt,
    hasPopup: true
  },
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    description: 'Deep clean cabinet interiors',
    price: 15,
    duration: '30 min',
    icon: Archive
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    description: 'Thorough fridge cleaning',
    price: 20,
    duration: '30 min',
    icon: Refrigerator
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    description: 'Deep oven cleaning',
    price: 35,
    duration: '60 min',
    icon: Wrench
  },
  {
    id: 'mattress',
    title: 'Mattress Cleaning',
    description: 'Vacuum and sanitize',
    price: 40,
    duration: '45 min',
    icon: Bed
  }
];

const EnhancedExtras = ({ form }: EnhancedExtrasProps) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [windowCount, setWindowCount] = useState(1);
  const [ironingTime, setIroningTime] = useState(30);
  
  const selectedExtras = form.watch('extras') || [];
  const frequency = form.watch('frequency') || 'onetime';
  
  const setSelectedExtras = (extras: string[]) => {
    form.setValue('extras', extras);
  };

  const toggleExtra = (extraId: string, hasPopup: boolean = false) => {
    if (hasPopup) {
      if (selectedExtras.includes(extraId)) {
        setSelectedExtras(selectedExtras.filter(id => id !== extraId));
      } else {
        setOpenDialog(extraId);
      }
      return;
    }
    
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  const handleConfirmPopup = (extraId: string) => {
    if (!selectedExtras.includes(extraId)) {
      setSelectedExtras([...selectedExtras, extraId]);
    }
    setOpenDialog(null);
  };

  const calculateTotalExtras = () => {
    return selectedExtras.reduce((total, extraId) => {
      const extra = AVAILABLE_EXTRAS.find(e => e.id === extraId);
      if (!extra) return total;
      
      if (extraId === 'windows') return total + (windowCount * extra.price);
      if (extraId === 'ironing') return total + Math.ceil(ironingTime / 30) * extra.price;
      return total + extra.price;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_EXTRAS.map((extra) => {
          const Icon = extra.icon;
          const isSelected = selectedExtras.includes(extra.id);
          
          return (
            <motion.div 
              key={extra.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={() => toggleExtra(extra.id, extra.hasPopup)}
                className={`
                  h-auto p-4 w-full transition-all hover:shadow-md
                  ${isSelected 
                    ? 'border-primary bg-primary/5 border-2' 
                    : 'hover:border-primary/50'
                  }
                `}
              >
                <div className="flex flex-col items-start space-y-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <Icon className="h-5 w-5 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      +€{extra.price}
                    </Badge>
                  </div>
                  
                  <div className="text-left space-y-1">
                    <div className="font-semibold text-sm">{extra.title}</div>
                    <div className="text-xs text-gray-500">{extra.description}</div>
                    <div className="text-xs text-primary font-medium">{extra.duration}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>

      {selectedExtras.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-4"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-white">
              Additional services total:
            </span>
            <span className="font-bold text-lg text-primary">
              €{calculateTotalExtras()}
            </span>
          </div>
        </motion.div>
      )}

      {/* Window Cleaning Dialog */}
      <Dialog open={openDialog === 'windows'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How many windows?</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setWindowCount(Math.max(1, windowCount - 1))}
                disabled={windowCount <= 1}
                className="h-12 w-12 p-0"
              >
                -
              </Button>
              <span className="text-2xl font-bold w-16 text-center">{windowCount}</span>
              <Button 
                variant="outline" 
                onClick={() => setWindowCount(windowCount + 1)}
                className="h-12 w-12 p-0"
              >
                +
              </Button>
            </div>
            <div className="text-center text-sm text-gray-600">
              €{windowCount * 3} total
            </div>
            <Button 
              onClick={() => handleConfirmPopup('windows')}
              className="w-full"
            >
              Add to booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ironing Dialog */}
      <Dialog open={openDialog === 'ironing'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How much time needed?</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setIroningTime(Math.max(30, ironingTime - 30))}
                disabled={ironingTime <= 30}
                className="h-12 w-12 p-0"
              >
                -
              </Button>
              <span className="text-2xl font-bold w-24 text-center">{ironingTime} min</span>
              <Button 
                variant="outline" 
                onClick={() => setIroningTime(Math.min(240, ironingTime + 30))}
                disabled={ironingTime >= 240}
                className="h-12 w-12 p-0"
              >
                +
              </Button>
            </div>
            <div className="text-center text-sm text-gray-600">
              €{Math.ceil(ironingTime / 30) * 25} total
            </div>
            <Button 
              onClick={() => handleConfirmPopup('ironing')}
              className="w-full"
            >
              Add to booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedExtras;
