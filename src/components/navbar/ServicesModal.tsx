
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ServiceCategoriesGrid } from '@/components/services/ServiceCategoriesGrid';
import { serviceCategories } from './navigationData';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose
}) => {
  // Convert service categories to the format expected by ServiceCategoriesGrid
  const convertedCategories = serviceCategories.map(category => ({
    id: category.title.toLowerCase().replace(/\s+/g, '-'),
    title: category.title,
    description: category.description,
    image: "/placeholder.svg",
    price: "From €25/hour",
    href: category.services[0]?.href || "/services",
    features: category.services.map(service => service.title),
    category: category.title.toLowerCase()
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Our Cleaning Services</DialogTitle>
          <DialogDescription>
            Choose from our comprehensive range of professional cleaning services
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <ServiceCategoriesGrid 
            categories={convertedCategories}
            title="" // No title since we have it in the dialog header
            className="space-y-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
