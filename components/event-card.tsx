import { TrendingUp, MapPin } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white border border-border rounded-3xl p-4 space-y-3 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-accent" />
            <span className="text-xs font-semibold text-accent uppercase">{event.category}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight">{event.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{event.budget}</p>
          <p className="text-xs text-muted-foreground">Budget</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={14} />
          {event.location}
        </div>
        <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">{event.date}</span>
      </div>
    </div>
  )
}
