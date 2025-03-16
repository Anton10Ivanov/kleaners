
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';

export const Testimonials = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "I've tried several cleaning services before, but this one truly stands out. Their attention to detail is remarkable, and my home has never looked better!",
      rating: 5,
      position: "Homeowner"
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "Excellent service from start to finish. The booking process was easy, and the cleaning team was professional, thorough, and efficient.",
      rating: 5,
      position: "Business Owner"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      text: "I'm amazed at how they transformed my place. They got to areas I didn't even think about cleaning. Will definitely use them again!",
      rating: 5,
      position: "Apartment Resident"
    }
  ];

  return (
    <section className={`py-10 ${isMobile ? 'px-4' : 'px-8'} bg-[#F2FCE2] dark:bg-gray-900`}>
      <div className="container mx-auto">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-4`}>
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
