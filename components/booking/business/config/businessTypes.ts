
import { Building2, Store, UtensilsCrossed, Building, School, Warehouse, HelpCircle, Home, PartyPopper, Stethoscope } from "lucide-react";

export const businessTypes = [
  { value: "office", label: "Office", icon: Building2 },
  { value: "retail", label: "Retail Store", icon: Store },
  { value: "restaurant", label: "Restaurant/Café", icon: UtensilsCrossed },
  { value: "medical", label: "Medical Facility", icon: Building },
  { value: "school", label: "School/Educational", icon: School },
  { value: "warehouse", label: "Warehouse/Industrial", icon: Warehouse },
  { value: "airbnb", label: "Airbnb Cleaning", icon: Home },
  { value: "event", label: "Event Cleaning", icon: PartyPopper },
  { value: "praxen", label: "Praxen", icon: Stethoscope },
  { value: "other", label: "Other", icon: HelpCircle },
];
