
import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";

interface BookingNotification {
  id: number;
  city: string;
  timeAgo: string;
  service: string;
}

const mockBookings: BookingNotification[] = [
  { id: 1, city: "Berlin", timeAgo: "2 minutes ago", service: "Home Cleaning" },
  { id: 2, city: "Munich", timeAgo: "5 minutes ago", service: "Deep Cleaning" },
  { id: 3, city: "Hamburg", timeAgo: "8 minutes ago", service: "Office Cleaning" },
  { id: 4, city: "Cologne", timeAgo: "12 minutes ago", service: "Move In/Out" },
  { id: 5, city: "Frankfurt", timeAgo: "15 minutes ago", service: "Home Cleaning" },
];

// Generate random interval between 1-3 minutes (60000-180000ms)
const getRandomInterval = () => {
  return Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000;
};

export const LiveBookingIndicators = memo(() => {
  const [currentBooking, setCurrentBooking] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const scheduleNextUpdate = () => {
      const randomInterval = getRandomInterval();
      
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentBooking((prev) => (prev + 1) % mockBookings.length);
          setIsVisible(true);
          scheduleNextUpdate(); // Schedule the next update
        }, 300);
      }, randomInterval);
    };

    // Start the first update
    scheduleNextUpdate();

    // No cleanup needed as setTimeout will handle its own lifecycle
  }, []);

  const booking = mockBookings[currentBooking];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="absolute top-4 right-4 z-20"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 p-3 min-w-[280px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-green-600">JUST BOOKED</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900">{booking.city}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{booking.service}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-gray-500">{booking.timeAgo}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

LiveBookingIndicators.displayName = "LiveBookingIndicators";
