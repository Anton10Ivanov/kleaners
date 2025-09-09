'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Calendar, Star, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CleaningFrequency } from '@/types/bookingFlow';

interface FrequencySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFrequencySelect: (frequency: CleaningFrequency) => void;
  serviceType: 'home' | 'office';
}

const frequencyOptions = [
  {
    frequency: CleaningFrequency.ONE_TIME,
    title: 'One-Time Cleaning',
    description: 'Perfect for special occasions or when you need a deep clean',
    icon: Clock,
    features: [
      'Flexible scheduling',
      'No commitment required',
      'Pay as you go',
      'Perfect for special events'
    ],
    pricing: {
      home: '$50/hour',
      office: '$60/hour'
    },
    color: 'blue',
    isRecommended: false
  },
  {
    frequency: CleaningFrequency.REGULAR,
    title: 'Regular Cleaning',
    description: 'Consistent cleaning schedule with discounts and priority booking',
    icon: Calendar,
    features: [
      '10% discount on hourly rate',
      'Priority booking',
      'Consistent cleaner',
      'Flexible package options'
    ],
    pricing: {
      home: '$45/hour (10% off)',
      office: '$54/hour (10% off)'
    },
    color: 'green',
    isRecommended: true
  }
];

export const FrequencySelectionModal: React.FC<FrequencySelectionModalProps> = ({
  isOpen,
  onClose,
  onFrequencySelect,
  serviceType
}) => {
  if (!isOpen) return null;

  const handleFrequencySelect = (frequency: CleaningFrequency) => {
    onFrequencySelect(frequency);
    onClose();
  };

  const getFrequencyIcon = (frequency: CleaningFrequency) => {
    switch (frequency) {
      case CleaningFrequency.ONE_TIME:
        return Clock;
      case CleaningFrequency.REGULAR:
        return Calendar;
      default:
        return Clock;
    }
  };

  const getFrequencyColor = (frequency: CleaningFrequency) => {
    switch (frequency) {
      case CleaningFrequency.ONE_TIME:
        return 'blue';
      case CleaningFrequency.REGULAR:
        return 'green';
      default:
        return 'blue';
    }
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
            <CardTitle className="text-3xl font-bold">Choose Cleaning Frequency</CardTitle>
            <CardDescription className="text-lg">
              Select how often you'd like your {serviceType} cleaned
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frequencyOptions.map((option) => {
                const Icon = option.icon;
                const color = getFrequencyColor(option.frequency);
                
                return (
                  <motion.div
                    key={option.frequency}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer border-2 hover:border-primary transition-all duration-200 h-full ${
                        option.isRecommended ? 'ring-2 ring-primary/20' : ''
                      }`}
                      onClick={() => handleFrequencySelect(option.frequency)}
                    >
                      <CardHeader className="text-center relative">
                        {option.isRecommended && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                            <Star className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                        
                        <div className={`mx-auto mb-4 p-4 rounded-full bg-${color}-100`}>
                          <Icon className={`h-8 w-8 text-${color}-600`} />
                        </div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                        <CardDescription className="text-base">
                          {option.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Pricing */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {option.pricing[serviceType]}
                          </div>
                          <div className="text-sm text-muted-foreground">per hour</div>
                        </div>
                        
                        {/* Features */}
                        <ul className="space-y-2">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Additional Info for Regular Cleaning */}
                        {option.frequency === CleaningFrequency.REGULAR && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-green-700 font-medium">
                              Package Options Available
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              Weekly (5% off), Bi-weekly (2% off), Monthly (no discount)
                            </div>
                          </div>
                        )}
                        
                        <Button className="w-full mt-4">
                          Select {option.title}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Need Help Deciding?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong>Choose One-Time if:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• You need cleaning occasionally</li>
                    <li>• You're moving in/out</li>
                    <li>• You want to try our service first</li>
                  </ul>
                </div>
                <div>
                  <strong>Choose Regular if:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• You want consistent cleaning</li>
                    <li>• You want to save money</li>
                    <li>• You prefer the same cleaner</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
