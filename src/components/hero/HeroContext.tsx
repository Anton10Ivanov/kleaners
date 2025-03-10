
import React, { createContext, useContext, useState, useCallback } from "react";

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
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ 
  children, 
  initialService, 
  initialPostalCode, 
  onNextStep 
}: HeroProviderProps) => {
  const [selectedService, setSelectedService] = useState(initialService);
  const [postalCode, setPostalCode] = useState(initialPostalCode);

  const updateSelectedService = useCallback((service: string) => {
    setSelectedService(service);
  }, []);

  const updatePostalCode = useCallback((code: string) => {
    setPostalCode(code);
  }, []);

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
