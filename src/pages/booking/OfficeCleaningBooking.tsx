
import React, { useState } from 'react';
import { PricingWizard } from '@/components/booking/office-wizard';
import { EnhancedProgressIndicator } from '@/components/booking/shared/EnhancedProgressIndicator';
import { SummaryPill } from '@/components/booking/summary/SummaryPill';
import { enhancedFormPersistence } from '@/utils/enhancedFormPersistence';

const OfficeCleaningBooking = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Office Cleaning Booking
          </h1>
        </div>
        
        <PricingWizard />
      </div>
    </div>
  );
};

export default OfficeCleaningBooking;
