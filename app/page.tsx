"use client"

import Header from "@/components/layout/header"
import HeroSection from "@/components/marketplace/hero-section"
import CategoryGrid from "@/components/marketplace/category-grid"
import EventCardGrid from "@/components/marketplace/event-card-grid"
import { mockEvents } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  // Get featured events for homepage
  const featuredEvents = mockEvents.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Events Section */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Events Seeking Sponsors</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">Student events looking for sponsorship opportunities</p>
              </div>
              <Link
                href="/find-sponsors"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredEvents.map((event) => (
                <EventCardGrid key={event.id} event={event} />
              ))}
            </div>

            {/* Mobile View All Link */}
            <div className="mt-6 md:hidden text-center">
              <Link
                href="/find-sponsors"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
