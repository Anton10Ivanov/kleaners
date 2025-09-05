
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { NavigationButton } from '../primitives/NavigationPrimitives';

interface TouchOptimizedControlsProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

export const TouchOptimizedControls: React.FC<TouchOptimizedControlsProps> = ({
  children,
  className,
  variant = 'ghost',
  size = 'md',
  onTouchStart,
  onTouchEnd,
}) => {
  const { isMobile, touchDevice } = useMobileOptimizations();

  const handleTouchStart = () => {
    if (touchDevice && onTouchStart) {
      onTouchStart();
    }
  };

  const handleTouchEnd = () => {
    if (touchDevice && onTouchEnd) {
      onTouchEnd();
    }
  };

  return (
    <div
      className={cn(
        "touch-manipulation", // Prevents double-tap zoom
        "select-none", // Prevents text selection on touch
        isMobile && "min-h-[44px] min-w-[44px]", // iOS/Android minimum touch target
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <NavigationButton
        variant={variant}
        size={size}
        className={cn(
          "transition-transform duration-150",
          "active:scale-95", // Tap feedback
          "focus-visible:ring-2 focus-visible:ring-primary/20",
          touchDevice && "hover:scale-100", // Disable hover scale on touch devices
        )}
      >
        {children}
      </NavigationButton>
    </div>
  );
};

interface SwipeGestureAreaProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

export const SwipeGestureArea: React.FC<SwipeGestureAreaProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className,
}) => {
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <div
      className={cn("touch-pan-y", className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      {children}
    </div>
  );
};
