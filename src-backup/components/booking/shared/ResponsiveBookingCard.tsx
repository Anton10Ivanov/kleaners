import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResponsiveBookingCardProps {
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
 * Responsive booking card component with mobile optimizations
 * Features touch-friendly interactions and consistent spacing
 * Merges functionality from MobileBookingCard with desktop optimizations
 */
export function ResponsiveBookingCard({
  title,
  description,
  price,
  duration,
  className,
  children,
  action,
}: ResponsiveBookingCardProps) {
  const { getMobileSpacing, getMobileButtonSize, isMobile } = useMobileOptimizations();

  return (
    <Card className={cn(
      "transition-all duration-200",
      "hover:shadow-md hover:border-primary/20",
      isMobile ? "card-primary" : "shadow-sm",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        isMobile ? getMobileSpacing('md') : undefined
      )}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold text-foreground mb-1",
              isMobile ? "text-lg" : "text-xl"
            )}>
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
              <span className={cn(
                "font-bold text-primary",
                isMobile ? "text-xl" : "text-2xl"
              )}>
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
        <CardContent className={cn(
          "pt-0",
          isMobile ? getMobileSpacing('md') : undefined
        )}>
          {children}
        </CardContent>
      )}
      
      {action && (
        <CardContent className={cn(
          "pt-3",
          isMobile ? getMobileSpacing('md') : undefined
        )}>
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            className={cn(
              "w-full transition-all duration-300",
              isMobile ? cn("touch-comfortable", getMobileButtonSize('md')) : "h-12"
            )}
          >
            {action.label}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
