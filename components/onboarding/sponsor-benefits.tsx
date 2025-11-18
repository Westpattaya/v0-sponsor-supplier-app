"use client"

import { Search, Briefcase, FileCheck, Users } from "lucide-react"

interface Benefit {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Search,
    title: "Discover Student Events Easily",
    description: "Browse and filter through university events that match your brand values and target audience",
  },
  {
    icon: Briefcase,
    title: "Manage Sponsorships in One Place",
    description: "Centralized dashboard to track all your sponsorships, contracts, and deliverables",
  },
  {
    icon: FileCheck,
    title: "Track Deliverables and Proofs",
    description: "Monitor event progress, review deliverables, and approve proofs before final payment",
  },
  {
    icon: Users,
    title: "Access Universities and Student Clubs",
    description: "Connect directly with student organizers and university clubs across multiple campuses",
  },
]

export default function SponsorBenefits() {
  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
            Why Sponsor on EventSponsor?
          </h2>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-start p-5 md:p-6 rounded-xl bg-card border border-border/60 hover:shadow-sm transition-shadow"
                >
                  <div className="p-3 rounded-lg bg-muted/50 mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

