import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking-form'

export const metadata: Metadata = {
  title: 'Book Cleaning Service | Kleaners',
  description: 'Book your professional cleaning service with Kleaners. Choose from home cleaning, office cleaning, deep cleaning, and more.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </div>
    </div>
  )
}
