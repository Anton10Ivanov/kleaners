
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityTab from "@/components/provider/settings/SecurityTab";
import NotificationsTab from "@/components/provider/settings/NotificationsTab";
import AppearanceTab from "@/components/provider/settings/AppearanceTab";
import BillingTab from "@/components/provider/settings/BillingTab";

const ProviderSettings = () => {
  return (
    <div className="py-4 md:py-6 animate-fadeIn">
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences"
        className="mb-6"
      />
      
      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
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
        
        <TabsContent value="billing" className="space-y-4">
          <BillingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderSettings;
