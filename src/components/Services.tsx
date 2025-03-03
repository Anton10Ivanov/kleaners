
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

export const Services = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const services = [
    {
      title: "Regular Cleaning",
      description: "Our standard cleaning service covers all the essentials to keep your home fresh and tidy.",
      features: ["Dusting all surfaces", "Vacuuming and mopping floors", "Kitchen and bathroom cleaning", "Bed making"],
      path: "/services/regular-cleaning"
    },
    {
      title: "Deep Cleaning",
      description: "A comprehensive clean that reaches every corner and tackles the tough spots regular cleaning misses.",
      features: ["Detailed kitchen appliance cleaning", "Behind furniture cleaning", "Window sill and track cleaning", "Cabinet interior cleaning"],
      path: "/services/deep-cleaning"
    },
    {
      title: "Move In/Out Cleaning",
      description: "Start fresh in your new home or leave your old one spotless with our specialized cleaning service.",
      features: ["Interior window cleaning", "Inside cabinet cleaning", "Appliance interior cleaning", "Wall mark cleaning"],
      path: "/services/move-in-out"
    },
    {
      title: "Business Cleaning",
      description: "Customized cleaning solutions for offices, retail spaces, and other commercial properties.",
      features: ["Reception and common area cleaning", "Restroom sanitization", "Break room cleaning", "Trash removal and recycling"],
      path: "/services/business-cleaning"
    }
  ];

  return (
    <section id="services" className={`py-12 ${isMobile ? 'px-4' : 'px-6'}`}>
      <div className="container mx-auto">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-4`}>Our Services</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          We offer a variety of cleaning services to meet your needs, ensuring your space is always spotless.
        </p>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
          {services.map((service, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={service.path} className="w-full">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
