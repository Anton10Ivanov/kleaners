'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

interface ContactInfoProps {
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
}

function ContactInfo({ icon, children, href }: ContactInfoProps) {
  const content = (
    <div className="flex items-center space-x-2">
      {icon}
      <span>{children}</span>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="hover:text-gray-200 transition-colors">
        {content}
      </a>
    )
  }

  return content
}

export function CTA() {
  return (
    <section className="hero-gradient text-white" role="region" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Kleaners for their cleaning needs. 
            Book your first cleaning today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/booking" aria-label="Book your cleaning service">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Cleaning
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact" aria-label="Contact us for more information">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-lg">
            <ContactInfo
              icon={<Phone className="h-5 w-5" aria-hidden="true" />}
              href="tel:1-800-KLEANERS"
            >
              1-800-KLEANERS
            </ContactInfo>
            <ContactInfo
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              href="mailto:hello@kleaners.de"
            >
              hello@kleaners.de
            </ContactInfo>
          </div>
        </div>
      </div>
    </section>
  )
}