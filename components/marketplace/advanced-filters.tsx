"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  eventType: string[]
  university: string[]
  audienceSize: string[]
  sponsorshipType: string[]
  budgetMin: string
  budgetMax: string
  deliverables: string[]
  eventMonth: string
}

const eventTypes = ["Music", "Tech", "Sports", "Corporate", "Art", "Conference", "Festival", "Competition", "Charity"]
const universities = ["University of Texas at Austin", "Stanford University", "NYU Stern School of Business", "Boston University", "UCLA School of the Arts"]
const audienceSizes = ["0-500", "500-1,000", "1,000-3,000", "3,000-5,000", "5,000+"]
const sponsorshipTypes = ["money", "product", "booth", "giveaway"]

export default function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    eventType: [],
    university: [],
    audienceSize: [],
    sponsorshipType: [],
    budgetMin: "",
    budgetMax: "",
    deliverables: [],
    eventMonth: "",
  })

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      eventType: [],
      university: [],
      audienceSize: [],
      sponsorshipType: [],
      budgetMin: "",
      budgetMax: "",
      deliverables: [],
      eventMonth: "",
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters =
    Object.values(filters).some((val) => (Array.isArray(val) ? val.length > 0 : val !== "")) ||
    filters.budgetMin !== "" ||
    filters.budgetMax !== "" ||
    filters.eventMonth !== ""

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted transition-colors"
      >
        <Filter size={18} />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
            {Object.values(filters).reduce(
              (sum, val) => sum + (Array.isArray(val) ? val.length : val ? 1 : 0),
              0
            )}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-xl shadow-lg z-50 p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Filter Events</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Event Type</label>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.eventType.includes(type)}
                      onChange={() => toggleFilter("eventType", type)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">University</label>
              <div className="space-y-2">
                {universities.map((uni) => (
                  <label
                    key={uni}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.university.includes(uni)}
                      onChange={() => toggleFilter("university", uni)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{uni}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Audience Size */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Audience Size</label>
              <div className="space-y-2">
                {audienceSizes.map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.audienceSize.includes(size)}
                      onChange={() => toggleFilter("audienceSize", size)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{size} attendees</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sponsorship Type */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Sponsorship Type</label>
              <div className="space-y-2">
                {sponsorshipTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.sponsorshipType.includes(type)}
                      onChange={() => toggleFilter("sponsorshipType", type)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Budget Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Min</label>
                  <input
                    type="text"
                    value={filters.budgetMin}
                    onChange={(e) => {
                      const newFilters = { ...filters, budgetMin: e.target.value }
                      setFilters(newFilters)
                      onFilterChange(newFilters)
                    }}
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Max</label>
                  <input
                    type="text"
                    value={filters.budgetMax}
                    onChange={(e) => {
                      const newFilters = { ...filters, budgetMax: e.target.value }
                      setFilters(newFilters)
                      onFilterChange(newFilters)
                    }}
                    placeholder="$100K"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Deliverables Offered</label>
              <div className="space-y-2">
                {["Logo placement", "Social media posts", "Booth space", "Product sampling", "VIP passes", "On-stage mention"].map((deliverable) => (
                  <label
                    key={deliverable}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.deliverables.includes(deliverable)}
                      onChange={() => {
                        const newDeliverables = filters.deliverables.includes(deliverable)
                          ? filters.deliverables.filter((d) => d !== deliverable)
                          : [...filters.deliverables, deliverable]
                        const newFilters = { ...filters, deliverables: newDeliverables }
                        setFilters(newFilters)
                        onFilterChange(newFilters)
                      }}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{deliverable}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Event Month */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Event Month</label>
              <select
                value={filters.eventMonth}
                onChange={(e) => {
                  const newFilters = { ...filters, eventMonth: e.target.value }
                  setFilters(newFilters)
                  onFilterChange(newFilters)
                }}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="">All months</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

