
import { memo } from "react";
import { Home, Building, Sparkles, ArrowRightLeft } from "lucide-react";
import { ServiceType } from "@/schemas/booking";

interface ServiceTypeGridProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  isMobile: boolean;
}

const serviceOptions = [
  { type: ServiceType.Home, label: 'Home', icon: Home },
  { type: ServiceType.Office, label: 'Office', icon: Building },
  { type: ServiceType.DeepCleaning, label: 'Deep', icon: Sparkles },
  { type: ServiceType.MoveInOut, label: 'Move', icon: ArrowRightLeft },
];

export const ServiceTypeGrid = memo(({ selectedService, setSelectedService, isMobile }: ServiceTypeGridProps) => {
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {serviceOptions.map((service) => {
          const IconComponent = service.icon;
          const isSelected = selectedService === service.type;
          
          return (
            <button
              key={service.type}
              type="button"
              onClick={() => setSelectedService(service.type)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                isSelected 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-md'
              }`}
            >
              <IconComponent className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600 hover:text-white'}`} />
              <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-800 hover:text-white'}`}>
                {service.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {serviceOptions.map((service) => {
        const IconComponent = service.icon;
        const isSelected = selectedService === service.type;
        
        return (
          <button
            key={service.type}
            type="button"
            onClick={() => setSelectedService(service.type)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${
              isSelected 
                ? 'bg-primary text-white border-primary shadow-lg' 
                : 'bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-md'
            }`}
          >
            <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600 hover:text-white'}`} />
            <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-800 hover:text-white'}`}>
              {service.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});

ServiceTypeGrid.displayName = "ServiceTypeGrid";
