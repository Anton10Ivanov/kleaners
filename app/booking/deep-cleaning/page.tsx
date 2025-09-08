import type { Metadata } from 'next'
import { DeepCleaningForm } from '@/components/booking/deep-cleaning-form'

export const metadata: Metadata = {
  title: 'Deep Cleaning Service | Kleaners',
  description: 'Thorough deep cleaning services for your home or office. Professional deep cleaning that gets into every corner.',
}

export default function DeepCleaningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeepCleaningForm />
      </div>
    </div>
  )
}
