
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  popular?: boolean;
}

interface MobileServiceSelectorProps {
  services: ServiceOption[];
  selectedService?: string;
  onServiceSelect: (serviceId: string) => void;
  className?: string;
}

/**
 * Mobile-optimized service selection component
 * Features large touch targets and clear visual hierarchy
 */
export function MobileServiceSelector({
  services,
  selectedService,
  onServiceSelect,
  className,
}: MobileServiceSelectorProps) {
  const { getMobileSpacing } = useMobileOptimizations();

  return (
    <div className={cn("space-y-3", className)}>
      {services.map((service) => {
        const isSelected = selectedService === service.id;
        
        return (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all duration-200 touch-comfortable",
              "hover:shadow-md hover:border-primary/30",
              isSelected ? "border-primary bg-primary/5" : "border-border",
              "min-h-[80px]"
            )}
            onClick={() => onServiceSelect(service.id)}
          >
            <CardContent className={cn("relative", getMobileSpacing('md'))}>
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              )}

              {/* Popular Badge */}
              {service.popular && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 bg-accent text-accent-foreground"
                >
                  Popular
                </Badge>
              )}

              {/* Service Info */}
              <div className={cn("space-y-2", service.popular ? "mt-8" : "mt-0")}>
                <div className="flex justify-between items-start">
                  <h3 className={cn(
                    "font-semibold text-foreground",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {service.name}
                  </h3>
                  <div className="text-right ml-4">
                    <span className="text-lg font-bold text-primary">
                      ${service.price}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {service.duration}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground pr-8">
                  {service.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
