
import { memo } from "react";
import { Building2, Sparkles, MoveHorizontal, Wrench } from "lucide-react";
import { Home } from "lucide-react";
import { ServiceType } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface ServiceTypeGridProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
}

const serviceOptions = [
  { type: ServiceType.Home, label: 'Home', icon: Home },
  { type: ServiceType.Office, label: 'Office', icon: Building2 },
  { type: ServiceType.DeepCleaning, label: 'Deep', icon: Sparkles },
  { type: ServiceType.MoveInOut, label: 'Move', icon: MoveHorizontal },
  { type: ServiceType.PostConstruction, label: 'Post-Con', icon: Wrench },
];

export const ServiceTypeGrid = memo(({ selectedService, setSelectedService }: ServiceTypeGridProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {serviceOptions.map((service) => {
        const IconComponent = service.icon;
        const isSelected = selectedService === service.type;
        
        return (
          <button
            key={service.type}
            type="button"
            onClick={() => setSelectedService(service.type)}
            className={cn(
              "rounded-xl border-2 transition-all duration-300 flex flex-col items-center shadow-sm hover:shadow-md",
              isMobile ? "p-4 gap-2" : "p-3 gap-1",
              isSelected 
                ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                : 'bg-card border-border hover:bg-primary hover:text-primary-foreground hover:border-primary'
            )}
          >
            <IconComponent 
              className={cn(
                "transition-colors",
                isMobile ? "h-6 w-6" : "h-5 w-5",
                isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
              )} 
              strokeWidth={1.5}
            />
            <span className={cn(
              "font-medium transition-colors",
              isMobile ? "text-sm" : "text-xs",
              isSelected ? 'text-primary-foreground' : 'text-card-foreground'
            )}>
              {service.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});

ServiceTypeGrid.displayName = "ServiceTypeGrid";
