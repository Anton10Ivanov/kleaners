
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className="container mx-auto section-spacing-xs px-2 md:section-spacing-md md:px-4">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <div className="mt-4 flex justify-center">
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </div>
  );
};
