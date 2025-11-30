"use client"

import DashboardLayout from "@/components/dashboard/layout"
import { mockOffers } from "@/lib/dashboard-data"
import { format } from "date-fns"
import { DollarSign, Package, Store, Wrench, Eye, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function OffersPage() {
  // Only show received proposals (sponsors only receive, never send)
  const receivedOffers = mockOffers.filter((offer) => offer.type === "received")

  const getOfferIcon = (offerType?: string) => {
    switch (offerType) {
      case "money":
        return <DollarSign size={18} className="text-green-600" />
      case "product":
        return <Package size={18} className="text-blue-600" />
      case "booth":
        return <Store size={18} className="text-purple-600" />
      case "service":
        return <Wrench size={18} className="text-orange-600" />
      default:
        return <DollarSign size={18} className="text-muted-foreground" />
    }
  }

  const getProposalTypeLabel = (offerType?: string) => {
    const labels: Record<string, string> = {
      money: "Cash",
      product: "Product",
      booth: "Booth",
      service: "Service",
    }
    return labels[offerType || ""] || "Not specified"
  }

  const getProposalValue = (offer: typeof mockOffers[0]) => {
    if (offer.amount) {
      return `$${offer.amount.toLocaleString()}`
    }
    return "Value not specified"
  }

  return (
    <DashboardLayout>
      <div className="bg-background">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pending Offers</h1>
            <p className="text-muted-foreground mt-1">
              Review and manage sponsorship proposals received from event organizers
            </p>
          </div>

          {/* Proposals Received */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ArrowDownRight size={20} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Proposals Received</h2>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {receivedOffers.length}
              </span>
            </div>

            {receivedOffers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {receivedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Event Name */}
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {offer.eventName}
                    </h3>

                    {/* Organizer Name */}
                    {offer.organizerName && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">ผู้จัดงาน</p>
                        <p className="text-sm font-medium text-foreground">
                          {offer.organizerName}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 mb-4">
                      {/* Proposal Type */}
                      <div className="flex items-center gap-2">
                        {getOfferIcon(offer.offerType)}
                        <div>
                          <p className="text-xs text-muted-foreground">Proposal Type</p>
                          <p className="text-sm font-semibold text-foreground">
                            {getProposalTypeLabel(offer.offerType)}
                          </p>
                        </div>
                      </div>

                      {/* Proposal Value */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Proposal Value</p>
                        <p className="text-sm font-semibold text-foreground">
                          {getProposalValue(offer)}
                        </p>
                      </div>

                      {/* Date Received */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Date Received</p>
                        <p className="text-sm text-foreground">
                          {format(new Date(offer.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    {/* View Proposal Button */}
                    <Link
                      href={`/dashboard/offers/${offer.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                      <Eye size={16} />
                      <span>View Proposal</span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground rounded-lg border border-border bg-card">
                <p className="text-base">You haven't received any proposals yet</p>
                <p className="text-sm mt-2">Proposals from event organizers will appear here</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
