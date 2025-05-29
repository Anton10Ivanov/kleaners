
import { ShoppingBag, HomeIcon, Building2, ArrowRightLeft, HardHat, User, BookOpen, Phone, Shield, FileText, Mail, Sparkles, Factory, Wrench, TreePine, Car, Droplets } from 'lucide-react';

export const Icons = {
  regular: ShoppingBag,
  business: Building2,
  moveInOut: ArrowRightLeft,
  postConstruction: HardHat,
  user: User,
  about: BookOpen,
  contact: Phone,
  admin: Shield,
  legal: FileText,
  email: Mail,
  residential: HomeIcon,
  commercial: Building2,
  specialized: Sparkles,
  maintenance: Wrench,
  outdoor: TreePine,
  technical: Factory,
  hospitality: Droplets,
  specialty: HardHat,
};

export const serviceCategories = [
  {
    title: "Residential Services",
    icon: Icons.residential,
    services: [
      {
        title: "Regular Cleaning",
        href: "/services/regular-cleaning",
        description: "Professional home cleaning service"
      },
      {
        title: "Move In/Out Cleaning",
        href: "/services/move-in-out",
        description: "Thorough cleaning for transitions"
      },
      {
        title: "Intensive Cleaning",
        href: "/services/intensive-cleaning",
        description: "Deep cleaning for thorough results"
      },
      {
        title: "Carpet Cleaning",
        href: "/services/carpet-cleaning",
        description: "Professional carpet deep cleaning"
      },
      {
        title: "Upholstery Cleaning",
        href: "/services/upholstery-cleaning",
        description: "Furniture and fabric cleaning"
      },
      {
        title: "Window Cleaning",
        href: "/services/window-cleaning",
        description: "Crystal clear windows inside and out"
      },
      {
        title: "Pet Hair Removal",
        href: "/services/pet-hair-removal",
        description: "Specialized pet hair cleaning"
      },
      {
        title: "Household Clearance",
        href: "/services/household-clearance",
        description: "Complete household clearing service"
      }
    ]
  },
  {
    title: "Commercial Services",
    icon: Icons.commercial,
    services: [
      {
        title: "Business Cleaning",
        href: "/services/business-cleaning",
        description: "Commercial cleaning solutions"
      },
      {
        title: "Office Cleaning",
        href: "/services/business-cleaning",
        description: "Professional office maintenance"
      },
      {
        title: "Medical Practice Cleaning",
        href: "/services/medical-practice-cleaning",
        description: "Healthcare facility cleaning"
      },
      {
        title: "Kindergarten Cleaning",
        href: "/services/kindergarten-cleaning",
        description: "Child-safe educational facility cleaning"
      },
      {
        title: "Care Facility Cleaning",
        href: "/services/care-facility-cleaning",
        description: "Specialized care home cleaning"
      },
      {
        title: "Stairwell Cleaning",
        href: "/services/stairwell-cleaning",
        description: "Common area maintenance"
      }
    ]
  },
  {
    title: "Specialized Services",
    icon: Icons.specialized,
    services: [
      {
        title: "Crime Scene Cleaning",
        href: "/services/crime-scene-cleaning",
        description: "Professional biohazard cleanup"
      },
      {
        title: "Hoarder Cleaning",
        href: "/services/hoarder-cleaning",
        description: "Compassionate hoarding cleanup"
      },
      {
        title: "Mold Removal",
        href: "/services/mold-removal",
        description: "Safe mold remediation services"
      },
      {
        title: "Disinfection Cleaning",
        href: "/services/disinfection-cleaning",
        description: "Professional sanitization services"
      },
      {
        title: "Ventilation Cleaning",
        href: "/services/ventilation-cleaning",
        description: "HVAC and air duct cleaning"
      },
      {
        title: "Pipe Cleaning",
        href: "/services/pipe-cleaning",
        description: "Professional drain and pipe cleaning"
      }
    ]
  },
  {
    title: "Industrial & Construction",
    icon: Icons.technical,
    services: [
      {
        title: "Industrial Cleaning",
        href: "/services/industrial-cleaning",
        description: "Heavy-duty industrial cleaning"
      },
      {
        title: "Construction Cleaning",
        href: "/services/construction-cleaning",
        description: "Post-construction cleanup"
      },
      {
        title: "Trade Fair Cleaning",
        href: "/services/trade-fair-cleaning",
        description: "Event and exhibition cleaning"
      },
      {
        title: "Underground Garage Cleaning",
        href: "/services/underground-garage-cleaning",
        description: "Parking facility maintenance"
      },
      {
        title: "Multi-Surface Cleaning",
        href: "/services/multi-surface-cleaning",
        description: "Various surface cleaning solutions"
      }
    ]
  },
  {
    title: "Exterior & Outdoor",
    icon: Icons.outdoor,
    services: [
      {
        title: "Facade Cleaning",
        href: "/services/facade-cleaning",
        description: "Building exterior cleaning"
      },
      {
        title: "Roof Cleaning",
        href: "/services/roof-cleaning",
        description: "Professional roof maintenance"
      },
      {
        title: "Sidewalk Cleaning",
        href: "/services/sidewalk-cleaning",
        description: "Pathway and winter service"
      },
      {
        title: "Gardening",
        href: "/services/gardening",
        description: "Garden maintenance and care"
      },
      {
        title: "Stone Surface Cleaning",
        href: "/services/stone-surface-cleaning",
        description: "Natural stone maintenance"
      },
      {
        title: "Graffiti Removal",
        href: "/services/graffiti-removal",
        description: "Professional graffiti cleaning"
      }
    ]
  },
  {
    title: "Hospitality & Events",
    icon: Icons.hospitality,
    services: [
      {
        title: "Holiday Apartment Cleaning",
        href: "/services/holiday-apartment-cleaning",
        description: "Vacation rental maintenance"
      },
      {
        title: "Pool Cleaning",
        href: "/services/pool-cleaning",
        description: "Swimming pool maintenance"
      },
      {
        title: "Glass Cleaning Winter Garden",
        href: "/services/glass-cleaning-winter-garden",
        description: "Conservatory glass cleaning"
      },
      {
        title: "Vehicle Cleaning",
        href: "/services/vehicle-cleaning",
        description: "Professional car cleaning"
      }
    ]
  }
];

export const serviceLinks = [
  {
    title: "Regular Cleaning",
    href: "/services/regular-cleaning",
    description: "Professional home cleaning service",
    icon: Icons.regular,
  },
  {
    title: "Business Cleaning",
    href: "/services/business-cleaning",
    description: "Commercial cleaning solutions",
    icon: Icons.business,
  },
  {
    title: "Move In/Out",
    href: "/services/move-in-out",
    description: "Thorough cleaning for transitions",
    icon: Icons.moveInOut,
  },
  {
    title: "Construction Cleaning",
    href: "/services/construction-cleaning",
    description: "Clean-up after construction work",
    icon: Icons.postConstruction,
  },
];

export const navigationData = [
  {
    title: "Services",
    href: "/services",
    children: serviceCategories
  },
  {
    title: "About",
    href: "/about",
    children: [
      { title: "Company Values", href: "/about/values" },
      { title: "FAQ", href: "/about/faq" }
    ]
  },
  {
    title: "Contact",
    href: "/contact"
  },
  {
    title: "Legal",
    href: "/legal",
    children: [
      { title: "Terms of Service", href: "/legal/terms" },
      { title: "Privacy Policy", href: "/legal/privacy" }
    ]
  }
];
