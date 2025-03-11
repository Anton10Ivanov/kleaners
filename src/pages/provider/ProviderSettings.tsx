
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityTab from "@/components/provider/settings/SecurityTab";
import NotificationsTab from "@/components/provider/settings/NotificationsTab";
import AppearanceTab from "@/components/provider/settings/AppearanceTab";

const ProviderSettings = () => {
  return (
    <div className="py-4 md:py-6 animate-fadeIn">
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences"
        className="mb-6"
      />
      
      <Tabs defaultValue="security" className="space-y-6">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security" className="space-y-4">
          <SecurityTab />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderSettings;
