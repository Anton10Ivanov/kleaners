
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Mail, FileText } from 'lucide-react';
import { BookingFormData } from '@/schemas/booking';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  bookingData: BookingFormData;
  referenceNumber: string;
  onNewBooking?: () => void;
}

export const BookingConfirmation = ({ 
  bookingData, 
  referenceNumber, 
  onNewBooking 
}: BookingConfirmationProps) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    postalCode,
    date,
    preferredTime,
    hours,
    frequency,
    serviceType,
    specialInstructions
  } = bookingData;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">
                Booking Confirmed!
              </h1>
              <p className="text-green-700 dark:text-green-300">
                Your cleaning service has been successfully booked
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border">
              <FileText className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-mono text-lg font-semibold">#{referenceNumber}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Reference Number (save this for your records)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Booking Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Service Date</p>
                <p className="text-sm text-gray-600">
                  {date ? format(date, 'EEEE, MMMM d, yyyy') : 'To be scheduled'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Time & Duration</p>
                <p className="text-sm text-gray-600">
                  {preferredTime || 'Flexible'} • {hours} hours
                </p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Service Address</p>
              <p className="text-sm text-gray-600">
                {address}
                <br />
                {postalCode} {city}
              </p>
            </div>
          </div>

          {/* Service Type & Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Service Type</p>
              <p className="text-sm text-gray-600 capitalize">{serviceType}</p>
            </div>
            <div>
              <p className="font-medium">Frequency</p>
              <p className="text-sm text-gray-600 capitalize">{frequency}</p>
            </div>
          </div>

          {/* Special Instructions */}
          {specialInstructions && (
            <div>
              <p className="font-medium">Special Instructions</p>
              <p className="text-sm text-gray-600">{specialInstructions}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Contact Information</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500" />
            <span>{firstName} {lastName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span>{email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span>{phone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
            What's Next?
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>• You'll receive a confirmation email shortly</li>
            <li>• Our team will contact you within 24 hours to confirm details</li>
            <li>• You can reschedule or cancel up to 24 hours before your appointment</li>
            <li>• Keep your reference number for any future communication</li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onNewBooking} variant="outline">
          Book Another Service
        </Button>
        <Button onClick={() => window.print()}>
          Print Confirmation
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
