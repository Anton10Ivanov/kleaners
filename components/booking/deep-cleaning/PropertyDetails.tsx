
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';

interface PropertyDetailsProps {
  squareMeters: number;
  setSquareMeters: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
  bedrooms: number;
  setBedrooms: (value: number) => void;
}

const PropertyDetails = ({
  squareMeters,
  setSquareMeters,
  bathrooms,
  setBathrooms,
  bedrooms,
  setBedrooms,
}: PropertyDetailsProps) => {
  const handleSquareMeters = (increment: boolean) => {
    const newValue = increment ? squareMeters + 5 : squareMeters - 5;
    if (newValue >= 10 && newValue <= 200) {
      setSquareMeters(newValue);
    }
  };

  const handleRoomsChange = (value: number, setter: (value: number) => void) => {
    if (value >= 1 && value <= 10) {
      setter(value);
    }
  };

  return (
    <div className="form-spacing-loose animate-fadeIn">
      <h3 className="text-lg font-semibold text-foreground">Property Details</h3>
      
      <div className="form-spacing-relaxed">
        <Label className="text-secondary-text">Square Meters ({squareMeters}m²)</Label>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleSquareMeters(false)}
            disabled={squareMeters <= 10}
            className="hover:bg-primary/10 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[3rem] text-center font-medium">{squareMeters}</span>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleSquareMeters(true)}
            disabled={squareMeters >= 200}
            className="hover:bg-primary/10 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-spacing-relaxed">
          <Label className="text-secondary-text">Bathrooms</Label>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleRoomsChange(bathrooms - 1, setBathrooms)}
              disabled={bathrooms <= 1}
              className="hover:bg-primary/10 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[3rem] text-center font-medium">{bathrooms}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleRoomsChange(bathrooms + 1, setBathrooms)}
              disabled={bathrooms >= 10}
              className="hover:bg-primary/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="form-spacing-relaxed">
          <Label className="text-secondary-text">Bedrooms</Label>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleRoomsChange(bedrooms - 1, setBedrooms)}
              disabled={bedrooms <= 1}
              className="hover:bg-primary/10 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[3rem] text-center font-medium">{bedrooms}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleRoomsChange(bedrooms + 1, setBedrooms)}
              disabled={bedrooms >= 10}
              className="hover:bg-primary/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
