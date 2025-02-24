
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const ProvidersSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Providers</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Provider
        </Button>
      </div>
      <div className="rounded-md border p-4">
        <p className="text-muted-foreground">
          Provider management functionality coming in the next update...
        </p>
      </div>
    </div>
  );
};
