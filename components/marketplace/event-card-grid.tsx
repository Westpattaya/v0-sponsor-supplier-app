"use client"

import Link from "next/link"
import { MapPin, Calendar, DollarSign, Users, GraduationCap } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventCardGridProps {
  event: Event
}

const supportLabels: Record<string, string> = {
  money: "Cash",
  product: "Product",
  booth: "Booth",
  giveaway: "Giveaway",
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
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1">
          {event.title}
        </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <GraduationCap size={12} />
            <span className="line-clamp-1">{event.university}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users size={14} />
            <span>{event.audienceSize} attendees</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <DollarSign size={14} />
              <span>{event.budget}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {event.supportNeeded.slice(0, 2).map((support) => (
                <span
                  key={support}
                  className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {supportLabels[support]}
                </span>
              ))}
              {event.supportNeeded.length > 2 && (
                <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                  +{event.supportNeeded.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

