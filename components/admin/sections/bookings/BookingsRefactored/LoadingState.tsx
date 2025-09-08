
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center card-spacing-lg bg-white dark:bg-gray-800 rounded-md border shadow-sm">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-muted-foreground">Loading bookings...</p>
    </div>
  );
};
