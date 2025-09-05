
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  message?: string;
}

const DefaultErrorFallback = ({ 
  error, 
  resetErrorBoundary,
  message = "Something went wrong"
}: ErrorFallbackProps) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-800 mb-2">{message}</h3>
      <p className="text-sm text-red-600 mb-4 text-center max-w-md">
        {error.message}
      </p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
        <Button 
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>;
  fallbackMessage?: string;
}

export const ErrorBoundaryWrapper = ({
  children,
  fallbackComponent: FallbackComponent = DefaultErrorFallback,
  fallbackMessage,
}: ErrorBoundaryWrapperProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <FallbackComponent {...props} message={fallbackMessage} />
      )}
      onReset={() => {
        // Reset the state when the error boundary is reset
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
