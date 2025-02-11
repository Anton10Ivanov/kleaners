
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Extra {
  id: string;
  title: string;
  price: number;
  description: string;
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
    description: 'Interior and exterior window cleaning'
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    price: 10,
    description: 'Deep clean inside your refrigerator'
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    price: 12,
    description: 'Deep clean inside your oven'
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AVAILABLE_EXTRAS.map((extra) => (
          <Button
            key={extra.id}
            variant="outline"
            className={`h-auto p-4 ${
              selectedExtras.includes(extra.id) ? 'border-primary' : ''
            }`}
            onClick={() => toggleExtra(extra.id)}
          >
            <div className="text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{extra.title}</span>
                {selectedExtras.includes(extra.id) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{extra.description}</p>
              <div className="text-primary font-semibold">+{extra.price}€</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Extras;
