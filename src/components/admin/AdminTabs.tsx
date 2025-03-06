
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingsSection } from './sections/BookingsSection';
import { CalendarSection } from './sections/CalendarSection';
import { CustomersSection } from './sections/CustomersSection';
import { ProvidersSection } from './sections/ProvidersSection';
import CustomerQuestionsSection from './sections/CustomerQuestionsSection';

export type AdminTab = "bookings" | "calendar" | "customers" | "providers" | "questions";

type AdminTabsProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
};

const AdminTabs = ({ activeTab, onTabChange }: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as AdminTab)} className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
      </TabsList>
      <TabsContent value="bookings" className="space-y-4">
        <BookingsSection />
      </TabsContent>
      <TabsContent value="calendar" className="space-y-4">
        <CalendarSection />
      </TabsContent>
      <TabsContent value="customers" className="space-y-4">
        <CustomersSection />
      </TabsContent>
      <TabsContent value="providers" className="space-y-4">
        <ProvidersSection />
      </TabsContent>
      <TabsContent value="questions" className="space-y-4">
        <CustomerQuestionsSection />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
