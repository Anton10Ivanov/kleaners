
/**
 * Typography Components
 * Focused typography system based on design tokens
 */

import React from 'react';
import { cn } from '@/lib/utils';

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
  
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Component, { className: combinedClassName, ...props }, children);
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
