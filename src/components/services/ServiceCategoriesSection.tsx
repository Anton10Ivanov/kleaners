import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { SectionTemplate } from "../home/SectionTemplate";
import { BadgeDollarSign } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  href: string;
  features: string[];
  category: string;
  icon: React.ElementType;
  services: {
    title: string;
    href: string;
  }[];
}

interface ServiceCategoriesSectionProps {
  serviceCategories: ServiceCategory[];
}

export const ServiceCategoriesSection: React.FC<ServiceCategoriesSectionProps> = ({ serviceCategories }) => (
  <SectionTemplate
    icon={<BadgeDollarSign className="h-8 w-8 text-primary" />}
    title="Our Popular Cleaning Services"
    description="Choose from a range of trusted cleaning options for any occasion."
    background="bg-gradient-to-br from-white via-theme-lightblue to-primary/5"
    id="services"
    grid
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {serviceCategories.map((category) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-gray-800/90 border border-primary/10 rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  {React.createElement(category.icon, { className: "h-5 w-5 text-primary" })}
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-semibold">
                  {category.price}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
              <CardDescription className="text-base">{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="space-y-2">
                {category.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={category.href} className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-between">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  </SectionTemplate>
);
