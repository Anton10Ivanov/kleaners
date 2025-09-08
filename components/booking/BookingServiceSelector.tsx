import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building, Sparkles, ArrowRightLeft, HardHat, Brush, Users, Zap, PackageOpen, Construction, Check } from 'lucide-react';
import { ServiceType } from '@/schemas/booking';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from '@/lib/utils';

// Import background images
import homeCleaningBg from '@/assets/home-cleaning-bg.jpg';
import officeCleaningBg from '@/assets/office-cleaning-bg.jpg';
import deepCleaningBg from '@/assets/deep-cleaning-bg.jpg';
import moveInOutBg from '@/assets/move-in-out-bg.jpg';
import postConstructionBg from '@/assets/post-construction-bg.jpg';

interface BookingServiceSelectorProps {
  onServiceSelect: (service: ServiceType) => void;
  selectedService?: ServiceType;
}

const services = [
  {
    type: ServiceType.Home,
    title: 'Home Cleaning',
    description: 'Regular maintenance cleaning for your home with professional care',
    icon: Brush,
    gradient: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    route: '/booking/home-cleaning',
    backgroundImage: homeCleaningBg
  },
  {
    type: 'home-cleaning-22' as ServiceType,
    title: 'Home Cleaning 22',
    description: 'Advanced booking flow with package options and flexible scheduling',
    icon: Sparkles,
    gradient: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    iconColor: 'text-pink-600 dark:text-pink-400',
    route: '/booking/home-cleaning22',
    backgroundImage: homeCleaningBg
  },
  {
    type: ServiceType.Office,
    title: 'Office Cleaning',
    description: 'Professional business cleaning for productive workspaces',
    icon: Users,
    gradient: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    route: '/booking/office-cleaning',
    backgroundImage: officeCleaningBg
  },
  {
    type: ServiceType.DeepCleaning,
    title: 'Deep Cleaning',
    description: 'Intensive restoration cleaning for maximum cleanliness',
    icon: Zap,
    gradient: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400',
    route: '/booking/deep-cleaning',
    backgroundImage: deepCleaningBg
  },
  {
    type: ServiceType.MoveInOut,
    title: 'Move In/Out',
    description: 'Complete cleaning for property transitions and moves',
    icon: PackageOpen,
    gradient: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
    route: '/booking/move-in-out',
    backgroundImage: moveInOutBg
  },
  {
    type: ServiceType.PostConstruction,
    title: 'Post Construction',
    description: 'Specialized cleanup after construction and renovation work',
    icon: Construction,
    gradient: 'from-secondary to-secondary/80',
    bgColor: 'bg-secondary/10 dark:bg-secondary/5',
    borderColor: 'border-secondary/20 dark:border-secondary/30',
    iconColor: 'text-secondary dark:text-secondary',
    route: '/booking/post-construction',
    backgroundImage: postConstructionBg
  }
];

const BookingServiceSelector = ({ onServiceSelect, selectedService }: BookingServiceSelectorProps) => {
  const { getMobileSpacing, isMobile } = useMobileOptimizations();
  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <span>Step 1 of 3</span>
              <div className="flex space-x-1">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full ${
                      step === 1 ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the type of cleaning service you need to get started with your personalized quote
          </p>
        </div>
        
        <div className={cn(
          "grid gap-6 max-w-6xl mx-auto",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === service.type;
            
            return (
              <motion.div
                key={service.type}
                whileHover={{ scale: isMobile ? 1.0 : 1.02, y: isMobile ? 0 : -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => onServiceSelect(service.type)}
                className="cursor-pointer"
              >
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-xl group relative overflow-hidden",
                  service.bgColor,
                  service.borderColor,
                  "border-2",
                  isSelected ? "border-primary bg-primary/5" : "border-border",
                  isMobile && "touch-comfortable min-h-[80px]"
                )}>
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${service.backgroundImage})` }}
                  />
                  
                  <div className="relative z-10">
                    {/* Mobile Selection Indicator */}
                    {isSelected && isMobile && (
                      <div className="absolute top-3 right-3">
                        <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}

                    <CardHeader className={cn("pb-4", isMobile && getMobileSpacing('md'))}>
                      <div className={cn(
                        "rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg",
                        service.gradient,
                        isMobile ? "w-12 h-12" : "w-16 h-16"
                      )}>
                        <IconComponent className={cn("text-white", isMobile ? "h-6 w-6" : "h-8 w-8")} />
                      </div>
                      <CardTitle className={cn(
                        "font-bold text-foreground group-hover:text-primary transition-colors",
                        isSelected && isMobile ? "text-primary" : "text-foreground",
                        isMobile ? "text-lg" : "text-xl"
                      )}>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("pt-0", isMobile && getMobileSpacing('md'))}>
                      <p className={cn(
                        "text-muted-foreground leading-relaxed",
                        isMobile ? "text-sm mb-4" : "text-sm mb-6"
                      )}>
                        {service.description}
                      </p>
                      {!isMobile && (
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl h-12 transition-all duration-300 group-hover:shadow-lg"
                        >
                          Select Service
                        </Button>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>2,500+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Same-day Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingServiceSelector;
