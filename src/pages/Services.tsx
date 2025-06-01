
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { serviceCategories, popularServices } from '@/components/navbar/navigationData';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Flatten all services from categories
  const allServices = serviceCategories.flatMap(category => 
    category.services.map(service => ({
      ...service,
      category: category.title,
      isPopular: popularServices.some(pop => pop.href === service.href)
    }))
  );

  // Filter services based on search and category
  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...serviceCategories.map(cat => cat.title)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-primary">Cleaning Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              From residential cleaning to specialized commercial services, we provide comprehensive 
              cleaning solutions tailored to your specific needs.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredServices.length} of {allServices.length} services
            </p>
            <Link to="/business-solutions">
              <Button variant="outline" className="gap-2">
                <Star className="h-4 w-4" />
                Business Solutions
              </Button>
            </Link>
          </div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 group-hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <ServiceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                              {service.title}
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {service.category}
                            </p>
                          </div>
                        </div>
                        {service.isPopular && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </CardDescription>
                      <Link to={service.href}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                        >
                          Learn More & Book
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See What You Need?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              We offer custom cleaning solutions tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Get Custom Quote
                </Button>
              </Link>
              <Link to="/business-solutions">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
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
