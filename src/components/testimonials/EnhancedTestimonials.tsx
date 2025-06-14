import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionTemplate } from "../home/SectionTemplate";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mueller",
    location: "Berlin",
    rating: 5,
    text: "Absolutely fantastic service! The cleaner was professional, thorough, and my apartment has never looked better. Will definitely book again.",
    service: "Home Cleaning",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e9?w=64&h=64&fit=crop&crop=face",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael Weber",
    location: "Munich",
    rating: 5,
    text: "Quick booking process and excellent results. The deep cleaning before my move was exactly what I needed. Highly recommended!",
    service: "Deep Cleaning",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Anna Schmidt",
    location: "Hamburg",
    rating: 5,
    text: "Professional office cleaning service that doesn't disrupt our work. The team is reliable and always delivers quality results.",
    service: "Office Cleaning",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    date: "3 weeks ago"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export const EnhancedTestimonials = memo(() => {
  return (
    <SectionTemplate
      icon={<Star className="h-8 w-8 text-primary" />}
      title="Customer Testimonials"
      description="Trusted by thousands for quality cleaning results and reliable service."
      background="bg-gradient-to-br from-white via-primary/5 to-theme-lightblue"
      id="testimonials"
      grid
    >
      {/* Testimonials cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 p-6 relative"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.location}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <StarRating rating={testimonial.rating} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {testimonial.date}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {testimonial.text}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {testimonial.service}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium">{testimonial.rating}.0</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 inline-block">
          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">99%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionTemplate>
  );
});

EnhancedTestimonials.displayName = "EnhancedTestimonials";

export default EnhancedTestimonials;
