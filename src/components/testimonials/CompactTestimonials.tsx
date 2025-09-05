
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Exceptional service! My home has never looked better. The team is professional and thorough.",
    rating: 5,
    source: "Google",
    location: "Munich"
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "Reliable and efficient cleaning service. Great value for money and flexible scheduling.",
    rating: 5,
    source: "Trustpilot",
    location: "Berlin"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    text: "Amazing attention to detail. They clean areas I didn't even think about. Highly recommend!",
    rating: 5,
    source: "Google",
    location: "Hamburg"
  },
  {
    id: 4,
    name: "David Miller",
    text: "Professional, punctual, and affordable. Perfect for busy professionals like myself.",
    rating: 5,
    source: "Trustpilot",
    location: "Frankfurt"
  }
];

const partners = [
  { name: "Google Partner", logo: "🔍", description: "Verified Business" },
  { name: "Trustpilot", logo: "⭐", description: "4.9/5 Rating" },
  { name: "Better Business", logo: "🏢", description: "A+ Accredited" },
  { name: "Local Chamber", logo: "🤝", description: "Member Since 2020" },
  { name: "Insurance Partner", logo: "🛡️", description: "Fully Covered" },
  { name: "Green Certified", logo: "🌱", description: "Eco-Friendly" }
];

export const CompactTestimonials = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentPartner((prev) => (prev + 1) % partners.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      className="py-6 bg-[#F2FCE2] dark:bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-muted-gold fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span>Average Rating</span>
            </div>
            <div className="h-3 w-px bg-gray-300"></div>
            <div>
              <span className="font-semibold">2,500+</span>
              <span> Happy Customers</span>
            </div>
          </div>
        </motion.div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-6'} max-w-5xl mx-auto`}>
          {/* Testimonials Carousel */}
          <div className="relative">
            <h3 className="text-base md:text-lg font-semibold mb-3 text-center">Customer Reviews</h3>
            <div className="relative h-36 md:h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Card className="h-full">
                    <CardContent className="p-3 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex mb-2">
                           {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-muted-gold fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-2 line-clamp-3">
                          "{testimonials[currentTestimonial].text}"
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>
                          <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                          <p>{testimonials[currentTestimonial].location}</p>
                        </div>
                        <div className="text-right">
                          <p>Via {testimonials[currentTestimonial].source}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={prevTestimonial}
                className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <div className="flex gap-1 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Partners Carousel */}
          <div className="relative">
            <h3 className="text-base md:text-lg font-semibold mb-3 text-center">Trusted Partners</h3>
            <div className="relative h-36 md:h-40 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Card className="w-40 md:w-44 h-28 md:h-32">
                    <CardContent className="p-3 h-full flex flex-col items-center justify-center text-center">
                      <div className="text-2xl md:text-3xl mb-1">{partners[currentPartner].logo}</div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-1">
                        {partners[currentPartner].name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {partners[currentPartner].description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-1 mt-3">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentPartner ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactTestimonials;
