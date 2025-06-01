
import { 
  Home, 
  Building2, 
  Briefcase, 
  Scissors, 
  Sparkles,
  Car,
  TreePine,
  Hammer,
  Building,
  ShoppingCart,
  Zap,
  Users,
  Factory,
  GraduationCap,
  Shield,
  Truck,
  Palette,
  ClipboardList,
  FlameKindling,
  Search,
  Waves,
  Trash2,
  Heart,
  HelpCircle,
  Phone,
  FileText,
  Award,
  LucideIcon
} from "lucide-react";

export const serviceCategories = [
  {
    title: "Residential Services",
    icon: Home,
    services: [
      {
        title: "Home Cleaning",
        href: "/services/home-cleaning",
        description: "Regular home maintenance and cleaning",
        icon: Home
      },
      {
        title: "Move In/Out Cleaning",
        href: "/services/move-in-out", 
        description: "Deep cleaning for moving transitions",
        icon: Truck
      },
      {
        title: "Window Cleaning",
        href: "/services/window-cleaning",
        description: "Crystal clear window cleaning services",
        icon: Sparkles
      },
      {
        title: "Carpet Cleaning",
        href: "/services/carpet-cleaning",
        description: "Professional carpet and rug cleaning",
        icon: Scissors
      },
      {
        title: "Upholstery Cleaning",
        href: "/services/upholstery-cleaning",
        description: "Furniture and fabric deep cleaning",
        icon: Sparkles
      }
    ]
  },
  {
    title: "Commercial Services",
    icon: Building2,
    services: [
      {
        title: "Office Cleaning",
        href: "/services/office-cleaning",
        description: "Professional office maintenance",
        icon: Building2
      },
      {
        title: "Business Solutions",
        href: "/business-solutions",
        description: "Corporate partnerships and programs",
        icon: Award
      },
      {
        title: "Industrial Cleaning",
        href: "/services/industrial-cleaning",
        description: "Heavy-duty industrial cleaning",
        icon: Factory
      },
      {
        title: "Medical Practice Cleaning",
        href: "/services/medical-practice-cleaning",
        description: "Sterile medical facility cleaning",
        icon: Heart
      },
      {
        title: "Kindergarten Cleaning",
        href: "/services/kindergarten-cleaning",
        description: "Child-safe educational facility cleaning",
        icon: GraduationCap
      }
    ]
  },
  {
    title: "Specialized Services",
    icon: Briefcase,
    services: [
      {
        title: "Intensive Cleaning",
        href: "/services/intensive-cleaning",
        description: "Deep and thorough cleaning solutions",
        icon: Sparkles
      },
      {
        title: "Disinfection Cleaning",
        href: "/services/disinfection-cleaning",
        description: "Professional sanitization services",
        icon: Shield
      },
      {
        title: "Construction Cleaning",
        href: "/services/construction-cleaning",
        description: "Post-construction cleanup",
        icon: Hammer
      },
      {
        title: "Crime Scene Cleaning",
        href: "/services/crime-scene-cleaning",
        description: "Specialized trauma scene cleanup",
        icon: Shield
      },
      {
        title: "Hoarder Cleaning",
        href: "/services/hoarder-cleaning",
        description: "Compassionate hoarding cleanup",
        icon: ClipboardList
      }
    ]
  }
];

// Most popular services for footer display
export const popularServices = [
  {
    title: "Home Cleaning",
    href: "/services/home-cleaning",
    badge: "Most Popular"
  },
  {
    title: "Office Cleaning", 
    href: "/services/office-cleaning",
    badge: "Business Favorite"
  },
  {
    title: "Move In/Out",
    href: "/services/move-in-out",
    badge: "High Demand"
  },
  {
    title: "Window Cleaning",
    href: "/services/window-cleaning"
  },
  {
    title: "Carpet Cleaning",
    href: "/services/carpet-cleaning"
  },
  {
    title: "Industrial Cleaning",
    href: "/services/industrial-cleaning"
  }
];

export const aboutItems = [
  {
    label: "Company's Values",
    description: "Our principles and what we stand for",
    icon: Heart,
    path: "/about/values"
  },
  {
    label: "FAQ",
    description: "Frequently asked questions",
    icon: HelpCircle,
    path: "/about/faq"
  },
  {
    label: "Terms of Service",
    description: "Our terms and conditions",
    icon: FileText,
    path: "/legal/terms"
  },
  {
    label: "Privacy Policy",
    description: "How we handle your data",
    icon: Shield,
    path: "/legal/privacy"
  }
];

export const contactItems = [
  {
    label: "Get in Touch",
    description: "Contact our customer service team",
    icon: Phone,
    path: "/contact"
  },
  {
    label: "Join Our Team",
    description: "Apply to work with us",
    icon: Users,
    path: "/join-team"
  }
];

// Enhanced navigation data for navbar with Business Solutions prominently placed
export const navigationData = [
  { title: "Services", href: "/services" },
  { title: "Business Solutions", href: "/business-solutions", highlighted: true },
  { title: "About", href: "/about/values" },
  { title: "Contact", href: "/contact" }
];

// Export Icons for backward compatibility
export const Icons = {
  Home,
  Building2,
  Briefcase,
  Scissors,
  Sparkles,
  Car,
  TreePine,
  Hammer,
  Building,
  ShoppingCart,
  Zap,
  Users,
  Factory,
  GraduationCap,
  Shield,
  Truck,
  Palette,
  ClipboardList,
  FlameKindling,
  Search,
  Waves,
  Trash2,
  Heart,
  HelpCircle,
  Phone,
  FileText,
  Award
};
