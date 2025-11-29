"use client"

import { FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"

const budgetRanges = [
  "$0 - $500",
  "$500 - $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
]

const eventTypes = [
  { id: "conference", label: "Conference" },
  { id: "workshop", label: "Workshop" },
  { id: "hackathon", label: "Hackathon" },
  { id: "networking", label: "Networking Event" },
  { id: "cultural", label: "Cultural Festival" },
  { id: "sports", label: "Sports Event" },
  { id: "charity", label: "Charity Event" },
  { id: "competition", label: "Competition" },
]

const sponsorshipTypes = [
  { id: "money", label: "Financial Sponsorship" },
  { id: "products", label: "Product/Service Donation" },
  { id: "booth", label: "Exhibition Booth" },
  { id: "speaker", label: "Speaker/Workshop" },
  { id: "prizes", label: "Prizes & Awards" },
  { id: "catering", label: "Catering/Food & Beverage" },
  { id: "venue", label: "Venue Support" },
  { id: "marketing", label: "Marketing & Promotion" },
]

export default function SponsorshipPreferencesPage() {
  const router = useRouter()
  const [budgetRange, setBudgetRange] = useState(budgetRanges[0])
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([])
  const [selectedSponsorshipTypes, setSelectedSponsorshipTypes] = useState<
    string[]
  >([])

  const toggleEventType = (eventTypeId: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventTypeId)
        ? prev.filter((id) => id !== eventTypeId)
        : [...prev, eventTypeId]
    )
  }

  const toggleSponsorshipType = (sponsorshipTypeId: string) => {
    setSelectedSponsorshipTypes((prev) =>
      prev.includes(sponsorshipTypeId)
        ? prev.filter((id) => id !== sponsorshipTypeId)
        : [...prev, sponsorshipTypeId]
    )
  }

  const previewEventTypes = useMemo(
    () =>
      selectedEventTypes.length > 0
        ? selectedEventTypes
            .map(
              (id) => eventTypes.find((type) => type.id === id)?.label || id
            )
            .join(", ")
        : "Select preferred event types",
    [selectedEventTypes]
  )

  const previewSponsorshipTypes = useMemo(
    () =>
      selectedSponsorshipTypes.length > 0
        ? selectedSponsorshipTypes
            .map(
              (id) =>
                sponsorshipTypes.find((type) => type.id === id)?.label || id
            )
            .join(", ")
        : "Select sponsorship types",
    [selectedSponsorshipTypes]
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Sponsorship preferences saved:", {
      budgetRange,
      eventTypes: selectedEventTypes,
      sponsorshipTypes: selectedSponsorshipTypes,
    })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
              <span>Step 3 of 3</span>
              <span>Sponsorship preferences</span>
            </div>
            <div className="h-1 rounded-full bg-muted/40">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <section className="space-y-8 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">
                  Sponsorship preferences
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  This makes matching smarter
                </h1>
                <p className="text-base text-muted-foreground mt-2">
                  Help us understand your sponsorship goals and preferences to
                  find the perfect matches.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="budget-range"
                    className="text-sm font-medium text-foreground"
                  >
                    Budget range
                  </label>
                  <select
                    id="budget-range"
                    value={budgetRange}
                    onChange={(event) => setBudgetRange(event.target.value)}
                    className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Preferred event types
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Select all that apply
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {eventTypes.map((type) => {
                      const isSelected = selectedEventTypes.includes(type.id)
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => toggleEventType(type.id)}
                          className={`flex items-center justify-center rounded-2xl border p-3 text-center text-sm font-medium transition ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          {type.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Sponsorship type
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Select all that apply
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sponsorshipTypes.map((type) => {
                      const isSelected = selectedSponsorshipTypes.includes(
                        type.id
                      )
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => toggleSponsorshipType(type.id)}
                          className={`flex items-center justify-center rounded-2xl border p-3 text-center text-sm font-medium transition ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          {type.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-base flex items-center justify-center gap-2"
                >
                  Continue → Dashboard
                  <span aria-hidden>➝</span>
                </button>
              </form>
            </section>

            <section className="space-y-6 rounded-3xl border border-border bg-gradient-to-b from-slate-50 to-white p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">
                    Preview
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    Your preferences
                  </h2>
                </div>
                <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                  Live
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Budget range
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {budgetRange}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Preferred event types
                  </p>
                  <p className="text-sm text-foreground">{previewEventTypes}</p>
                  {selectedEventTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEventTypes.map((id) => {
                        const type = eventTypes.find((t) => t.id === id)
                        return (
                          <span
                            key={id}
                            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
                          >
                            {type?.label}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Sponsorship types
                  </p>
                  <p className="text-sm text-foreground">
                    {previewSponsorshipTypes}
                  </p>
                  {selectedSponsorshipTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSponsorshipTypes.map((id) => {
                        const type = sponsorshipTypes.find((t) => t.id === id)
                        return (
                          <span
                            key={id}
                            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
                          >
                            {type?.label}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

