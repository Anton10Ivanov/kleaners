
import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    text: "Exceptional service! My home has never looked better. The team was professional and thorough.",
    rating: 5,
    location: "Munich",
    service: "Deep Cleaning"
  },
  {
    id: 2,
    name: "Michael K.",
    text: "Reliable and efficient. Great value for money and flexible scheduling that fits my busy life.",
    rating: 5,
    location: "Berlin",
    service: "Regular Cleaning"
  },
  {
    id: 3,
    name: "Anna L.",
    text: "Amazing attention to detail. They clean areas I didn't even think about. Highly recommend!",
    rating: 5,
    location: "Hamburg",
    service: "Move In/Out"
  },
  {
    id: 4,
    name: "David R.",
    text: "Perfect for busy professionals. Punctual, professional, and affordable. Couldn't be happier!",
    rating: 5,
    location: "Frankfurt",
    service: "Business Cleaning"
  }
];

export const HeroTestimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 2000); // Changed from 4000 to 2000 (2 seconds)
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full max-w-6xl mx-auto mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <div className="h-32 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Card className="h-full bg-card/95 border border-border/50 shadow-lg">
                <CardContent className="card-spacing-sm h-full flex flex-col justify-between">
                  <div>
                    <div className="flex mb-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-muted-gold fill-muted-gold" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                      "{testimonials[currentIndex].text}"
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>
                      <p className="font-semibold">{testimonials[currentIndex].name}</p>
                      <p>{testimonials[currentIndex].location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">{testimonials[currentIndex].service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-card shadow-md hover:shadow-lg transition-shadow border border-border hover:border-primary/30"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
          
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-card shadow-md hover:shadow-lg transition-shadow border border-border hover:border-primary/30"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

HeroTestimonials.displayName = "HeroTestimonials";
