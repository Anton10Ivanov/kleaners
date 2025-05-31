
import { useState } from 'react';
import { Info, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
  selectedExtras: string[];
}

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 27;
    case 'biweekly':
      return 30;
    default: // onetime
      return 35;
  }
};

const calculateExtrasCost = (selectedExtras: string[], frequency: string) => {
  const hourlyRate = getHourlyRate(frequency);
  let totalCost = 0;

  selectedExtras.forEach(extra => {
    switch (extra) {
      case 'cabinets':
      case 'fridge':
        totalCost += (0.5 * hourlyRate);
        break;
      case 'oven':
        totalCost += hourlyRate;
        break;
      case 'ironing':
        const ironingTime = localStorage.getItem('ironingTime') ? 
          parseInt(localStorage.getItem('ironingTime') || '30') : 
          30;
        totalCost += (ironingTime / 60) * hourlyRate;
        break;
    }
  });

  return totalCost;
};

const BookingSummary = ({ selectedService, frequency, hours, currentPrice, selectedExtras }: BookingSummaryProps) => {
  const extrasCost = calculateExtrasCost(selectedExtras, frequency);
  const totalCost = (currentPrice * hours) + extrasCost;

  const translateServiceName = (service: string) => {
    switch (service) {
      case 'regular': return 'Regular Cleaning';
      case 'moveInOut': return 'Move In/Out Cleaning';
      case 'business': return 'Business Cleaning';
      case 'construction': return 'Post-Construction Cleaning';
      default: return service;
    }
  };

  const hasRelevantData = selectedService || (frequency && hours > 0) || selectedExtras.length > 0;
  
  if (!hasRelevantData) {
    return null;
  }

  return (
    <div className="sticky top-8 bg-white rounded-xl shadow-lg border border-gray-200 p-4 h-fit">
      <h3 className="text-base font-bold text-gray-900 mb-3">Booking Summary</h3>
      
      <div className="space-y-3">
        {selectedService && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-gray-800">{translateServiceName(selectedService)}</span>
          </div>
        )}
        
        {frequency && hours > 0 && (
          <>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-gray-800">
                  {frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">{currentPrice.toFixed(2)} €/h</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-gray-800">{hours} Cleaning Hours</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
            </div>
          </>
        )}
        
        {selectedExtras.length > 0 && selectedExtras.map(extra => {
          const hourlyRate = getHourlyRate(frequency);
          let extraCost = 0;
          let extraLabel = '';

          switch (extra) {
            case 'cabinets':
              extraCost = 0.5 * hourlyRate;
              extraLabel = 'Inside Cabinets (30 min)';
              break;
            case 'fridge':
              extraCost = 0.5 * hourlyRate;
              extraLabel = 'Inside Fridge (30 min)';
              break;
            case 'oven':
              extraCost = hourlyRate;
              extraLabel = 'Inside Oven (60 min)';
              break;
            case 'ironing':
              const ironingTime = localStorage.getItem('ironingTime') ? 
                parseInt(localStorage.getItem('ironingTime') || '30') : 
                30;
              extraCost = (ironingTime / 60) * hourlyRate;
              extraLabel = `Ironing (${ironingTime} min)`;
              break;
            default:
              extraLabel = extra;
          }

          return (
            <div key={extra} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-gray-800">{extraLabel}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">{extraCost.toFixed(2)} €</span>
            </div>
          );
        })}

        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-base font-bold text-primary tabular-nums">
              {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Price per cleaning session</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
