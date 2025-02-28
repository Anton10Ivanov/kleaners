
import { CalendarSection } from "@/components/admin/sections/CalendarSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings } from "lucide-react";

export const AdminSettings = () => {
  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Settings className="mr-2 h-6 w-6" />
          Admin Settings
        </h1>
        
        <Alert className="mb-6">
          <AlertDescription>
            This section is currently under development. More settings will be available soon.
          </AlertDescription>
        </Alert>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Calendar Configuration</h2>
          <CalendarSection />
        </div>
      </div>
    </div>
  );
};
