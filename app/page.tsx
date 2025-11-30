"use client"

import { useQuery } from "@tanstack/react-query"
import Header from "@/components/layout/header"
import HeroSection from "@/components/marketplace/hero-section"
import CategoryGrid from "@/components/marketplace/category-grid"
import EventCardGrid from "@/components/marketplace/event-card-grid"
import { mockEvents } from "@/lib/mock-data"
import { transformDbEventToEvent } from "@/lib/event-utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  // Fetch events from API
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ["events", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/events?limit=6")
      if (!response.ok) throw new Error("Failed to fetch events")
      return response.json()
    },
  })

  // Transform database events and combine with mock events for now
  const dbEvents = eventsData?.events?.map(transformDbEventToEvent) || []
  const allEvents = [...dbEvents, ...mockEvents]
  const featuredEvents = allEvents.slice(0, 6)

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
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">งานที่กำลังหาสปอนเซอร์</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">งานของนักศึกษาที่กำลังมองหาสปอนเซอร์</p>
              </div>
              <Link
                href="/find-sponsors"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>ดูทั้งหมด</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Events Grid */}
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">กำลังโหลดงาน...</div>
            ) : featuredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {featuredEvents.map((event) => (
                  <EventCardGrid key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>ยังไม่มีงานในขณะนี้ เป็นคนแรกที่โพสต์งาน!</p>
              </div>
            )}

            {/* Mobile View All Link */}
            <div className="mt-6 md:hidden text-center">
              <Link
                href="/find-sponsors"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>ดูงานทั้งหมด</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
