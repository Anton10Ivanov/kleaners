
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingsSection } from './sections/BookingsSection';
import { CustomersSection } from './sections/CustomersSection';
import { ProvidersSection } from './sections/ProvidersSection';
import CustomerQuestionsSection from './sections/CustomerQuestionsSection';
import { CalendarSection } from './sections/CalendarSection';
import { VacationRequestsSection } from './sections/VacationRequestsSection';

// Admin tab sections configuration
const tabSections = [
  { id: 'bookings', label: 'Bookings', component: BookingsSection },
  { id: 'customers', label: 'Customers', component: CustomersSection },
  { id: 'providers', label: 'Providers', component: ProvidersSection },
  { id: 'questions', label: 'FAQ Questions', component: CustomerQuestionsSection },
  { id: 'vacation', label: 'Vacation', component: VacationRequestsSection },
  { id: 'calendar', label: 'Calendar', component: CalendarSection },
];

interface AdminTabsProps {
  defaultTab?: string;
}

const AdminTabs = ({ defaultTab = 'bookings' }: AdminTabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="bg-muted/50 flex flex-wrap w-full rounded-md p-1 overflow-x-auto sm:flex-nowrap">
        {tabSections.map((section) => (
          <TabsTrigger 
            key={section.id}
            value={section.id}
            className="flex-1 min-w-fit data-[state=active]:bg-background"
          >
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabSections.map((section) => (
        <TabsContent key={section.id} value={section.id} className="space-y-4">
          <section.component />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdminTabs;
