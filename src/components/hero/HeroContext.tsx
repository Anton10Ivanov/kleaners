
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ServiceType } from "@/schemas/booking";

type HeroContextType = {
  selectedService: string;
  postalCode: string;
  updateSelectedService: (service: string) => void;
  updatePostalCode: (code: string) => void;
  handleNextStep: () => void;
  handleServiceChange: (service: string) => void;
  handlePostalCodeChange: (code: string) => void;
};

type HeroProviderProps = {
  children: React.ReactNode;
  initialService: string;
  initialPostalCode: string;
  onNextStep: () => void;
  onServiceChange: (service: string) => void;
  onPostalCodeChange: (code: string) => void;
};

// Export the context so it can be imported in other files
export const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ 
  children, 
  initialService, 
  initialPostalCode, 
  onNextStep,
  onServiceChange,
  onPostalCodeChange
}: HeroProviderProps) => {
  const [selectedService, setSelectedService] = useState(initialService || ServiceType.Regular);
  const [postalCode, setPostalCode] = useState(initialPostalCode || '');

  // Sync internal state with parent component
  useEffect(() => {
    if (initialService !== selectedService && initialService) {
      setSelectedService(initialService);
    }
    if (initialPostalCode !== postalCode && initialPostalCode) {
      setPostalCode(initialPostalCode);
    }
  }, [initialService, initialPostalCode]);

  const updateSelectedService = useCallback((service: string) => {
    setSelectedService(service);
    onServiceChange(service);
  }, [onServiceChange]);

  const updatePostalCode = useCallback((code: string) => {
    setPostalCode(code);
    onPostalCodeChange(code);
  }, [onPostalCodeChange]);

  const handleNextStep = useCallback(() => {
    onNextStep();
  }, [onNextStep]);

  // Add these handler methods for direct compatibility with BookingForm
  const handleServiceChange = useCallback((service: string) => {
    setSelectedService(service);
    onServiceChange(service);
  }, [onServiceChange]);

  const handlePostalCodeChange = useCallback((code: string) => {
    setPostalCode(code);
    onPostalCodeChange(code);
  }, [onPostalCodeChange]);

  return (
    <HeroContext.Provider value={{
      selectedService,
      postalCode,
      updateSelectedService,
      updatePostalCode,
      handleNextStep,
      handleServiceChange,
      handlePostalCodeChange
    }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return context;
};
