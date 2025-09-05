
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface NavbarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'contextual';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  badge?: string;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  className,
  disabled = false,
  badge,
}) => {
  const { isMobile } = useMobileOptimizations();

  const baseClasses = cn(
    "flex items-center justify-center rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "relative"
  );

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
    ghost: "hover:bg-accent/50 hover:text-accent-foreground text-foreground/80",
    contextual: "hover:bg-accent/30 text-foreground/70 hover:text-foreground border border-transparent hover:border-border/20"
  };

  const sizeClasses = {
    sm: isMobile ? "h-10 px-2 text-sm gap-1.5" : "h-8 px-2 text-xs gap-1",
    md: isMobile ? "h-12 px-3 text-base gap-2" : "h-9 px-3 text-sm gap-2",
    lg: isMobile ? "h-14 px-4 text-lg gap-3" : "h-10 px-4 text-base gap-2"
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
      {badge && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

interface NavbarContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
}

export const NavbarWrapper: React.FC<NavbarContainerProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: "bg-background/95 backdrop-blur-sm border-b border-border/50",
    transparent: "bg-transparent",
    solid: "bg-background border-b border-border"
  };

  return (
    <div className={cn(
      "w-full transition-all duration-300",
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
};

interface NavbarSectionProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const NavbarSection: React.FC<NavbarSectionProps> = ({
  children,
  className,
  align = 'left'
}) => {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  );
};

interface NavbarBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'hot' | 'new';
  className?: string;
}

export const NavbarBadge: React.FC<NavbarBadgeProps> = ({
  children,
  variant = 'primary',
  className
}) => {
  const variantClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    hot: "bg-destructive/10 text-destructive border-destructive/20",
    new: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border",
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};
