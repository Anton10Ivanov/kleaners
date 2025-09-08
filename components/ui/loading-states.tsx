
import { Loader2, Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const FormStepLoader = () => (
  <div className="form-spacing-loose">
    <Card>
      <CardContent className="pt-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="form-spacing-normal">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-2/3" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export const BookingSubmissionLoader = () => (
  <div className="flex flex-col items-center justify-center card-spacing-lg form-spacing-relaxed">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Processing your booking...</h3>
      <p className="text-sm text-gray-600">
        Please wait while we confirm your cleaning appointment
      </p>
    </div>
  </div>
);

export const AddressSearchLoader = () => (
  <div className="flex items-center space-x-2 card-spacing-xs text-sm text-gray-500">
    <Loader2 className="h-4 w-4 animate-spin" />
    <span>Searching addresses...</span>
  </div>
);

export const BookingSummaryLoader = () => (
  <Card>
    <CardContent className="pt-6 form-spacing-relaxed">
      <Skeleton className="h-6 w-32" />
      <div className="form-spacing-normal">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="border-t pt-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};
