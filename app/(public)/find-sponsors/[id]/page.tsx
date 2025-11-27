"use client"

import { use, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import {
  MapPin,
  Calendar,
  DollarSign,
  ArrowLeft,
  Users,
  GraduationCap,
  User,
  CheckCircle2,
  Clock,
  Gift,
  Store,
  Coins,
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/header"
import SponsorshipOfferModal from "@/components/marketplace/sponsorship-offer-modal"
import { mockEvents } from "@/lib/mock-data"
import { transformDbEventToEvent } from "@/lib/event-utils"
import type { Event } from "@/lib/types"

interface PageProps {
  params: Promise<{ id: string }>
}

const supportIcons: Record<string, typeof Coins> = {
  money: Coins,
  product: Gift,
  booth: Store,
  giveaway: Gift,
}

const supportLabels: Record<string, string> = {
  money: "Cash",
  product: "Product",
  booth: "Booth",
  giveaway: "Giveaway",
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  // Try to fetch from API first
  const { data: dbEvent, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await fetch(`/api/events/${id}`)
      if (!response.ok) return null
      return response.json()
    },
  })

  // Transform database event or fallback to mock events
  const dbEventTransformed = dbEvent ? transformDbEventToEvent(dbEvent) : null
  const mockEvent = mockEvents.find((e) => e.id === id)
  const event: Event | undefined = dbEventTransformed || mockEvent

  if (!isLoading && !event) {
    notFound()
  }

  if (isLoading || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-16">
          <div className="text-center text-muted-foreground">Loading event...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Back Button */}
        <div className="container mx-auto px-4 md:px-6 pt-6">
          <Link
            href="/find-sponsors"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Event Detail */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl font-bold text-muted-foreground/20">
                    {event.title.charAt(0)}
                  </div>
                  <div className="absolute top-4 right-4 px-4 py-2 bg-background/80 backdrop-blur rounded-lg">
                    <span className="text-sm font-semibold text-primary">{event.category}</span>
                  </div>
                </div>

                {/* Event Title & Description */}
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                    {event.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={16} />
                      <span>{event.university}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={16} />
                      <span>{event.audienceSize} attendees</span>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
                </div>

                {/* Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <MapPin size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-base font-semibold text-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Calendar size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                          Date
                        </p>
                        <p className="text-base font-semibold text-foreground">{event.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <DollarSign size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                          Budget
                        </p>
                        <p className="text-base font-semibold text-foreground">{event.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Needed */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Support Needed</h2>
                  <div className="flex flex-wrap gap-3">
                    {event.supportNeeded.map((support) => {
                      const Icon = supportIcons[support] || Coins
                      return (
                        <div
                          key={support}
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg"
                        >
                          <Icon size={18} className="text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {supportLabels[support]}
                          </span>
                        </div>
                      )}
                    )}
                  </div>
                </div>

                {/* Expected Audience */}
                {event.expectedAudience && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-3">Expected Audience</h2>
                    <p className="text-muted-foreground">{event.expectedAudience}</p>
                  </div>
                )}

                {/* Sponsorship Tiers */}
                {event.sponsorshipTiers && event.sponsorshipTiers.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Sponsorship Tiers</h2>
                    <div className="space-y-4">
                      {event.sponsorshipTiers.map((tier, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border rounded-xl bg-muted/30"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                            <span className="text-lg font-bold text-primary">{tier.amount}</span>
                          </div>
                          <ul className="space-y-2">
                            {tier.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits for Sponsors */}
                {event.benefits && event.benefits.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Benefits for Sponsors</h2>
                    <ul className="space-y-3">
                      {event.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {event.timeline && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock size={20} />
                      Timeline
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line">{event.timeline}</p>
                  </div>
                )}

                {/* Deliverables */}
                {event.deliverables && event.deliverables.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Deliverables</h2>
                    <div className="flex flex-wrap gap-2">
                      {event.deliverables.map((deliverable, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Organizer Profile */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Organizer</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{event.organizerName}</p>
                      <p className="text-sm text-muted-foreground">{event.organizerRole}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl shadow-lg sticky top-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">Interested in Sponsoring?</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send a sponsorship offer to connect with the organizer.
                  </p>
                  <button
                    onClick={() => setIsOfferModalOpen(true)}
                    className="block w-full text-center px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    Send Sponsorship Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SponsorshipOfferModal
        eventId={id}
        eventName={event.title}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </div>
  )
}
