
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Info, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface ErrorStateProps {
  onRefresh: () => void;
  onGoBack?: () => void;
  error?: Error | null;
  title?: string;
  description?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRefresh,
  onGoBack,
  error,
  title = "Failed to load bookings",
  description = "There was an error loading the bookings. Please try again."
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  // Format the error message for display
  const errorMessage = error instanceof Error ? error.message : 
    typeof error === 'string' ? error : 
    error ? JSON.stringify(error) : 
    'Unknown error occurred';
  
  // Determine if it's a network issue
  const isNetworkError = errorMessage.toLowerCase().includes('network') || 
                         errorMessage.toLowerCase().includes('fetch') ||
                         errorMessage.toLowerCase().includes('connection');
  
  // Determine if it's a permission issue
  const isPermissionError = errorMessage.toLowerCase().includes('permission') || 
                           errorMessage.toLowerCase().includes('unauthorized') ||
                           errorMessage.toLowerCase().includes('forbidden');
  
  // Error recovery suggestions
  const suggestions = isNetworkError 
    ? "Please check your internet connection and try again." 
    : isPermissionError
    ? "You may not have permission to access this data. Please contact your administrator."
    : "If this issue persists, please contact technical support.";

  return (
    <Card className="bg-white dark:bg-gray-800 border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-4">
          {suggestions}
        </p>
        
        {error && (
          <Collapsible 
            open={showDetails} 
            onOpenChange={setShowDetails}
            className="border rounded-md"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full flex justify-between">
                <span className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  <span>{showDetails ? "Hide" : "Show"} error details</span>
                </span>
                <ChevronLeft className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-90' : '-rotate-90'}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 text-xs font-mono bg-gray-100 dark:bg-gray-900 rounded-b-md overflow-x-auto">
                {errorMessage}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-end">
        {onGoBack && (
          <Button onClick={onGoBack} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
        <Button onClick={onRefresh} variant="default">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </CardFooter>
    </Card>
  );
};
