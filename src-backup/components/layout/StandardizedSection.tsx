import React from 'react';
import { cn } from '@/lib/utils';

interface StandardizedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  background?: 'transparent' | 'card' | 'muted' | 'accent' | 'primary';
  as?: 'section' | 'div' | 'main' | 'article' | 'aside' | 'header' | 'footer';
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'ultra-wide';
}

/**
 * Standardized Section Component
 * Provides consistent vertical spacing across all sections
 * Mobile-first responsive design with clear hierarchy
 */
export const StandardizedSection = React.forwardRef<HTMLElement, StandardizedSectionProps>(
  ({ 
    children, 
    className, 
    spacing = 'lg', 
    background = 'transparent',
    as: Component = 'section',
    container = true,
    containerSize = 'lg',
    ...props 
  }, ref) => {
    const spacingClasses = {
      none: 'section-spacing-none',
      xs: 'section-spacing-xs',
      sm: 'section-spacing-sm',
      md: 'section-spacing-md',
      lg: 'section-spacing-lg',
      xl: 'section-spacing-xl',
      '2xl': 'section-spacing-2xl',
      '3xl': 'section-spacing-3xl',
      '4xl': 'section-spacing-4xl',
    };

    const backgroundClasses = {
      transparent: 'bg-transparent',
      card: 'bg-card',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary',
    };

    const containerClasses = {
      sm: 'container-sm',
      md: 'container-md',
      lg: 'container-lg',
      xl: 'container-xl',
      wide: 'container-wide',
      'ultra-wide': 'container-ultra-wide',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          'w-full',
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        {container ? (
          <div className={cn('mx-auto px-4 sm:px-6', containerClasses[containerSize])}>
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

StandardizedSection.displayName = 'StandardizedSection';

// Convenience components for common use cases
export const PageHero = React.forwardRef<HTMLElement, Omit<StandardizedSectionProps, 'spacing'>>(
  (props, ref) => (
    <StandardizedSection
      ref={ref}
      spacing="2xl"
      background="transparent"
      {...props}
    />
  )
);

export const PageSection = React.forwardRef<HTMLElement, Omit<StandardizedSectionProps, 'spacing'>>(
  (props, ref) => (
    <StandardizedSection
      ref={ref}
      spacing="lg"
      background="transparent"
      {...props}
    />
  )
);

export const PageSectionCompact = React.forwardRef<HTMLElement, Omit<StandardizedSectionProps, 'spacing'>>(
  (props, ref) => (
    <StandardizedSection
      ref={ref}
      spacing="md"
      background="transparent"
      {...props}
    />
  )
);

export const PageSectionLarge = React.forwardRef<HTMLElement, Omit<StandardizedSectionProps, 'spacing'>>(
  (props, ref) => (
    <StandardizedSection
      ref={ref}
      spacing="xl"
      background="transparent"
      {...props}
    />
  )
);

export const ContentCard = React.forwardRef<HTMLDivElement, Omit<StandardizedSectionProps, 'spacing' | 'container'>>(
  (props, ref) => (
    <StandardizedSection
      ref={ref}
      spacing="none"
      background="card"
      container={false}
      as="div"
      className={cn('card-spacing-md rounded-xl shadow-sm', props.className)}
      {...props}
    />
  )
);

PageHero.displayName = 'PageHero';
PageSection.displayName = 'PageSection';
PageSectionCompact.displayName = 'PageSectionCompact';
PageSectionLarge.displayName = 'PageSectionLarge';
ContentCard.displayName = 'ContentCard';
