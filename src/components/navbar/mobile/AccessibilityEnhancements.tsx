
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface AccessibleNavigationProps {
  children: React.ReactNode;
  ariaLabel: string;
  role?: string;
  className?: string;
}

export const AccessibleNavigation: React.FC<AccessibleNavigationProps> = ({
  children,
  ariaLabel,
  role = "navigation",
  className,
}) => {
  return (
    <nav
      className={cn("focus-within:outline-none", className)}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </nav>
  );
};

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only",
        "absolute top-0 left-0 z-50",
        "bg-primary text-primary-foreground",
        "px-4 py-2 rounded-br-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        "transition-all duration-200",
        isMobile ? "text-base" : "text-sm"
      )}
    >
      {children}
    </a>
  );
};

interface ScreenReaderOnlyProps {
  children: React.ReactNode;
}

export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};

interface KeyboardNavigationProps {
  children: React.ReactNode;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
}

export const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  children,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onSpace,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onEscape?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onArrowUp?.();
        break;
      case 'ArrowDown':
        e.preventDefault();
        onArrowDown?.();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onArrowLeft?.();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onArrowRight?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
      case ' ':
        e.preventDefault();
        onSpace?.();
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="focus-within:outline-none">
      {children}
    </div>
  );
};
