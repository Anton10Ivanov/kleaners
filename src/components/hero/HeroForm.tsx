
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building, Sparkles, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceType } from "@/schemas/booking";
import { getBookingRoute } from "@/utils/serviceRouteMapping";

interface HeroFormProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
  isMobile: boolean;
}

const serviceOptions = [
  { type: ServiceType.Home, label: 'Home', icon: Home },
  { type: ServiceType.Office, label: 'Office', icon: Building },
  { type: ServiceType.DeepCleaning, label: 'Deep', icon: Sparkles },
  { type: ServiceType.MoveInOut, label: 'Move', icon: ArrowRightLeft },
];

export const HeroForm = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep,
  isMobile
}: HeroFormProps) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If a service is selected, navigate to specific booking route
    if (selectedService && postalCode) {
      const route = getBookingRoute(selectedService as ServiceType);
      navigate(route, {
        state: {
          selectedService,
          postalCode
        }
      });
    } else {
      // Fallback to original step-based flow
      handleNextStep();
    }
  };

  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} 
        className="w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mt-8"
      >
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Enhanced form header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-gray-600">Quick • Easy • Free • No Commitment</p>
          </div>

          {/* Location Input */}
          <div>
            <Input 
              type="text" 
              placeholder="City name or Postal code" 
              value={postalCode} 
              onChange={e => setPostalCode(e.target.value)} 
              className="h-16 px-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md" 
              required 
            />
          </div>

          {/* Service Type Grid */}
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
          
          {/* Enhanced CTA Button */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }} 
            whileTap={{ scale: 0.98 }} 
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button 
              type="submit" 
              className="w-full h-16 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Instant Quote. Fixed Price
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <p className="text-sm text-gray-500 text-center font-medium">
            No commitment • Free quotes • Instant booking
          </p>
        </motion.form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }} 
      className="absolute top-1/3 left-8 transform -translate-y-1/2 w-96 max-w-sm backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 z-10 py-0 px-[28px] bg-transparent"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.9 }} 
        className="space-y-4"
      >
        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2 text-center">
            Your Postal code
          </label>
          <Input 
            type="text" 
            placeholder="City name or Postal code" 
            value={postalCode} 
            onChange={e => setPostalCode(e.target.value)} 
            required 
            className="h-14 px-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md" 
          />
        </div>

        {/* Service Type Grid */}
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
        
        {/* CTA Button */}
        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }} 
          whileTap={{ scale: 0.98 }} 
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 group"
          >
            Instant Quote. Fixed Price
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
});

HeroForm.displayName = "HeroForm";
