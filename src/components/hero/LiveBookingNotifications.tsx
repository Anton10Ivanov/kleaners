
import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const bookingNotifications = [
  { name: "Sarah", location: "Munich", service: "Deep Cleaning", time: "2 minutes ago" },
  { name: "Michael", location: "Berlin", service: "Regular Cleaning", time: "5 minutes ago" },
  { name: "Anna", location: "Hamburg", service: "Move In/Out", time: "8 minutes ago" },
  { name: "David", location: "Frankfurt", service: "Business Cleaning", time: "12 minutes ago" },
  { name: "Lisa", location: "Cologne", service: "Regular Cleaning", time: "15 minutes ago" },
];

export const LiveBookingNotifications = memo(() => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % bookingNotifications.length);
        setIsVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-semibold">{bookingNotifications[currentNotification].name}</span> from{" "}
                  <span className="text-primary">{bookingNotifications[currentNotification].location}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Booked {bookingNotifications[currentNotification].service} • {bookingNotifications[currentNotification].time}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LiveBookingNotifications.displayName = "LiveBookingNotifications";
