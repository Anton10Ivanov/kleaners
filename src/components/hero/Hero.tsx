
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
      <motion.div
        className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-white/95 dark:bg-gray-900/80 rounded-xl shadow-lg border border-primary/10 flex flex-col gap-4"
        initial={{ opacity: 0, scale: 0.96, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
      >
        <div className="grid gap-2">
          <Label htmlFor="service" className="font-semibold">Select Service</Label>
          <Select value={selectedService} onValueChange={handleServiceChange}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border border-gray-200">
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
          <Label htmlFor="postalCode" className="font-semibold">Postal Code</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            className="bg-white dark:bg-gray-800 border border-gray-200"
          />
        </div>
        <motion.div className="flex justify-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Button size="lg" className="w-full md:w-auto" onClick={handleNextStep}>
            Continue
          </Button>
        </motion.div>
      </motion.div>
    </SectionTemplate>
  );
};

export default Hero;
