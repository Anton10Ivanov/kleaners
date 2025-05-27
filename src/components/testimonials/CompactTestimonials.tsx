
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
  { name: "Google Partner", logo: "🔍" },
  { name: "Trustpilot", logo: "⭐" },
  { name: "Better Business", logo: "🏢" },
  { name: "Local Chamber", logo: "🤝" },
  { name: "Insurance Partner", logo: "🛡️" },
  { name: "Green Certified", logo: "🌱" }
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
      }, 2000);
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
      className="py-8 bg-[#F2FCE2] dark:bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span>Average Rating</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div>
              <span className="font-semibold">2,500+</span>
              <span> Happy Customers</span>
            </div>
          </div>
        </motion.div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-8'} max-w-6xl mx-auto`}>
          {/* Testimonials Carousel */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 text-center">Customer Reviews</h3>
            <div className="relative h-48">
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
                    <CardContent className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex mb-2">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
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
            
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={prevTestimonial}
                className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Partners Carousel */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 text-center">Trusted Partners</h3>
            <div className="relative h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Card className="w-48 h-32">
                    <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                      <div className="text-4xl mb-2">{partners[currentPartner].logo}</div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">
                        {partners[currentPartner].name}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-1 mt-4">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
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
