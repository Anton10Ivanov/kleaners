
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { serviceCategories, popularServices } from '@/components/navbar/navigationData';
import { useMediaQuery } from '@/hooks/use-media-query';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllServices, setShowAllServices] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // All services from App.tsx routes - expanded list
  const allServicesFromRoutes = [
    { title: 'Home Cleaning', href: '/services/home-cleaning', description: 'Regular residential cleaning services', category: 'Residential' },
    { title: 'Office Cleaning', href: '/services/office-cleaning', description: 'Professional office cleaning services', category: 'Commercial' },
    { title: 'Move In/Out Cleaning', href: '/services/move-in-out', description: 'Deep cleaning for moving transitions', category: 'Specialized' },
    { title: 'Window Cleaning', href: '/services/window-cleaning', description: 'Professional window cleaning services', category: 'Specialized' },
    { title: 'Stairwell Cleaning', href: '/services/stairwell-cleaning', description: 'Common area stairwell maintenance', category: 'Commercial' },
    { title: 'Industrial Cleaning', href: '/services/industrial-cleaning', description: 'Heavy-duty industrial facility cleaning', category: 'Industrial' },
    { title: 'Intensive Cleaning', href: '/services/intensive-cleaning', description: 'Deep intensive cleaning services', category: 'Specialized' },
    { title: 'Ventilation Cleaning', href: '/services/ventilation-cleaning', description: 'HVAC and ventilation system cleaning', category: 'Specialized' },
    { title: 'Disinfection Cleaning', href: '/services/disinfection-cleaning', description: 'Professional disinfection services', category: 'Health & Safety' },
    { title: 'Construction Cleaning', href: '/services/construction-cleaning', description: 'Post-construction cleanup services', category: 'Specialized' },
    { title: 'Care Facility Cleaning', href: '/services/care-facility-cleaning', description: 'Healthcare facility cleaning', category: 'Health & Safety' },
    { title: 'Trade Fair Cleaning', href: '/services/trade-fair-cleaning', description: 'Event and trade fair cleaning', category: 'Event' },
    { title: 'Hoarder Cleaning', href: '/services/hoarder-cleaning', description: 'Specialized hoarding cleanup services', category: 'Specialized' },
    { title: 'Multi Surface Cleaning', href: '/services/multi-surface-cleaning', description: 'Comprehensive surface cleaning', category: 'Residential' },
    { title: 'Pool Cleaning', href: '/services/pool-cleaning', description: 'Swimming pool maintenance and cleaning', category: 'Outdoor' },
    { title: 'Pet Hair Removal', href: '/services/pet-hair-removal', description: 'Specialized pet hair cleaning services', category: 'Specialized' },
    { title: 'Underground Garage Cleaning', href: '/services/underground-garage-cleaning', description: 'Parking garage cleaning services', category: 'Commercial' },
    { title: 'Vehicle Cleaning', href: '/services/vehicle-cleaning', description: 'Professional vehicle cleaning', category: 'Automotive' },
    { title: 'Holiday Apartment Cleaning', href: '/services/holiday-apartment-cleaning', description: 'Vacation rental cleaning services', category: 'Hospitality' },
    { title: 'Glass Cleaning Winter Garden', href: '/services/glass-cleaning-winter-garden', description: 'Specialized glass cleaning for conservatories', category: 'Specialized' },
    { title: 'Gardening', href: '/services/gardening', description: 'Garden maintenance and landscaping', category: 'Outdoor' },
    { title: 'Medical Practice Cleaning', href: '/services/medical-practice-cleaning', description: 'Medical facility cleaning services', category: 'Health & Safety' },
    { title: 'Stone Surface Cleaning', href: '/services/stone-surface-cleaning', description: 'Natural stone cleaning and maintenance', category: 'Specialized' },
    { title: 'Pipe Cleaning', href: '/services/pipe-cleaning', description: 'Drain and pipe cleaning services', category: 'Maintenance' },
    { title: 'Graffiti Removal', href: '/services/graffiti-removal', description: 'Professional graffiti removal services', category: 'Specialized' },
    { title: 'Roof Cleaning', href: '/services/roof-cleaning', description: 'Roof maintenance and cleaning', category: 'Outdoor' },
    { title: 'Household Clearance', href: '/services/household-clearance', description: 'Complete household clearance services', category: 'Specialized' },
    { title: 'Mold Removal', href: '/services/mold-removal', description: 'Professional mold remediation', category: 'Health & Safety' },
    { title: 'Facade Cleaning', href: '/services/facade-cleaning', description: 'Building exterior cleaning', category: 'Commercial' },
    { title: 'Kindergarten Cleaning', href: '/services/kindergarten-cleaning', description: 'Childcare facility cleaning', category: 'Educational' },
    { title: 'Carpet Cleaning', href: '/services/carpet-cleaning', description: 'Professional carpet cleaning services', category: 'Residential' },
    { title: 'Upholstery Cleaning', href: '/services/upholstery-cleaning', description: 'Furniture and upholstery cleaning', category: 'Residential' },
    { title: 'Sidewalk Cleaning', href: '/services/sidewalk-cleaning', description: 'Pavement and sidewalk cleaning', category: 'Outdoor' },
    { title: 'Crime Scene Cleaning', href: '/services/crime-scene-cleaning', description: 'Specialized biohazard cleanup', category: 'Specialized' },
  ];

  // Add popular flag to services
  const allServices = allServicesFromRoutes.map(service => ({
    ...service,
    isPopular: popularServices.some(pop => pop.href === service.href),
    icon: popularServices.find(pop => pop.href === service.href)?.icon || Star
  }));

  // Filter services based on search and category
  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // For mobile, show limited services initially
  const displayedServices = isMobile && !showAllServices 
    ? filteredServices.slice(0, 8) 
    : filteredServices;

  const categories = ['all', ...Array.from(new Set(allServices.map(service => service.category)))];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Mobile-Optimized Hero Section */}
      <section className={`bg-gradient-to-br from-primary/10 via-primary/5 to-transparent ${isMobile ? 'py-8' : 'py-16 md:py-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className={`font-bold text-gray-900 dark:text-white mb-4 ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl mb-6'}`}>
              Our <span className="text-primary">Cleaning Services</span>
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto ${isMobile ? 'text-base mb-4' : 'text-xl mb-8'}`}>
              From residential cleaning to specialized commercial services, we provide comprehensive 
              cleaning solutions tailored to your specific needs.
            </p>
            
            {/* Mobile-Optimized Search and Filter */}
            <div className={`max-w-2xl mx-auto mb-6 ${isMobile ? 'space-y-3' : 'flex flex-col sm:flex-row gap-4 mb-8'}`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${isMobile ? 'h-12' : ''}`}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 ${isMobile ? 'h-12 w-full' : ''}`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Business Solutions CTA */}
            {isMobile && (
              <Link to="/business-solutions">
                <Button className="w-full mb-6 h-12 bg-primary hover:bg-primary/90">
                  <Star className="h-4 w-4 mr-2" />
                  Business Solutions
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className={`flex justify-between items-center mb-6 ${isMobile ? 'flex-col gap-3' : 'mb-8'}`}>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {displayedServices.length} of {allServices.length} services
            </p>
            {!isMobile && (
              <Link to="/business-solutions">
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  Business Solutions
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile-Optimized Services Grid */}
          <motion.div 
            className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {displayedServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={!isMobile ? { y: -4 } : {}}
                  className="group"
                >
                  <Card className={`h-full hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 group-hover:border-primary/30 ${isMobile ? 'shadow-sm' : ''}`}>
                    <CardHeader className={isMobile ? "pb-2 p-4" : "pb-3"}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-primary/10 rounded-lg ${isMobile ? 'p-1.5' : ''}`}>
                            <ServiceIcon className={`text-primary ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                          </div>
                          <div>
                            <CardTitle className={`font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors ${isMobile ? 'text-base' : 'text-lg'}`}>
                              {service.title}
                            </CardTitle>
                            <p className={`text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {service.category}
                            </p>
                          </div>
                        </div>
                        {service.isPopular && (
                          <Badge variant="secondary" className={`bg-primary/10 text-primary ${isMobile ? 'text-xs px-2 py-0.5' : ''}`}>
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className={isMobile ? "pt-0 p-4" : "pt-0"}>
                      <CardDescription className={`text-gray-600 dark:text-gray-400 mb-4 leading-relaxed ${isMobile ? 'text-sm mb-3 line-clamp-2' : ''}`}>
                        {service.description}
                      </CardDescription>
                      <Link to={service.href}>
                        <Button 
                          variant="outline" 
                          className={`w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 ${isMobile ? 'h-10 text-sm' : ''}`}
                        >
                          Learn More & Book
                          <ArrowRight className={`ml-2 group-hover:translate-x-1 transition-transform ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Show More Button */}
          {isMobile && filteredServices.length > 8 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllServices(!showAllServices)}
                className="w-full h-12"
              >
                {showAllServices ? (
                  <>
                    Show Less
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    See {filteredServices.length - 8} More Services
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {filteredServices.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No services found matching your criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile-Optimized CTA Section */}
      <section className={`bg-primary text-white ${isMobile ? 'py-12' : 'py-16 md:py-24'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
              Don't See What You Need?
            </h2>
            <p className={`mb-6 text-primary-100 ${isMobile ? 'text-base' : 'text-xl mb-8'}`}>
              We offer custom cleaning solutions tailored to your specific requirements.
            </p>
            <div className={`justify-center ${isMobile ? 'space-y-3' : 'flex flex-col sm:flex-row gap-4'}`}>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className={`bg-white text-primary hover:bg-gray-100 ${isMobile ? 'w-full h-12' : ''}`}
                >
                  Get Custom Quote
                </Button>
              </Link>
              <Link to="/business-solutions">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-white text-white hover:bg-white hover:text-primary ${isMobile ? 'w-full h-12' : ''}`}
                >
                  Business Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
