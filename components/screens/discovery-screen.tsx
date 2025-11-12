"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import EventCard from "@/components/event-card"
import FilterChip from "@/components/filter-chip"
import { mockEvents } from "@/lib/mock-data"

export default function DiscoveryScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = ["Trending", "Budget: 5-10K", "Tech Events", "Music", "Corporate"]

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some((f) => event.category.includes(f))
    return matchesSearch && matchesFilters
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Discover</h1>
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search opportunities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-full bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                selected={selectedFilters.includes(filter)}
                onClick={() => toggleFilter(filter)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="p-4 space-y-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No opportunities found</p>
          </div>
        )}
      </div>
    </div>
  )
}
