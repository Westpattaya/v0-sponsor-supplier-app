"use client"

import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Header from "@/components/layout/header"
import EventCardGrid from "@/components/marketplace/event-card-grid"
import EventFilterBar from "@/components/marketplace/event-filter-bar"
import { type FilterState } from "@/components/marketplace/advanced-filters"
import { transformDbEventToEvent } from "@/lib/event-utils"
import { mockEvents } from "@/lib/mock-data"
import { Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState<"events" | "marketplace">("marketplace")
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
  const queryClient = useQueryClient()

  // Fetch all events for marketplace
  const { data: marketplaceEventsData, isLoading: marketplaceLoading } = useQuery({
    queryKey: ["events", "marketplace"],
    queryFn: async () => {
      const response = await fetch("/api/events?limit=100")
      if (!response.ok) throw new Error("Failed to fetch events")
      return response.json()
    },
  })

  // Fetch events (in production, filter by organizer)
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("/api/events")
      if (!response.ok) throw new Error("Failed to fetch events")
      return response.json()
    },
  })

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete event")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })

  const handleDeleteEvent = (eventId: string, eventName: string) => {
    if (confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
      deleteEventMutation.mutate(eventId)
    }
  }

  // Transform database events and combine with mock events
  const dbEvents = marketplaceEventsData?.events?.map(transformDbEventToEvent) || []
  const allMarketplaceEvents = [...dbEvents, ...mockEvents]

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return allMarketplaceEvents.filter((event) => {
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
  }, [allMarketplaceEvents, searchQuery, advancedFilters])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Organizer Dashboard</h1>
              <p className="text-muted-foreground">Manage your events and sponsorship offers</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("marketplace")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "marketplace"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Marketplace ({allMarketplaceEvents.length})
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "events"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                My Events ({events?.events?.length || 0})
              </button>
            </div>

            {/* Marketplace Tab */}
            {activeTab === "marketplace" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">All Events</h2>
                  <p className="text-sm text-muted-foreground">Browse all events posted by organizers</p>
                </div>

                {/* Event Filter Bar */}
                <div className="mb-6">
                  <EventFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </div>


                {/* Events Grid */}
                {marketplaceLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading events...</div>
                ) : filteredEvents.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <p className="text-muted-foreground mb-2">No events found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {filteredEvents.map((event) => (
                        <EventCardGrid key={event.id} event={event} />
                      ))}
                    </div>
                )}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">My Events</h2>
                  <Link
                    href="/post-event"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Plus size={16} />
                    Post New Event
                  </Link>
                </div>
                {eventsLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading events...</div>
                ) : events?.events?.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <p className="text-muted-foreground mb-4">You haven't posted any events yet</p>
                    <Link
                      href="/post-event"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Plus size={16} />
                      Post Your First Event
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events?.events?.map((event: any) => (
                      <div
                        key={event.id}
                        className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow relative group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Link href={`/find-sponsors/${event.id}`} className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">{event.name}</h3>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleDeleteEvent(event.id, event.name)
                            }}
                            disabled={deleteEventMutation.isPending}
                            className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                            title="Delete event"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <Link href={`/find-sponsors/${event.id}`} className="block">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{event.university}</span>
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

