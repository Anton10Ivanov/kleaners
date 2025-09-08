import type { Metadata } from 'next'
import { OfficeCleaningForm } from '@/components/booking/office-cleaning-form'

export const metadata: Metadata = {
  title: 'Office Cleaning Service | Kleaners',
  description: 'Professional office cleaning services. Get a quote in minutes and keep your workspace spotless.',
}

export default function OfficeCleaningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OfficeCleaningForm />
      </div>
    </div>
  )
}
