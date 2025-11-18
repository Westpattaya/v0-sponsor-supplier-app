"use client"

import Link from "next/link"

export default function SponsorHero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-muted/50 via-background to-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Become a Sponsor
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with university events and support student initiatives that align with your brand
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/register-sponsor/form"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-base md:text-lg shadow-sm"
            >
              Register as Sponsor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

