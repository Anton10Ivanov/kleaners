/**
 * Design System Components
 * Re-exports focused component modules
 */

// Typography components
export { Heading, Text } from './typography';

// Layout components  
export { Container, Stack, Section } from './layout-primitives';

// Card component (keeping existing implementation for now)
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  padding = 'md', 
  children, 
  className, 
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'border border-gray-200 dark:border-gray-700',
    elevated: 'shadow-md hover:shadow-lg',
    outlined: 'border-2 border-gray-300 dark:border-gray-600',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};
