
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
  recommendedTime: number;
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
}

const HoursSelection = ({ 
  hours, 
  setHours, 
  recommendedTime,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms 
}: HoursSelectionProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">How many hours do you need?</h3>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => setHours(Math.max(2, hours - 0.5))}
          disabled={hours <= 2}
        >
          -
        </Button>
        <span className="w-16 text-center font-semibold">{hours}h</span>
        <Button 
          variant="outline" 
          onClick={() => setHours(hours + 0.5)}
        >
          +
        </Button>
      </div>

      <div className="text-center">
        <Popover>
          <PopoverTrigger className="text-primary text-sm hover:underline">
            Calculate cleaning time
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                      disabled={bedrooms <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{bedrooms}</span>
                    <Button 
                      variant="outline"
                     onClick={() => setBedrooms(Math.min(10, bedrooms + 1))}
                      disabled={bedrooms >= 10} // Disable the button when bedrooms = 10
                    >
                      +
                    </Button>
                  </div>
                </div>

                               <div>
                  <label className="block text-sm font-medium mb-2">Bathrooms</label>
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                      disabled={bathrooms <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{bathrooms}</span>
                    <Button 
                      variant="outline"
                      onClick={() => setBathrooms(Math.min(10, bathrooms + 1))}
                      disabled={bathrooms >= 10} // Disable the button when bathrooms = 10
                    >

                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-center text-primary">
                  We recommend {recommendedTime} hours
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default HoursSelection;
