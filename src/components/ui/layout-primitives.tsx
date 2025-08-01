
/**
 * Layout Primitive Components
 * Basic layout building blocks
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  size = 'lg', 
  padding = true, 
  children, 
  className, 
  ...props 
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  };
  
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';
  
  return (
    <div 
      className={cn('mx-auto', sizeClasses[size], paddingClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal';
}

export const Stack: React.FC<StackProps> = ({ 
  spacing = 'md', 
  direction = 'vertical', 
  children, 
  className, 
  ...props 
}) => {
  const spacingClasses = {
    xs: direction === 'vertical' ? 'space-y-1' : 'space-x-1',
    sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
    xl: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
  };
  
  const directionClasses = direction === 'horizontal' ? 'flex items-center' : 'flex flex-col';
  
  return (
    <div 
      className={cn(directionClasses, spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Section: React.FC<SectionProps> = ({ 
  spacing = 'lg', 
  children, 
  className, 
  ...props 
}) => {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };
  
  return (
    <section 
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
};
