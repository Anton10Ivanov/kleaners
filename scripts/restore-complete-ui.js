#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring Complete Original UI...\n');

// Function to copy file and ensure directory exists
function copyFile(src, dest) {
  try {
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy file
    const content = fs.readFileSync(src, 'utf8');
    
    // Convert from React Router to Next.js and remove Lovable references
    let convertedContent = content
      // Remove react-router-dom imports
      .replace(/import.*from.*react-router-dom.*/g, '')
      .replace(/import.*useLocation.*/g, '')
      .replace(/import.*useNavigate.*/g, '')
      .replace(/import.*Link.*from.*react-router-dom.*/g, "import Link from 'next/link'")
      
      // Replace router hooks
      .replace(/useLocation\(\)/g, '/* useRouter() */')
      .replace(/useNavigate\(\)/g, '/* useRouter() */')
      .replace(/navigate\(/g, '/* router.push( */')
      .replace(/location\.pathname/g, '/* router.pathname */')
      
      // Add 'use client' if it uses hooks or interactive features
      .replace(/^/, function(match, offset, string) {
        if (string.includes('useState') || string.includes('useEffect') || string.includes('onClick') || string.includes('onChange') || string.includes('motion.')) {
          return "'use client'\n\n";
        }
        return match;
      })
      
      // Remove Lovable-specific imports and references
      .replace(/import.*from.*@lovable.*/g, '')
      .replace(/lovable-[^"'\s]*/g, '')
      .replace(/data-lovable[^=]*="[^"]*"/g, '')
      .replace(/<Lovable[^>]*>/g, '<div>')
      .replace(/<\/Lovable[^>]*>/g, '</div>');

    fs.writeFileSync(dest, convertedContent);
    return true;
  } catch (error) {
    console.log(`  ❌ Error copying ${src}: ${error.message}`);
    return false;
  }
}

// Function to copy directory recursively
function copyDirectory(src, dest, extensions = ['.tsx', '.ts']) {
  if (!fs.existsSync(src)) {
    return 0;
  }

  let copiedCount = 0;
  const items = fs.readdirSync(src, { withFileTypes: true });

  items.forEach(item => {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      copiedCount += copyDirectory(srcPath, destPath, extensions);
    } else if (item.isFile() && extensions.some(ext => item.name.endsWith(ext))) {
      if (copyFile(srcPath, destPath)) {
        copiedCount++;
      }
    }
  });

  return copiedCount;
}

// 1. Copy all essential components
function copyEssentialComponents() {
  console.log('📁 Copying essential components...');
  
  const componentDirs = [
    'hero',
    'trust', 
    'services',
    'home',
    'testimonials',
    'ui',
    'layout',
    'booking',
    'forms'
  ];

  let totalCopied = 0;
  
  componentDirs.forEach(dir => {
    const srcDir = `src-backup/components/${dir}`;
    const destDir = `components/${dir}`;
    
    const copied = copyDirectory(srcDir, destDir);
    totalCopied += copied;
    
    if (copied > 0) {
      console.log(`  ✅ Copied ${copied} files from ${dir}/`);
    }
  });

  return totalCopied;
}

// 2. Copy hooks
function copyHooks() {
  console.log('\n🎣 Copying hooks...');
  
  const copied = copyDirectory('src-backup/hooks', 'hooks');
  if (copied > 0) {
    console.log(`  ✅ Copied ${copied} hook files`);
  }
  
  return copied;
}

// 3. Copy utils
function copyUtils() {
  console.log('\n🔧 Copying utilities...');
  
  const copied = copyDirectory('src-backup/utils', 'utils');
  if (copied > 0) {
    console.log(`  ✅ Copied ${copied} utility files`);
  }
  
  return copied;
}

// 4. Create the proper HomePage
function createHomePage() {
  console.log('\n🏠 Creating proper HomePage...');
  
  try {
    const homePageContent = `'use client'

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Hero } from '@/components/hero';
import ConsolidatedTrustSection from '@/components/trust/ConsolidatedTrustSection';
import { EnhancedProcessSteps } from '@/components/hero/EnhancedProcessSteps';
import { EnhancedServiceCategoriesSection } from '@/components/services/EnhancedServiceCategoriesSection';
import { EnhancedBusinessSolutionsSection } from '@/components/home/EnhancedBusinessSolutionsSection';

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <p>Something went wrong loading this section.</p>
    <p className="text-sm">{error?.message}</p>
  </div>
);

// Loading component
const SectionLoading = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Hero />
      </ErrorBoundary>
      
      {/* Alternating white/off-white section backgrounds */}
      <div className="bg-gray-50">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <ConsolidatedTrustSection />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <div className="bg-white">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <EnhancedProcessSteps />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <div className="bg-gray-50">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <EnhancedServiceCategoriesSection />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <div className="bg-white">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <EnhancedBusinessSolutionsSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}`;

    fs.writeFileSync('app/page.tsx', homePageContent);
    console.log('  ✅ HomePage created');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error creating HomePage: ${error.message}`);
    return false;
  }
}

// 5. Fix Services page
function fixServicesPage() {
  console.log('\n🛠️ Fixing Services page...');
  
  try {
    const servicesContent = `'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Star, ChevronDown, ChevronUp, Home, Building2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    id: 'home-cleaning',
    title: 'Home Cleaning',
    description: 'Regular house cleaning service for your home',
    icon: Home,
    category: 'Residential',
    price: 'From €25/hour',
    rating: 4.9,
    reviews: 1234,
    features: ['Weekly/Bi-weekly', 'Eco-friendly products', 'Insured cleaners']
  },
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning services',
    icon: Building2,
    category: 'Commercial',
    price: 'From €35/hour',
    rating: 4.8,
    reviews: 856,
    features: ['Flexible scheduling', 'After-hours available', 'Specialized equipment']
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'Thorough cleaning for special occasions',
    icon: Sparkles,
    category: 'Specialized',
    price: 'From €45/hour',
    rating: 4.9,
    reviews: 642,
    features: ['One-time service', 'Detailed cleaning', 'Move-in/out ready']
  }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Residential', 'Commercial', 'Specialized'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional cleaning services tailored to your needs. From regular home cleaning to specialized commercial services.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-gray-500">({service.reviews})</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={\`/booking/\${service.id}\`}>
                      <Button className="w-full">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}`;

    fs.writeFileSync('app/services/page.tsx', servicesContent);
    console.log('  ✅ Services page fixed');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error fixing Services page: ${error.message}`);
    return false;
  }
}

// Run restoration
async function main() {
  console.log('🚀 Starting Complete UI Restoration...\n');
  
  let totalComponents = 0;
  let totalHooks = 0;
  let totalUtils = 0;

  // Copy all components
  totalComponents = copyEssentialComponents();
  
  // Copy hooks and utils
  totalHooks = copyHooks();
  totalUtils = copyUtils();
  
  // Create HomePage
  const homePageCreated = createHomePage();
  
  // Fix Services page
  const servicesFixed = fixServicesPage();

  console.log(`\n📈 Restoration Summary:`);
  console.log(`   📁 Components copied: ${totalComponents}`);
  console.log(`   🎣 Hooks copied: ${totalHooks}`);
  console.log(`   🔧 Utils copied: ${totalUtils}`);
  console.log(`   🏠 HomePage: ${homePageCreated ? '✅' : '❌'}`);
  console.log(`   🛠️ Services: ${servicesFixed ? '✅' : '❌'}`);
  
  console.log('\n🎉 Complete UI Restoration Finished!');
  console.log('   Your Next.js app now has the full original UI!');
}

main().catch(error => {
  console.log(`Restoration failed: ${error.message}`, 'error');
  process.exit(1);
});
