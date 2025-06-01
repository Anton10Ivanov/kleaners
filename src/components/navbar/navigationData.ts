
import { 
  Home, 
  Building2, 
  Briefcase, 
  Scissors, 
  Spray,
  Car,
  TreePine,
  Hammer,
  Building,
  ShoppingCart,
  Zap,
  Users,
  Sparkles,
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
} from "lucide-react";

export const serviceCategories = [
  {
    title: "Residential Services",
    icon: <Home className="h-5 w-5" />,
    services: [
      {
        title: "Home Cleaning",
        href: "/services/home-cleaning",
        description: "Regular home maintenance and cleaning",
        icon: <Home className="h-4 w-4" />
      },
      {
        title: "Move In/Out Cleaning",
        href: "/services/move-in-out", 
        description: "Deep cleaning for moving transitions",
        icon: <Truck className="h-4 w-4" />
      },
      {
        title: "Window Cleaning",
        href: "/services/window-cleaning",
        description: "Crystal clear window cleaning services",
        icon: <Sparkles className="h-4 w-4" />
      },
      {
        title: "Carpet Cleaning",
        href: "/services/carpet-cleaning",
        description: "Professional carpet and rug cleaning",
        icon: <Scissors className="h-4 w-4" />
      },
      {
        title: "Upholstery Cleaning",
        href: "/services/upholstery-cleaning",
        description: "Furniture and fabric deep cleaning",
        icon: <Sparkles className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Commercial Services",
    icon: <Building2 className="h-5 w-5" />,
    services: [
      {
        title: "Office Cleaning",
        href: "/services/office-cleaning",
        description: "Professional office maintenance",
        icon: <Building2 className="h-4 w-4" />
      },
      {
        title: "Business Solutions",
        href: "/business-solutions",
        description: "Corporate partnerships and programs",
        icon: <Award className="h-4 w-4" />
      },
      {
        title: "Industrial Cleaning",
        href: "/services/industrial-cleaning",
        description: "Heavy-duty industrial cleaning",
        icon: <Factory className="h-4 w-4" />
      },
      {
        title: "Medical Practice Cleaning",
        href: "/services/medical-practice-cleaning",
        description: "Sterile medical facility cleaning",
        icon: <Heart className="h-4 w-4" />
      },
      {
        title: "Kindergarten Cleaning",
        href: "/services/kindergarten-cleaning",
        description: "Child-safe educational facility cleaning",
        icon: <GraduationCap className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Specialized Services",
    icon: <Briefcase className="h-5 w-5" />,
    services: [
      {
        title: "Intensive Cleaning",
        href: "/services/intensive-cleaning",
        description: "Deep and thorough cleaning solutions",
        icon: <Spray className="h-4 w-4" />
      },
      {
        title: "Disinfection Cleaning",
        href: "/services/disinfection-cleaning",
        description: "Professional sanitization services",
        icon: <Shield className="h-4 w-4" />
      },
      {
        title: "Construction Cleaning",
        href: "/services/construction-cleaning",
        description: "Post-construction cleanup",
        icon: <Hammer className="h-4 w-4" />
      },
      {
        title: "Crime Scene Cleaning",
        href: "/services/crime-scene-cleaning",
        description: "Specialized trauma scene cleanup",
        icon: <Shield className="h-4 w-4" />
      },
      {
        title: "Hoarder Cleaning",
        href: "/services/hoarder-cleaning",
        description: "Compassionate hoarding cleanup",
        icon: <ClipboardList className="h-4 w-4" />
      }
    ]
  }
];

export const aboutItems = [
  {
    label: "Company's Values",
    description: "Our principles and what we stand for",
    icon: <Heart className="h-4 w-4" />,
    path: "/about/values"
  },
  {
    label: "FAQ",
    description: "Frequently asked questions",
    icon: <HelpCircle className="h-4 w-4" />,
    path: "/about/faq"
  },
  {
    label: "Terms of Service",
    description: "Our terms and conditions",
    icon: <FileText className="h-4 w-4" />,
    path: "/legal/terms"
  },
  {
    label: "Privacy Policy",
    description: "How we handle your data",
    icon: <Shield className="h-4 w-4" />,
    path: "/legal/privacy"
  }
];

export const contactItems = [
  {
    label: "Get in Touch",
    description: "Contact our customer service team",
    icon: <Phone className="h-4 w-4" />,
    path: "/contact"
  },
  {
    label: "Join Our Team",
    description: "Apply to work with us",
    icon: <Users className="h-4 w-4" />,
    path: "/join-team"
  }
];
