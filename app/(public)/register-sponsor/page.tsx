"use client"

import Header from "@/components/layout/header"
import SponsorHero from "@/components/onboarding/sponsor-hero"
import SponsorBenefits from "@/components/onboarding/sponsor-benefits"
import HowItWorks from "@/components/onboarding/how-it-works"

export default function RegisterSponsorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <SponsorHero />

        {/* Benefits Section */}
        <SponsorBenefits />

        {/* How It Works Section */}
        <HowItWorks />
      </main>
    </div>
  )
}

