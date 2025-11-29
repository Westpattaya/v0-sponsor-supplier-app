"use client"

import Link from "next/link"
import { mockOffers } from "@/lib/dashboard-data"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function PendingOffers() {
  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Pending Offers
        </h2>
        <Link
          href="/dashboard/offers"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {mockOffers.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {offer.type === "sent" ? (
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                ) : (
                  <ArrowDownRight size={16} className="text-primary" />
                )}
                <h3 className="font-medium text-foreground truncate">
                  {offer.eventName}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {offer.organization}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-foreground">
                  ${offer.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {offer.type === "sent" ? "You sent" : "Received"}
                </span>
              </div>
            </div>
            <span className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
              {offer.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

