"use client"

import Link from "next/link"
import { mockSponsorships } from "@/lib/dashboard-data"

export default function ActiveSponsorships() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Active Sponsorships
        </h2>
        <Link
          href="/dashboard/sponsorships"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSponsorships.map((sponsorship) => (
          <div
            key={sponsorship.id}
            className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {sponsorship.eventName}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {sponsorship.organization}
                </p>
              </div>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  sponsorship.status === "active"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {sponsorship.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {sponsorship.progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${sponsorship.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span className="font-semibold text-foreground">
                  ${sponsorship.value.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Deliverables</span>
                <span className="font-medium text-foreground">
                  {sponsorship.completedDeliverables}/{sponsorship.deliverables}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

