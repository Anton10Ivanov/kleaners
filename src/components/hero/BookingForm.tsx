import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useHero } from "./HeroContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Home, Ruler, Calendar, Clock } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { generateTimeOptions } from "@/utils/timeUtils";

interface BookingFormProps {
  layout: "desktop" | "mobile" | "full-width";
  selectedService?: string;
  setSelectedService?: (value: string) => void;
  postalCode?: string;
  setPostalCode?: (value: string) => void;
  handleNextStep?: () => void;
}

export const BookingForm = memo(({ layout, selectedService: propSelectedService, setSelectedService: propSetSelectedService, postalCode: propPostalCode, setPostalCode: propSetPostalCode, handleNextStep: propHandleNextStep }: BookingFormProps) => {
  // Use props if provided, otherwise use context
  const context = layout !== "full-width" ? useHero() : null;
  
  const selectedService = propSelectedService || context?.selectedService || "";
  const postalCode = propPostalCode || context?.postalCode || "";
  const handleServiceChange = propSetSelectedService || context?.handleServiceChange || (() => {});
  const handlePostalCodeChange = propSetPostalCode || context?.handlePostalCodeChange || (() => {});
  const handleNextStep = propHandleNextStep || context?.handleNextStep || (() => {});

  // New state for additional fields
  const [propertySize, setPropertySize] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isAnytime, setIsAnytime] = useState(false);

  const timeOptions = generateTimeOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  const isFullWidth = layout === "full-width";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className={cn(
        "space-y-6",
        isFullWidth && "grid grid-cols-1 lg:grid-cols-4 gap-6 space-y-0"
      )}>
        {/* Postal Code Section */}
        <div className={cn("space-y-3", isFullWidth && "col-span-1")}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <Label className="text-sm font-semibold text-gray-900">
              Where should it be cleaned?
            </Label>
          </div>
          <Input
            type="text"
            placeholder="Enter your city or postal code"
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400"
            required
          />
        </div>

        {/* Property Size Section */}
        {isFullWidth && (
          <div className="space-y-3 col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-orange-600" />
              <Label className="text-sm font-semibold text-gray-900">
                Property size
              </Label>
            </div>
            <Select value={propertySize} onValueChange={setPropertySize}>
              <SelectTrigger className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400">
                <SelectValue placeholder="Select size (m²)" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <SelectItem value="30-50">30-50 m²</SelectItem>
                <SelectItem value="51-80">51-80 m²</SelectItem>
                <SelectItem value="81-120">81-120 m²</SelectItem>
                <SelectItem value="121-160">121-160 m²</SelectItem>
                <SelectItem value="161-200">161-200 m²</SelectItem>
                <SelectItem value="201-250">201-250 m²</SelectItem>
                <SelectItem value="251-300">251-300 m²</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date and Time Section */}
        {isFullWidth && (
          <div className="space-y-3 col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <Label className="text-sm font-semibold text-gray-900">
                Preferred date & time
              </Label>
            </div>
            <div className="space-y-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400 justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anytime"
                    checked={isAnytime}
                    onCheckedChange={setIsAnytime}
                  />
                  <Label htmlFor="anytime" className="text-sm font-medium">
                    Anytime
                  </Label>
                </div>
                
                {!isAnytime && (
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Service Type Section */}
        <div className={cn("space-y-3", isFullWidth && "col-span-1")}>
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-orange-600" />
            <Label className="text-sm font-semibold text-gray-900">
              What should be cleaned?
            </Label>
          </div>
          <Select
            value={selectedService}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400">
              <SelectValue placeholder="Select cleaning service" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <SelectItem value="regular" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Regular Cleaning</div>
                  <div className="text-sm text-gray-500">Weekly, bi-weekly or monthly</div>
                </div>
              </SelectItem>
              <SelectItem value="deep" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Deep Cleaning</div>
                  <div className="text-sm text-gray-500">Thorough one-time cleaning</div>
                </div>
              </SelectItem>
              <SelectItem value="move" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Move In/Out</div>
                  <div className="text-sm text-gray-500">Moving preparation cleaning</div>
                </div>
              </SelectItem>
              <SelectItem value="business" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Business Cleaning</div>
                  <div className="text-sm text-gray-500">Office and commercial spaces</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* CTA Button */}
        <div className={cn(
          isFullWidth ? "col-span-full flex justify-center mt-8" : ""
        )}>
          <Button 
            type="submit" 
            className={cn(
              "bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
              isFullWidth ? "h-14 px-12 text-lg" : "w-full h-12"
            )}
          >
            Let's Go <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {!isFullWidth && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Free quote • No commitment • Instant booking
          </p>
        )}
      </form>
    </motion.div>
  );
});

BookingForm.displayName = "BookingForm";
