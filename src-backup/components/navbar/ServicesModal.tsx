import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceCategoriesGrid } from '@/components/services/ServiceCategoriesGrid';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  popular?: boolean;
  href: string;
  features?: string[];
  category?: string;
}

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reorganized service categories into 6 main categories
const serviceCategories: ServiceCategory[] = [
  // RESIDENTIAL SERVICES
  {
    id: 'home-cleaning',
    title: 'Home Cleaning',
    description: 'Regular maintenance cleaning for your home',
    image: '/assets/img/home-cleaning-bg.jpg',
    price: 'From €25/hour',
    popular: true,
    href: '/services/home-cleaning',
    features: ['Regular maintenance', 'Eco-friendly products', 'Flexible scheduling'],
    category: 'residential'
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'Comprehensive deep cleaning service',
    image: '/assets/img/deep-cleaning-bg.jpg',
    price: 'From €35/hour',
    popular: true,
    href: '/services/deep-cleaning',
    features: ['Intensive cleaning', 'All areas covered', 'Professional equipment'],
    category: 'residential'
  },
  {
    id: 'move-in-out',
    title: 'Move In/Out Cleaning',
    description: 'Deep cleaning for moving transitions',
    image: '/assets/img/move-in-out-bg.jpg',
    price: 'From €40/hour',
    popular: true,
    href: '/services/move-in-out',
    features: ['Complete cleaning', 'Move-in ready', 'Deposit return'],
    category: 'residential'
  },
  {
    id: 'intensive-cleaning',
    title: 'Intensive Cleaning',
    description: 'Comprehensive intensive cleaning service',
    image: '/assets/img/intensive-cleaning.jpg',
    price: 'From €50/hour',
    popular: false,
    href: '/services/intensive-cleaning',
    features: ['Thorough cleaning', 'Multiple sessions', 'Quality guarantee'],
    category: 'residential'
  },
  {
    id: 'holiday-apartment-cleaning',
    title: 'Holiday Apartment Cleaning',
    description: 'Vacation rental cleaning services',
    image: '/assets/img/holiday-apartment-cleaning.jpg',
    price: 'From €35/hour',
    popular: false,
    href: '/services/holiday-apartment-cleaning',
    features: ['Turnover cleaning', 'Guest-ready', 'Flexible scheduling'],
    category: 'residential'
  },

  // COMMERCIAL SERVICES
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning',
    image: '/assets/img/office-cleaning-bg.jpg',
    price: 'From €30/hour',
    popular: true,
    href: '/services/office-cleaning',
    features: ['Business hours', 'Professional staff', 'Customized plans'],
    category: 'commercial'
  },
  {
    id: 'industrial-cleaning',
    title: 'Industrial Cleaning',
    description: 'Heavy-duty industrial facility cleaning',
    image: '/assets/img/industrial-cleaning.jpg',
    price: 'From €50/hour',
    popular: false,
    href: '/services/industrial-cleaning',
    features: ['Heavy machinery', 'Safety protocols', '24/7 availability'],
    category: 'commercial'
  },
  {
    id: 'kindergarten-cleaning',
    title: 'Kindergarten Cleaning',
    description: 'Specialized cleaning for childcare facilities',
    image: '/assets/img/kindergarten-cleaning.jpg',
    price: 'From €35/hour',
    popular: false,
    href: '/services/kindergarten-cleaning',
    features: ['Child-safe products', 'Hygiene standards', 'Flexible timing'],
    category: 'commercial'
  },
  {
    id: 'stairwell-cleaning',
    title: 'Stairwell Cleaning',
    description: 'Professional stairwell and hallway cleaning',
    image: '/assets/img/stairwell-cleaning.jpg',
    price: 'From €30/hour',
    popular: false,
    href: '/services/stairwell-cleaning',
    features: ['High-rise access', 'Regular maintenance', 'Safety protocols'],
    category: 'commercial'
  },
  {
    id: 'underground-garage-cleaning',
    title: 'Underground Garage Cleaning',
    description: 'Parking garage cleaning services',
    image: '/assets/img/underground-garage-cleaning.jpg',
    price: 'From €40/hour',
    popular: false,
    href: '/services/underground-garage-cleaning',
    features: ['Pressure washing', 'Oil stain removal', 'Regular maintenance'],
    category: 'commercial'
  },
  {
    id: 'trade-fair-cleaning',
    title: 'Trade Fair Cleaning',
    description: 'Event and trade fair cleaning',
    image: '/assets/img/trade-fair-cleaning.jpg',
    price: 'From €45/hour',
    popular: false,
    href: '/services/trade-fair-cleaning',
    features: ['Event setup', 'Post-event cleanup', 'Flexible timing'],
    category: 'commercial'
  },

  // SPECIALISED SERVICES
  {
    id: 'post-construction',
    title: 'Post-Construction Cleaning',
    description: 'Specialized cleaning after construction work',
    image: '/assets/img/post-construction-bg.jpg',
    price: 'From €45/hour',
    popular: false,
    href: '/services/post-construction',
    features: ['Debris removal', 'Dust elimination', 'Final cleanup'],
    category: 'specialized'
  },
  {
    id: 'construction-cleaning',
    title: 'Construction Cleaning',
    description: 'Post-construction cleanup services',
    image: '/assets/img/construction-cleaning.jpg',
    price: 'From €45/hour',
    popular: false,
    href: '/services/construction-cleaning',
    features: ['Debris removal', 'Dust control', 'Final inspection'],
    category: 'specialized'
  },
  {
    id: 'hoarder-cleaning',
    title: 'Hoarder Cleaning',
    description: 'Specialized hoarding cleanup services',
    image: '/assets/img/hoarder-cleaning.jpg',
    price: 'From €60/hour',
    popular: false,
    href: '/services/hoarder-cleaning',
    features: ['Sensitive approach', 'Complete clearance', 'Professional disposal'],
    category: 'specialized'
  },
  {
    id: 'crime-scene-cleaning',
    title: 'Crime Scene Cleaning',
    description: 'Specialized biohazard cleanup services',
    image: '/assets/img/crime-scene-cleaning.jpg',
    price: 'From €80/hour',
    popular: false,
    href: '/services/crime-scene-cleaning',
    features: ['Biohazard cleanup', 'Trauma cleaning', 'Certified specialists'],
    category: 'specialized'
  },
  {
    id: 'household-clearance',
    title: 'Household Clearance',
    description: 'Complete household clearance services',
    image: '/assets/img/household-clearance.jpg',
    price: 'From €40/hour',
    popular: false,
    href: '/services/household-clearance',
    features: ['Complete clearance', 'Waste disposal', 'Item sorting'],
    category: 'specialized'
  },
  {
    id: 'graffiti-removal',
    title: 'Graffiti Removal',
    description: 'Professional graffiti removal services',
    image: '/assets/img/graffiti-removal.jpg',
    price: 'From €30/hour',
    popular: false,
    href: '/services/graffiti-removal',
    features: ['Paint removal', 'Surface restoration', 'Prevention coating'],
    category: 'specialized'
  },
  {
    id: 'stone-surface-cleaning',
    title: 'Stone Surface Cleaning',
    description: 'Marble, granite, and stone surface cleaning',
    image: '/assets/img/stone-surface-cleaning.jpg',
    price: 'From €40/hour',
    popular: false,
    href: '/services/stone-surface-cleaning',
    features: ['Stone care', 'Sealing treatment', 'Restoration'],
    category: 'specialized'
  },
  {
    id: 'pipe-cleaning',
    title: 'Pipe Cleaning',
    description: 'Drain and pipe cleaning services',
    image: '/assets/img/pipe-cleaning.jpg',
    price: 'From €35/hour',
    popular: false,
    href: '/services/pipe-cleaning',
    features: ['Drain unclogging', 'Pipe inspection', 'Preventive maintenance'],
    category: 'specialized'
  },

  // WINDOWS SERVICES
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Professional window cleaning services',
    image: '/assets/img/window-cleaning.jpg',
    price: 'From €20/hour',
    popular: false,
    href: '/services/window-cleaning',
    features: ['Streak-free finish', 'Safety equipment', 'All heights'],
    category: 'windows'
  },
  {
    id: 'glass-cleaning-winter-garden',
    title: 'Glass Cleaning Winter Garden',
    description: 'Specialized glass cleaning for conservatories',
    image: '/assets/img/glass-cleaning-winter-garden.jpg',
    price: 'From €35/hour',
    popular: false,
    href: '/services/glass-cleaning-winter-garden',
    features: ['Conservatory cleaning', 'Hard-to-reach areas', 'Specialized equipment'],
    category: 'windows'
  },

  // GARDEN & OUTDOOR SERVICES
  {
    id: 'gardening',
    title: 'Gardening',
    description: 'Garden maintenance and landscaping',
    image: '/assets/img/gardening.jpg',
    price: 'From €30/hour',
    popular: false,
    href: '/services/gardening',
    features: ['Garden maintenance', 'Landscaping', 'Seasonal care'],
    category: 'garden-outdoor'
  },
  {
    id: 'pool-cleaning',
    title: 'Pool Cleaning',
    description: 'Swimming pool maintenance and cleaning',
    image: '/assets/img/pool-cleaning.jpg',
    price: 'From €40/hour',
    popular: false,
    href: '/services/pool-cleaning',
    features: ['Pool maintenance', 'Water treatment', 'Equipment care'],
    category: 'garden-outdoor'
  },
  {
    id: 'facade-cleaning',
    title: 'Facade Cleaning',
    description: 'Building exterior and facade cleaning',
    image: '/assets/img/facade-cleaning.jpg',
    price: 'From €45/hour',
    popular: false,
    href: '/services/facade-cleaning',
    features: ['High-rise cleaning', 'Pressure washing', 'Surface protection'],
    category: 'garden-outdoor'
  },
  {
    id: 'sidewalk-cleaning',
    title: 'Sidewalk Cleaning',
    description: 'Public area and sidewalk cleaning',
    image: '/assets/img/sidewalk-cleaning.jpg',
    price: 'From €25/hour',
    popular: false,
    href: '/services/sidewalk-cleaning',
    features: ['Pressure washing', 'Gum removal', 'Regular maintenance'],
    category: 'garden-outdoor'
  },

  // HEALTH & SAFETY SERVICES
  {
    id: 'disinfection-cleaning',
    title: 'Disinfection Cleaning',
    description: 'Sanitization and disinfection services',
    image: '/assets/img/disinfection-cleaning.jpg',
    price: 'From €35/hour',
    popular: false,
    href: '/services/disinfection-cleaning',
    features: ['Sanitization', 'Health safety', 'Certified products'],
    category: 'health-safety'
  },
  {
    id: 'mold-removal',
    title: 'Mold Removal',
    description: 'Professional mold remediation services',
    image: '/assets/img/mold-removal.jpg',
    price: 'From €60/hour',
    popular: false,
    href: '/services/mold-removal',
    features: ['Mold detection', 'Safe removal', 'Prevention treatment'],
    category: 'health-safety'
  },
  {
    id: 'care-facility-cleaning',
    title: 'Care Facility Cleaning',
    description: 'Healthcare facility cleaning',
    image: '/assets/img/care-facility-cleaning.jpg',
    price: 'From €40/hour',
    popular: false,
    href: '/services/care-facility-cleaning',
    features: ['Medical standards', 'Infection control', 'Specialized protocols'],
    category: 'health-safety'
  },
  {
    id: 'medical-practice-cleaning',
    title: 'Medical Practice Cleaning',
    description: 'Medical facility cleaning services',
    image: '/assets/img/medical-practice-cleaning.jpg',
    price: 'From €45/hour',
    popular: false,
    href: '/services/medical-practice-cleaning',
    features: ['Medical standards', 'Sterilization', 'Compliance protocols'],
    category: 'health-safety'
  },

  // ADDITIONAL SERVICES (Carpet & Upholstery)
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    description: 'Professional carpet cleaning services',
    image: '/assets/img/carpet-cleaning.jpg',
    price: 'From €25/hour',
    popular: false,
    href: '/services/carpet-cleaning',
    features: ['Deep stain removal', 'Odor elimination', 'Fabric protection'],
    category: 'residential'
  },
  {
    id: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    description: 'Professional furniture and upholstery cleaning',
    image: '/assets/img/upholstery-cleaning.jpg',
    price: 'From €30/hour',
    popular: false,
    href: '/services/upholstery-cleaning',
    features: ['Fabric care', 'Stain removal', 'Protection treatment'],
    category: 'residential'
  }
];

export const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Our Services</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Professional cleaning services tailored to your needs
          </p>
        </DialogHeader>
        
        <div className="overflow-y-auto p-6">
          <ServiceCategoriesGrid 
            categories={serviceCategories}
            title=""
            className="max-w-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesModal;
