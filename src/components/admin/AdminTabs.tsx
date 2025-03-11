import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientQuestionsSection from '@/components/admin/sections/client-questions/ClientQuestionsSection';
import { CalendarSection } from '@/components/admin/sections/CalendarSection';
import { VacationRequestsSection } from '@/components/admin/sections/VacationRequestsSection';

// Admin tab sections configuration - focusing only on unique components
const tabSections = [
  { id: 'questions', label: 'FAQ Questions', component: ClientQuestionsSection },
  { id: 'vacation', label: 'Vacation', component: VacationRequestsSection },
  { id: 'calendar', label: 'Calendar', component: CalendarSection },
];

interface AdminTabsProps {
  defaultTab?: string;
  children?: React.ReactNode;
}

const AdminTabs = ({ defaultTab = 'questions', children }: AdminTabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with tab parameter
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  // Set initial tab based on URL
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const tabParam = url.searchParams.get('tab');
    if (tabParam && tabSections.some(section => section.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="bg-muted/50 flex flex-wrap w-full rounded-md p-1 overflow-x-auto sm:flex-nowrap">
        {tabSections.map((section) => (
          <TabsTrigger 
            key={section.id}
            value={section.id}
            id={`${section.id}-tab`}
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
      
      {children}
    </Tabs>
  );
};

export default AdminTabs;
