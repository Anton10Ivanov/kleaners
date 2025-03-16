
import { useEffect } from "react";
import { Frequency } from "@/schemas/booking";
import ServiceOptionsDropdown from "./ServiceOptionsDropdown";

interface ServiceOptionsProps {
  frequency: Frequency | undefined;
  setFrequency: (value: Frequency) => void;
  isRegularCleaning?: boolean;
}

const ServiceOptions = ({
  frequency,
  setFrequency,
  isRegularCleaning = false
}: ServiceOptionsProps) => {
  // Set default frequency to BiWeekly when component mounts
  useEffect(() => {
    if (!frequency) {
      setFrequency(Frequency.BiWeekly);
    }
  }, [frequency, setFrequency]);
  
  return (
    <ServiceOptionsDropdown 
      frequency={frequency}
      setFrequency={setFrequency}
      isRegularCleaning={isRegularCleaning}
    />
  );
};

export default ServiceOptions;
