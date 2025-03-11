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
  console.log("HeroProvider initializing with:", { initialService, initialPostalCode });
  
  const [selectedService, setSelectedService] = useState(() => {
    console.log("Setting initial service state to:", initialService || Service.Regular);
    return initialService || Service.Regular;
  });
  
  const [postalCode, setPostalCode] = useState(() => {
    console.log("Setting initial postal code state to:", initialPostalCode || '');
    return initialPostalCode || '';
  });

  // Keep local state in sync with parent props
  useEffect(() => {
    if (initialService && initialService !== selectedService) {
      console.log("Updating service from props:", initialService);
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialPostalCode !== postalCode && initialPostalCode) {
      console.log("Updating postal code from props:", initialPostalCode);
      setPostalCode(initialPostalCode);
    }
  }, [initialPostalCode]);

  const updateSelectedService = useCallback((service: string) => {
    console.log("HeroContext: updating service to", service);
    setSelectedService(service);
    onServiceChange(service as Service);
  }, [onServiceChange]);

  const updatePostalCode = useCallback((code: string) => {
    console.log("HeroContext: updating postal code to", code);
    setPostalCode(code);
    onPostalCodeChange(code);
  }, [onPostalCodeChange]);

  const handleNextStep = useCallback(() => {
    console.log("HeroContext: handling next step");
    onNextStep();
  }, [onNextStep]);

  const value = {
    selectedService,
    postalCode,
    updateSelectedService,
    updatePostalCode,
    handleNextStep
  };

  return (
    <HeroContext.Provider value={value}>
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
