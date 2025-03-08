
// This file is no longer needed in the current structure as we've moved to separate pages
// The component can be repurposed later or removed if no longer needed
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerQuestionsSection from './sections/CustomerQuestionsSection';
import { CalendarSection } from './sections/CalendarSection';
import { VacationRequestsSection } from './sections/VacationRequestsSection';

// We'll simply create a message stating this component is deprecated
const AdminTabs = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
      <h3 className="text-amber-800 dark:text-amber-300 font-medium">Component Deprecated</h3>
      <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
        This component has been replaced by separate page routes. Please update any references.
      </p>
    </div>
  );
};

export default AdminTabs;
