
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MobileBookingCardProps {
  title: string;
  description?: string;
  price?: number;
  duration?: string;
  className?: string;
  children?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
}

/**
 * Mobile-optimized booking card component with design token integration
 * Features touch-friendly interactions and consistent spacing
 */
export function MobileBookingCard({
  title,
  description,
  price,
  duration,
  className,
  children,
  action,
}: MobileBookingCardProps) {
  const { getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  return (
    <Card className={cn(
      "card-primary transition-all duration-200",
      "hover:shadow-md hover:border-primary/20",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        getMobileSpacing('md')
      )}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {price && (
            <div className="text-right">
              <span className="text-xl font-bold text-primary">
                ${price}
              </span>
              {duration && (
                <p className="text-xs text-muted-foreground">
                  {duration}
                </p>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      {children && (
        <CardContent className={cn("pt-0", getMobileSpacing('md'))}>
          {children}
        </CardContent>
      )}
      
      {action && (
        <CardContent className={cn("pt-3", getMobileSpacing('md'))}>
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            className={cn(
              "w-full touch-comfortable",
              getMobileButtonSize('default')
            )}
          >
            {action.label}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
