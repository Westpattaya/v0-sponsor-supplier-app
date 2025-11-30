"use client"

interface HeroSectionProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onSearchOptionClick?: (option: string) => void
}

export default function HeroSection({ searchQuery = "", onSearchChange, onSearchOptionClick }: HeroSectionProps) {

  return (
    <section className="relative w-full bg-gradient-to-br from-muted/50 via-background to-muted/30 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5 md:space-y-6">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Find Sponsors for Your Events
          </h1>

          {/* Sub-headline */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse sponsorship offers from companies ready to support your university events
          </p>
        </div>
      </div>
    </section>
  )
}

