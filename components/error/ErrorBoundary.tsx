'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  isRetrying: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  maxRetries?: number;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

/**
 * Advanced Error Boundary with retry mechanisms and detailed error reporting
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Log error to monitoring service
    this.logErrorToService(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, index) => prevProps.resetKeys?.[index] !== key)) {
        this.resetErrorBoundary();
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, send to error monitoring service like Sentry
    console.error('Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  };

  private resetErrorBoundary = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
    });
  };

  private handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      return;
    }

    this.setState({ isRetrying: true });

    // Exponential backoff: 1s, 2s, 4s
    const delay = Math.pow(2, retryCount) * 1000;

    this.retryTimeoutId = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
        isRetrying: false,
      }));
    }, delay);
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportError = () => {
    const { error, errorInfo } = this.state;
    
    // Create error report
    const errorReport = {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      componentStack: errorInfo?.componentStack || 'No component stack',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // In a real app, send to error reporting service
    console.log('Error report:', errorReport);
    
    // Copy to clipboard for easy reporting
    navigator.clipboard?.writeText(JSON.stringify(errorReport, null, 2));
  };

  render() {
    const { hasError, error, errorInfo, retryCount, isRetrying } = this.state;
    const { children, fallback, maxRetries = 3, showErrorDetails = false } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      const canRetry = retryCount < maxRetries;
      const retryDelay = Math.pow(2, retryCount);

      return (
        <div className="min-h-screen flex items-center justify-center card-spacing-sm bg-gray-50">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">
                Something went wrong
              </CardTitle>
              <p className="text-gray-600 mt-2">
                We encountered an unexpected error. Our team has been notified.
              </p>
            </CardHeader>

            <CardContent className="form-spacing-relaxed">
              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg card-spacing-xs">
                <p className="text-sm text-red-800 font-medium">
                  {error?.message || 'An unexpected error occurred'}
                </p>
              </div>

              {/* Retry Information */}
              {canRetry && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg card-spacing-xs">
                  <p className="text-sm text-blue-800">
                    Retry attempt: {retryCount + 1} of {maxRetries}
                    {isRetrying && ` (retrying in ${retryDelay}s...)`}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                {canRetry && (
                  <Button
                    onClick={this.handleRetry}
                    disabled={isRetrying}
                    className="flex-1"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                    {isRetrying ? 'Retrying...' : 'Try Again'}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleReload}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>

              {/* Error Details (Development) */}
              {showErrorDetails && error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Technical Details
                  </summary>
                  <div className="mt-2 card-spacing-xs bg-gray-100 rounded-lg text-xs font-mono overflow-auto max-h-40">
                    <div className="mb-2">
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.stack && (
                      <div className="mb-2">
                        <strong>Stack Trace:</strong>
                        <pre className="whitespace-pre-wrap mt-1">{error.stack}</pre>
                      </div>
                    )}
                    {errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1">{errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Report Error */}
              <Button
                variant="ghost"
                size="sm"
                onClick={this.handleReportError}
                className="w-full text-gray-600"
              >
                <Bug className="w-4 h-4 mr-2" />
                Copy Error Details
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return children;
  }
}

// Hook-based error boundary for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // In a real app, send to error monitoring service
    // You could also trigger a state update to show an error UI
  };
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Async error boundary for handling promise rejections
export class AsyncErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
    };
  }

  componentDidMount() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  private handlePromiseRejection = (event: PromiseRejectionEvent) => {
    const error = new Error(event.reason?.message || 'Unhandled promise rejection');
    error.stack = event.reason?.stack;

    this.setState({
      hasError: true,
      error,
      errorInfo: null,
    });

    this.props.onError?.(error, {} as ErrorInfo);
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);
  }

  render() {
    // Use the same render logic as ErrorBoundary
    return <ErrorBoundary {...this.props}>{this.props.children}</ErrorBoundary>;
  }
}
