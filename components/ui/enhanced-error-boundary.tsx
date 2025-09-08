
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const navigate = useRouter();

  return (
    <div className="min-h-[400px] flex items-center justify-center card-spacing-md">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're sorry, but something unexpected happened. You can try refreshing this section or go back to the homepage.
          </p>
        </div>
        
        <div className="form-spacing-normal">
          <Button 
            onClick={resetErrorBoundary}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 card-spacing-xs rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

interface EnhancedErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export const EnhancedErrorBoundary: React.FC<EnhancedErrorBoundaryProps> = ({
  children,
  fallback = ErrorFallback
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={fallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
