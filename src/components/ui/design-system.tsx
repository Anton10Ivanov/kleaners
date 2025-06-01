/**
 * Design System Components
 * Standardized components using the design tokens
 */

import React from 'react';
import { designTokens } from '@/styles/designTokens';
import { mobileDesignSystem } from '@/styles/mobileDesignSystem';
import { cn } from '@/lib/utils';

// Typography Components
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, children, className, ...props }) => {
  const baseClasses = 'font-semibold text-gray-900 dark:text-white';
  const sizeClasses = {
    1: 'text-3xl md:text-4xl font-bold leading-tight mb-4',
    2: 'text-2xl md:text-3xl leading-tight mb-3',
    3: 'text-xl md:text-2xl leading-normal mb-3',
    4: 'text-lg md:text-xl leading-normal mb-2',
    5: 'text-base md:text-lg leading-normal mb-2',
    6: 'text-sm md:text-base leading-normal mb-2',
  };
  
  const combinedClassName = cn(baseClasses, sizeClasses[level], className);
  
  switch (level) {
    case 1:
      return <h1 className={combinedClassName} {...props}>{children}</h1>;
    case 2:
      return <h2 className={combinedClassName} {...props}>{children}</h2>;
    case 3:
      return <h3 className={combinedClassName} {...props}>{children}</h3>;
    case 4:
      return <h4 className={combinedClassName} {...props}>{children}</h4>;
    case 5:
      return <h5 className={combinedClassName} {...props}>{children}</h5>;
    case 6:
      return <h6 className={combinedClassName} {...props}>{children}</h6>;
    default:
      return <h1 className={combinedClassName} {...props}>{children}</h1>;
  }
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'small' | 'caption';
  color?: 'primary' | 'secondary' | 'muted';
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body', 
  color = 'primary', 
  children, 
  className, 
  ...props 
}) => {
  const baseClasses = 'leading-normal';
  const variantClasses = {
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs',
  };
  const colorClasses = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-600 dark:text-gray-400',
  };
  
  return (
    <p 
      className={cn(baseClasses, variantClasses[variant], colorClasses[color], className)}
      {...props}
    >
      {children}
    </p>
  );
};

// Layout Components
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

// Card Component
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

// Section Component
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
