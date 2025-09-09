'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { X, Home, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceType } from '@/types/bookingFlow';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (serviceType: ServiceType) => void;
}

const services = [
  {
    type: ServiceType.HOME_CLEANING,
    title: 'Home Cleaning',
    description: 'Professional residential cleaning services for your home',
    icon: Home,
    features: ['Regular & One-time cleaning', 'Eco-friendly products', 'Insured cleaners'],
    price: 'From €25/hour',
    color: 'blue'
  },
  {
    type: ServiceType.OFFICE_CLEANING,
    title: 'Office Cleaning',
    description: 'Commercial cleaning services for your business',
    icon: Building2,
    features: ['Flexible scheduling', 'After-hours available', 'Specialized equipment'],
    price: 'From €35/hour',
    color: 'green'
  }
];

export const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  onServiceSelect
}) => {
  if (!isOpen) return null;

  const handleServiceSelect = (serviceType: ServiceType) => {
    onServiceSelect(serviceType);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Choose Your Service</CardTitle>
            <CardDescription className="text-lg">
              Select the type of cleaning service you need
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="cursor-pointer border-2 hover:border-primary transition-all duration-200 h-full"
                      onClick={() => handleServiceSelect(service.type)}
                    >
                      <CardHeader className="text-center">
                        <div className={`mx-auto mb-4 p-4 rounded-full bg-${service.color}-100`}>
                          <Icon className={`h-8 w-8 text-${service.color}-600`} />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-primary">
                            {service.price}
                          </span>
                        </div>
                        
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button className="w-full mt-4">
                          Select {service.title}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
