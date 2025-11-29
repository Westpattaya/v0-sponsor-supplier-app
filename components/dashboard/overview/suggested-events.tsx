"use client"

import Link from "next/link"
import { mockEvents } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

export default function SuggestedEvents() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Suggested Student Events
        </h2>
        <Link
          href="/find-sponsor"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Browse Event Board
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-80 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {event.location} • {event.date}
                  </p>
                </div>
                <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {event.category}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {event.budget}
                </span>
                <Link
                  href={`/find-sponsor?event=${event.id}`}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

