
import { Check, Shirt, WashingMachine, Bed, Wrench, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Extra {
  id: string;
  title: string;
  price: number;
  icon: React.ElementType;
}

interface ExtrasProps {
  selectedExtras: string[];
  setSelectedExtras: (extras: string[]) => void;
}

const AVAILABLE_EXTRAS: Extra[] = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    price: 15,
    icon: WashingMachine
  },
  {
    id: 'ironing',
    title: 'Ironing',
    price: 12,
    icon: Shirt
  },
  {
    id: 'carpet',
    title: 'Carpet Washing',
    price: 20,
    icon: WashingMachine
  },
  {
    id: 'mattress',
    title: 'Mattress Washing',
    price: 18,
    icon: Bed
  },
  {
    id: 'repair',
    title: 'Small Repair',
    price: 25,
    icon: Wrench
  },
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    price: 15,
    icon: Archive
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    price: 10,
    icon: Archive
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    price: 12,
    icon: Wrench
  }
];

const Extras = ({ selectedExtras, setSelectedExtras }: ExtrasProps) => {
  const toggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Additional Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AVAILABLE_EXTRAS.map((extra) => {
          const Icon = extra.icon;
          return (
            <Button
              key={extra.id}
              variant="outline"
              className={`h-auto p-4 ${
                selectedExtras.includes(extra.id) ? 'border-primary' : ''
              }`}
              onClick={() => toggleExtra(extra.id)}
            >
              <div className="text-left space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold flex-grow">{extra.title}</span>
                  {selectedExtras.includes(extra.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="text-primary font-semibold">+{extra.price}€</div>
              </div>
            </Button>
          )}
        )}
      </div>
    </div>
  );
};

export default Extras;
