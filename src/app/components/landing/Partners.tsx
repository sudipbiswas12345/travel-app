'use client'

import { Container } from '@mui/material'
import { cn } from '@/app/lib/cn'

export default function Partners() {
  const partners = [
    { name: 'Airbnb', logo: '/images/partner1.png' },
    { name: 'Booking', logo: '/images/partner2.png' },
    { name: 'Expedia', logo: '/images/partner3.png' },
    { name: 'TripAdvisor', logo: '/images/partner4.png' },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <Container maxWidth="lg">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Our Trusted Partners
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            We collaborate with top travel brands worldwide.
          </p>
        </div>

        {/* ✅ Logos – NO card, BIG size */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={cn(
                  'w-auto',
                  'h-20 sm:h-24 md:h-28 lg:h-32', // ✅ increased size
                  'object-contain',
                  'transition-transform duration-300',
                  'hover:scale-105'
                )}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
