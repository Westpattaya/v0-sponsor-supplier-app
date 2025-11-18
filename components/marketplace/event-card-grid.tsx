"use client"

import Link from "next/link"
import { MapPin, Calendar, DollarSign } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventCardGridProps {
  event: Event
}

export default function EventCardGrid({ event }: EventCardGridProps) {
  return (
    <Link
      href={`/find-sponsors/${event.id}`}
      className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
    >
      {/* Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
        <div className="text-5xl font-bold text-muted-foreground/20">
          {event.title.charAt(0)}
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur rounded-md">
          <span className="text-xs font-semibold text-primary">{event.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <DollarSign size={14} />
              <span>{event.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

