
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface NavigationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  className,
  disabled = false,
}) => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  const baseClasses = cn(
    "flex items-center justify-center rounded-lg transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "touch-comfortable"
  );

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  const sizeClasses = {
    sm: isMobile ? "h-10 px-3 text-sm" : "h-8 px-2 text-xs",
    md: isMobile ? "h-12 px-4 text-base" : "h-10 px-4 text-sm",
    lg: isMobile ? "h-14 px-6 text-lg" : "h-12 px-6 text-base"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  children,
  className,
  orientation = 'horizontal'
}) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <nav 
      className={cn(
        "flex",
        orientation === 'horizontal' ? "flex-row items-center space-x-2" : "flex-col items-start space-y-1",
        isMobile && orientation === 'horizontal' && "space-x-1",
        className
      )}
      role="navigation"
    >
      {children}
    </nav>
  );
};

interface NavigationSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const NavigationSeparator: React.FC<NavigationSeparatorProps> = ({
  orientation = 'vertical',
  className
}) => {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === 'vertical' ? "w-px h-6" : "h-px w-6",
        className
      )}
      role="separator"
    />
  );
};

interface NavigationIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const NavigationIcon: React.FC<NavigationIconProps> = ({
  icon,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <span className={cn("flex items-center justify-center", sizeClasses[size], className)}>
      {icon}
    </span>
  );
};
