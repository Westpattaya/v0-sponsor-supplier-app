"use client"

import Link from "next/link"
import { Building2, DollarSign, Tag, Mail } from "lucide-react"
import type { SponsorPosting } from "@/lib/types"

interface SponsorPostingCardProps {
  posting: SponsorPosting
}

export default function SponsorPostingCard({ posting }: SponsorPostingCardProps) {
  return (
    <Link
      href={`/sponsors/${posting.id}`}
      className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
    >
      {/* Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
        <div className="text-5xl font-bold text-muted-foreground/20">
          {posting.companyName.charAt(0)}
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur rounded-md">
          <span className="text-xs font-semibold text-primary">{posting.sponsorType}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {posting.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 size={12} />
            <span className="line-clamp-1">{posting.companyName}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {posting.shortDescription || posting.description}
        </p>

        {/* Details */}
        <div className="space-y-2 pt-2 border-t border-border">
          {posting.budget && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <DollarSign size={14} />
              <span>{posting.budget}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Tag size={14} />
            <span className="line-clamp-1">
              {posting.categories.slice(0, 2).join(", ")}
              {posting.categories.length > 2 && ` +${posting.categories.length - 2}`}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail size={12} />
              <span className="line-clamp-1">{posting.contactEmail}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {posting.deliverables.slice(0, 2).map((deliverable, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {deliverable}
                </span>
              ))}
              {posting.deliverables.length > 2 && (
                <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                  +{posting.deliverables.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

