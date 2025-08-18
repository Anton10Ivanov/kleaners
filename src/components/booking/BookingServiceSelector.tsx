import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Sparkles, ArrowRightLeft, HardHat } from 'lucide-react';
import { ServiceType } from '@/schemas/booking';

interface BookingServiceSelectorProps {
  onServiceSelect: (service: ServiceType) => void;
}

const services = [
  {
    type: ServiceType.Home,
    title: 'Home Cleaning',
    description: 'Regular cleaning for your home',
    icon: Home,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    iconColor: 'text-blue-600',
    route: '/booking/home-cleaning'
  },
  {
    type: ServiceType.Office,
    title: 'Office Cleaning',
    description: 'Professional business cleaning',
    icon: Building,
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    iconColor: 'text-green-600',
    route: '/booking/office-cleaning'
  },
  {
    type: ServiceType.DeepCleaning,
    title: 'Deep Cleaning',
    description: 'Thorough intensive cleaning',
    icon: Sparkles,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    iconColor: 'text-purple-600',
    route: '/booking/deep-cleaning'
  },
  {
    type: ServiceType.MoveInOut,
    title: 'Move In/Out',
    description: 'Moving cleaning service',
    icon: ArrowRightLeft,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    iconColor: 'text-neutral-icon',
    route: '/booking/move-in-out'
  },
  {
    type: ServiceType.PostConstruction,
    title: 'Post Construction',
    description: 'Construction cleanup service',
    icon: HardHat,
    color: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/20',
    iconColor: 'text-secondary',
    route: '/booking/post-construction'
  }
];

const BookingServiceSelector = ({ onServiceSelect }: BookingServiceSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Service
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Select the type of cleaning service you need
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          
          return (
            <motion.div
              key={service.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`cursor-pointer transition-all duration-200 ${service.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                      <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <Button 
                        onClick={() => onServiceSelect(service.type)}
                        className="w-full"
                      >
                        Select Service
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingServiceSelector;
