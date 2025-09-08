import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services = [
  'WindowCleaning', 'StairwellCleaning', 'IndustrialCleaning', 'IntensiveCleaning',
  'DisinfectionCleaning', 'ConstructionCleaning', 'CareFacilityCleaning',
  'TradeFairCleaning', 'HoarderCleaning', 'PoolCleaning',
  'UndergroundGarageCleaning', 'HolidayApartmentCleaning',
  'GlassCleaningWinterGarden', 'Gardening', 'MedicalPracticeCleaning', 'StoneSurfaceCleaning',
  'GraffitiRemoval', 'HouseholdClearance', 'MoldRemoval',
  'FacadeCleaning', 'KindergartenCleaning', 'CarpetCleaning', 'UpholsteryCleaning',
  'SidewalkCleaning', 'CrimeSceneCleaning'
];

const template = (serviceName, serviceType) => `import React from 'react';

const ${serviceName} = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            ${serviceName.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional ${serviceName.replace(/([A-Z])/g, ' $1').toLowerCase()} services for residential and commercial properties
          </p>
          <div className="mt-8">
            <a 
              href="/booking/${serviceType}" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book ${serviceName.replace(/([A-Z])/g, ' $1').trim()} Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${serviceName};
`;

services.forEach(service => {
  const serviceType = service.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const content = template(service, serviceType);
  const filePath = path.join(__dirname, '..', 'src', 'pages', 'services', `${service}.tsx`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Generated ${service}.tsx`);
});

console.log('All service pages generated successfully!');
