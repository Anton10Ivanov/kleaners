
import { LucideIcon } from "lucide-react";

export type AdvantageItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
};

export type AdvantageCategory = {
  id: string;
  title: string;
  items: AdvantageItem[];
};
