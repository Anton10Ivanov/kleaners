
import React from 'react';
import { whyChooseUsContent, getAdvantagesByCategories, categoryDisplayNames } from './WhyChooseUsContent';
import { AdvantageCard } from './AdvantageCard';
import { AdvantageItem } from './WhyChooseUsTypes';
import { Grid } from '../layout/Grid';

// Create a component that will use the content from WhyChooseUsContent
const WhyChooseUsComponent = () => {
  const categories = getAdvantagesByCategories();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        
        <Grid cols={3} gap="lg" responsive={true} className="w-full">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-xl font-semibold">{categoryDisplayNames[category] || category}</h3>
              <div className="space-y-4">
                {items.map((item: AdvantageItem) => (
                  <AdvantageCard 
                    key={item.title} 
                    title={item.title}
                    icon={item.icon}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default WhyChooseUsComponent;
