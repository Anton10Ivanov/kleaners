
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Service } from "@/schemas/booking";

type HeroContextType = {
  selectedService: string;
  postalCode: string;
  updateSelectedService: (service: string) => void;
  updatePostalCode: (code: string) => void;
  handleNextStep: () => void;
};

type HeroProviderProps = {
  children: React.ReactNode;
  initialService: string;
  initialPostalCode: string;
  onNextStep: () => void;
  onServiceChange: (service: Service) => void;
  onPostalCodeChange: (code: string) => void;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ 
  children, 
  initialService, 
  initialPostalCode, 
  onNextStep,
  onServiceChange,
  onPostalCodeChange
}: HeroProviderProps) => {
  const [selectedService, setSelectedService] = useState(initialService || Service.Regular);
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
    onServiceChange(service as Service);
  }, [onServiceChange]);

  const updatePostalCode = useCallback((code: string) => {
    setPostalCode(code);
    onPostalCodeChange(code);
  }, [onPostalCodeChange]);

  const handleNextStep = useCallback(() => {
    onNextStep();
  }, [onNextStep]);

  return (
    <HeroContext.Provider value={{
      selectedService,
      postalCode,
      updateSelectedService,
      updatePostalCode,
      handleNextStep
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
