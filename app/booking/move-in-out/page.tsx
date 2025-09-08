import type { Metadata } from 'next'
import { MoveInOutForm } from '@/components/booking/move-in-out-form'

export const metadata: Metadata = {
  title: 'Move In/Out Cleaning | Kleaners',
  description: 'Professional move in and move out cleaning services. Make your transition smooth with our thorough cleaning.',
}

export default function MoveInOutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoveInOutForm />
      </div>
    </div>
  )
}
