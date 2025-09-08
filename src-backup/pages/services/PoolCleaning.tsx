import React from 'react';

const PoolCleaning = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Pool Cleaning
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional  pool cleaning services for residential and commercial properties
          </p>
          <div className="mt-8">
            <a 
              href="/booking/pool-cleaning" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Pool Cleaning Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolCleaning;
