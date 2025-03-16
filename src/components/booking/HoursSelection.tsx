import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
interface HoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
}
const HoursSelection = ({
  form
}: HoursSelectionProps) => {
  const [hours, setHours] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [recommendedTime, setRecommendedTime] = useState(2);
  useEffect(() => {
    // Calculate recommended time based on rooms
    const baseTime = 2;
    const bedroomTime = 0.5 * bedrooms;
    const bathroomTime = 0.5 * bathrooms;
    const calculated = baseTime + bedroomTime + bathroomTime;
    setRecommendedTime(calculated);
  }, [bedrooms, bathrooms]);
  useEffect(() => {
    // Update form when hours change
    form.setValue('hours', hours);
  }, [hours, form]);
  return <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-normal text-zinc-900">Set a duration</h3>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" onClick={() => setHours(Math.max(2, hours - 0.5))} disabled={hours <= 2}>
          -
        </Button>
        <span className="w-16 text-center font-semibold">{hours}h</span>
        <Button variant="outline" onClick={() => setHours(hours + 0.5)}>
          +
        </Button>
      </div>

      <div className="text-center">
        <Popover>
          <PopoverTrigger className="text-primary text-sm hover:underline">Calculate recommended time</PopoverTrigger>
          <PopoverContent className="w-[300px] p-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} disabled={bedrooms <= 1}>
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{bedrooms}</span>
                    <Button variant="outline" onClick={() => setBedrooms(Math.min(10, bedrooms + 1))} disabled={bedrooms >= 10}>
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bathrooms</label>
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} disabled={bathrooms <= 1}>
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{bathrooms}</span>
                    <Button variant="outline" onClick={() => setBathrooms(Math.min(10, bathrooms + 1))} disabled={bathrooms >= 10}>
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
    </div>;
};
export default HoursSelection;