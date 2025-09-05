
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { useNavigation } from '../context/NavigationContext';
import { TouchOptimizedControls, SwipeGestureArea } from './TouchOptimizedControls';
import { AnimatePresence, motion } from 'framer-motion';

interface EnhancedMobileMenuProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const EnhancedMobileMenu: React.FC<EnhancedMobileMenuProps> = ({
  children,
  title = "Navigation",
  description = "Main menu",
}) => {
  const { isMobile, getMobileSpacing, prefersReducedMotion } = useMobileOptimizations();
  const { state, actions } = useNavigation();

  const animationDuration = prefersReducedMotion ? 0 : 300;

  const handleSwipeRight = () => {
    actions.closeAllMenus();
  };

  return (
    <Sheet open={state.isMenuOpen} onOpenChange={actions.setIsMenuOpen}>
      <SheetContent 
        side="right" 
        className={cn(
          "overflow-y-auto safe-area-right z-[9999]",
          "bg-background/98 backdrop-blur-md border-l border-border/50 shadow-2xl",
          isMobile ? "w-[320px] p-4" : "w-[350px] p-4"
        )}
      >
        <SwipeGestureArea onSwipeRight={handleSwipeRight} className="h-full">
          <SheetHeader className={cn(
            "mb-6 text-left border-b border-border/20 pb-4",
            getMobileSpacing('md')
          )}>
            <SheetTitle className="text-foreground text-lg font-semibold">
              {title}
            </SheetTitle>
            <SheetDescription className="text-left text-muted-foreground text-sm">
              {description}
            </SheetDescription>
          </SheetHeader>

          <AnimatePresence mode="wait">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              transition={{ duration: animationDuration / 1000 }}
              className="mobile-stack space-y-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </SwipeGestureArea>
      </SheetContent>
    </Sheet>
  );
};

interface TouchOptimizedMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TouchOptimizedMenuItem: React.FC<TouchOptimizedMenuItemProps> = ({
  children,
  onClick,
  active = false,
  disabled = false,
  className,
}) => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  return (
    <div
      className={cn(
        "w-full min-h-[48px] flex items-center touch-manipulation",
        "transition-colors duration-200 rounded-lg p-3",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "active:scale-[0.98] active:bg-accent/80",
        active && "bg-secondary text-secondary-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-full flex items-center justify-start text-left"
      >
        {children}
      </button>
    </div>
  );
};
