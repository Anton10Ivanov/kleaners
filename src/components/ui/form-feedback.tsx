
import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormFeedbackProps {
  type: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  type,
  message,
  className
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm mt-1 transition-all duration-200",
        {
          "text-green-600": type === 'success',
          "text-red-600": type === 'error',
          "text-blue-600": type === 'info'
        },
        className
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};
