"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Header from "@/components/layout/header"
import { CheckCircle2, X, Clock, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState<"events" | "offers">("offers")
  const queryClient = useQueryClient()

  // Fetch offers (in production, filter by organizer's events)
  const { data: offers, isLoading: offersLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const response = await fetch("/api/offers")
      if (!response.ok) throw new Error("Failed to fetch offers")
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

  const updateOfferMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update offer")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] })
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

  const handleAcceptOffer = (offerId: string) => {
    if (confirm("Accept this sponsorship offer? This will create an Active Sponsorship.")) {
      updateOfferMutation.mutate({ id: offerId, status: "accepted" })
    }
  }

  const handleDeclineOffer = (offerId: string) => {
    if (confirm("Decline this sponsorship offer?")) {
      updateOfferMutation.mutate({ id: offerId, status: "declined" })
    }
  }

  const pendingOffers = offers?.filter((o: any) => o.status === "pending") || []
  const acceptedOffers = offers?.filter((o: any) => o.status === "accepted") || []
  const declinedOffers = offers?.filter((o: any) => o.status === "declined") || []

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
                onClick={() => setActiveTab("offers")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "offers"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Offers ({pendingOffers.length})
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

            {/* Offers Tab */}
            {activeTab === "offers" && (
              <div className="space-y-6">
                {/* Pending Offers */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    Pending Offers ({pendingOffers.length})
                  </h2>
                  {offersLoading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading offers...</div>
                  ) : pendingOffers.length === 0 ? (
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                      <p className="text-muted-foreground">No pending offers</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingOffers.map((offer: any) => (
                        <div
                          key={offer.id}
                          className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {offer.event?.name || "Event"}
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">From: </span>
                                  <span className="font-medium text-foreground">
                                    {offer.sponsor?.name}
                                    {offer.sponsor?.companyName && ` (${offer.sponsor.companyName})`}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Offer Type: </span>
                                  <span className="font-medium text-foreground capitalize">{offer.offerType}</span>
                                </div>
                                {offer.amount && (
                                  <div>
                                    <span className="text-muted-foreground">Amount: </span>
                                    <span className="font-medium text-foreground">{offer.amount}</span>
                                  </div>
                                )}
                                {offer.items && (
                                  <div>
                                    <span className="text-muted-foreground">Items: </span>
                                    <span className="font-medium text-foreground">{offer.items}</span>
                                  </div>
                                )}
                                {offer.notes && (
                                  <div className="pt-2">
                                    <span className="text-muted-foreground">Notes: </span>
                                    <p className="text-foreground mt-1">{offer.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAcceptOffer(offer.id)}
                                disabled={updateOfferMutation.isPending}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                              >
                                <CheckCircle2 size={16} />
                                Accept
                              </button>
                              <button
                                onClick={() => handleDeclineOffer(offer.id)}
                                disabled={updateOfferMutation.isPending}
                                className="px-4 py-2 border border-destructive text-destructive rounded-lg font-medium hover:bg-destructive/10 transition-colors disabled:opacity-50 flex items-center gap-2"
                              >
                                <X size={16} />
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accepted Offers */}
                {acceptedOffers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-green-500" />
                      Accepted Offers ({acceptedOffers.length})
                    </h2>
                    <div className="space-y-4">
                      {acceptedOffers.map((offer: any) => (
                        <div
                          key={offer.id}
                          className="bg-card border border-green-500/20 rounded-xl p-6"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {offer.event?.name || "Event"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                From: {offer.sponsor?.name}
                                {offer.sponsor?.companyName && ` (${offer.sponsor.companyName})`}
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                              Accepted
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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

