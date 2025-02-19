import { Shirt, WashingMachine, Bed, Wrench, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";

interface ExtrasProps {
  form: UseFormReturn<BookingFormData>;
}

const AVAILABLE_EXTRAS: Extra[] = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    hasPopup: true,
    icon: WashingMachine
  },
  {
    id: 'ironing',
    title: 'Ironing',
    hasPopup: true,
    icon: Shirt
  },
  {
    id: 'carpet',
    title: 'Carpet Washing',
    icon: WashingMachine
  },
  {
    id: 'mattress',
    title: 'Mattress Washing',
    icon: Bed
  },
  {
    id: 'repair',
    title: 'Small Repair',
    icon: Wrench
  },
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    time: '30 min',
    icon: Archive
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    time: '30 min',
    icon: Archive
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    time: '60 min',
    icon: Wrench
  }
];

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 27;
    case 'biweekly':
      return 30;
    default: // onetime
      return 35;
  }
};

const calculateTimePrice = (minutes: number, hourlyRate: number) => {
  const hours = minutes / 60;
  return hours * hourlyRate;
};

const Extras = ({ form }: ExtrasProps) => {
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
      
      if (extraId === 'ironing') {
        localStorage.setItem('ironingTime', ironingTime.toString());
      }
    }
    setOpenDialog(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center mb-6">Additional Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AVAILABLE_EXTRAS.map((extra) => {
          const Icon = extra.icon;
          const isSelected = selectedExtras.includes(extra.id);
          
          return (
            <Button
              key={extra.id}
              variant="outline"
              className={`
                h-auto p-4 transition-all hover:shadow-md
                ${isSelected ? 'border-primary border-2' : 'hover:border-primary/50'}
                ${extra.hasPopup ? 'cursor-pointer' : ''}
              `}
              onClick={() => toggleExtra(extra.id, extra.hasPopup)}
            >
              <div className="text-center space-y-2 w-full">
                <div className="flex flex-col items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-sm">{extra.title}</span>
                </div>
                {extra.time && (
                  <div className="text-secondary-text text-sm">{extra.time}</div>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Window Cleaning Dialog */}
      <Dialog open={openDialog === 'windows'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Number of Windows</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setWindowCount(Math.max(1, windowCount - 1))}
                disabled={windowCount <= 1}
              >
                -
              </Button>
              <span className="w-16 text-center font-medium">{windowCount}</span>
              <Button
                variant="outline"
                onClick={() => setWindowCount(windowCount + 1)}
              >
                +
              </Button>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleConfirmPopup('windows')}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ironing Dialog */}
      <Dialog open={openDialog === 'ironing'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time Needed</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIroningTime(Math.max(30, ironingTime - 30))}
                disabled={ironingTime <= 30}
              >
                -
              </Button>
              <span className="w-16 text-center font-medium">{ironingTime} min</span>
              <Button
                variant="outline"
                onClick={() => setIroningTime(Math.min(240, ironingTime + 30))}
                disabled={ironingTime >= 240}
              >
                +
              </Button>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleConfirmPopup('ironing')}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Extras;
