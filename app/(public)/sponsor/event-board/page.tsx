"use client"

import { useState, useMemo, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Header from "@/components/layout/header"
import EventCardGrid from "@/components/marketplace/event-card-grid"
import AdvancedFilters, { type FilterState } from "@/components/marketplace/advanced-filters"
import { mockEvents } from "@/lib/mock-data"
import { transformDbEventToEvent } from "@/lib/event-utils"

// Simple role check - in production, use proper auth/session
function useUserRole() {
  const [role, setRole] = useState<string>("organizer")
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "organizer"
      setRole(storedRole)
    }
  }, [])
  
  return role
}

export default function SponsorEventBoardPage() {
  const router = useRouter()
  const userRole = useUserRole()
  
  // Check if user is a sponsor - if not, redirect
  useEffect(() => {
    if (userRole !== "sponsor") {
      router.push("/")
    }
  }, [userRole, router])

  if (userRole !== "sponsor") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">This page is only available to sponsors.</p>
        </div>
      </div>
    )
  }

  const [searchQuery, setSearchQuery] = useState("")
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    eventType: [],
    university: [],
    audienceSize: [],
    sponsorshipType: [],
    budgetMin: "",
    budgetMax: "",
    deliverables: [],
    eventMonth: "",
  })

  // Fetch events from API
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ["events", "all"],
    queryFn: async () => {
      const response = await fetch("/api/events?limit=100")
      if (!response.ok) throw new Error("Failed to fetch events")
      return response.json()
    },
  })

  // Transform database events and combine with mock events
  const dbEvents = eventsData?.events?.map(transformDbEventToEvent) || []
  const allEvents = [...dbEvents, ...mockEvents]

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.university.toLowerCase().includes(searchQuery.toLowerCase())

      // Event type filter
      const matchesEventType =
        advancedFilters.eventType.length === 0 || advancedFilters.eventType.includes(event.category)

      // University filter
      const matchesUniversity =
        advancedFilters.university.length === 0 || advancedFilters.university.includes(event.university)

      // Audience size filter
      const matchesAudienceSize =
        advancedFilters.audienceSize.length === 0 ||
        advancedFilters.audienceSize.some((size) => {
          const [min, max] = size.split("-").map((s) => s.replace(/,/g, "").replace("+", ""))
          const eventSize = parseInt(event.audienceSize.replace(/,/g, "").split("-")[0])
          if (max) {
            return eventSize >= parseInt(min) && eventSize <= parseInt(max)
          } else {
            return eventSize >= parseInt(min)
          }
        })

      // Sponsorship type filter
      const matchesSponsorshipType =
        advancedFilters.sponsorshipType.length === 0 ||
        advancedFilters.sponsorshipType.some((type) => event.supportNeeded.includes(type as any))

      return (
        matchesSearch &&
        matchesEventType &&
        matchesUniversity &&
        matchesAudienceSize &&
        matchesSponsorshipType
      )
    })
  }, [allEvents, searchQuery, advancedFilters])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Header Section */}
        <div className="w-full py-8 md:py-12 bg-gradient-to-br from-muted/50 via-background to-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  Event Board
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Browse events from organizers seeking sponsorship
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search events, categories, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Advanced Filters */}
              <div className="flex items-center gap-4">
                <AdvancedFilters onFilterChange={setAdvancedFilters} />
                {filteredEvents.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredEvents.map((event) => (
                    <EventCardGrid key={event.id} event={event} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-2">No events found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

