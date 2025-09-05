
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CookiePolicy = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieAccepted');
    if (!hasAccepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieAccepted', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:max-w-[420px] md:left-8 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-4">
        <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Cookie Policy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleAccept} size="sm">
              Accept
            </Button>
            <Button 
              onClick={handleDecline} 
              variant="outline" 
              size="sm"
            >
              Decline
            </Button>
          </div>
        </div>
        <button 
          onClick={handleDecline}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default CookiePolicy;
