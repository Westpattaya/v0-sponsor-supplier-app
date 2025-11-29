"use client"

import Header from "@/components/layout/header"
import ReferralSourceForm from "@/components/onboarding/referral-source-form"

export default function ApplySponsorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Logo/Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2.5 mb-6">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg md:text-xl">SM</span>
              </div>
              <span className="font-semibold text-2xl md:text-3xl text-foreground">SponMatch</span>
            </div>
          </div>

          {/* Referral Source Form */}
          <ReferralSourceForm />
        </div>
      </main>
    </div>
  )
}

