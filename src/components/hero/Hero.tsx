import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ServiceType } from '@/schemas/booking';
import { SectionTemplate } from "../home/SectionTemplate";

interface HeroProps {
  selectedService: ServiceType | string;
  setSelectedService: (service: ServiceType | string) => void;
  postalCode: string;
  setPostalCode: (code: string) => void;
  handleNextStep: () => void;
}

const Hero = ({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep,
}: HeroProps) => {

  const handleServiceChange = useCallback((value: string) => {
    setSelectedService(value);
  }, [setSelectedService]);

  const handlePostalCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  }, [setPostalCode]);

  return (
    <SectionTemplate
      icon={<Home className="h-8 w-8 text-primary" />}
      title="Kleaners.de - Book Your Professional Cleaners Instantly"
      description="Transparent pricing, trusted staff, sparkling results. Enter your service and location to get started."
      background="bg-gradient-to-br from-primary/10 via-theme-lightblue to-white"
      actions={null}
      className="relative"
    >
      <div className="w-full max-w-xl mx-auto p-6 bg-white/90 rounded-xl shadow-md border border-primary/10 flex flex-col gap-4">
        {/* Service input & Postal Code input. Place existing hero form here */}
        <div className="grid gap-2">
          <Label htmlFor="service">Select Service</Label>
          <Select onValueChange={handleServiceChange}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose a cleaning service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ServiceType.Home}>Regular Cleaning</SelectItem>
              <SelectItem value={ServiceType.DeepCleaning}>Deep Cleaning</SelectItem>
              <SelectItem value={ServiceType.MoveInOut}>Move In/Out Cleaning</SelectItem>
              <SelectItem value={ServiceType.Office}>Office Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </div>
        {/* Main vertical form layout, including inputs and the CTA/button */}
        {/* Maintain use of Poppins, font sizes, spacings */}
        {/* Hero action button goes here */}
        <motion.div className="flex justify-center">
          <Button onClick={handleNextStep}>
            Continue
          </Button>
        </motion.div>
      </div>
    </SectionTemplate>
  );
};

export default Hero;
