"use client"

import {
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Sparkles,
  Target,
  Award,
} from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: string
}

const categories: Category[] = [
  { id: "sponsors", name: "Sponsors", icon: Users, href: "/?category=sponsors" },
  { id: "popular", name: "Popular Sponsors", icon: TrendingUp, href: "/?sort=popular" },
  { id: "upcoming", name: "New Offers", icon: Calendar, href: "/?sort=upcoming" },
  { id: "local", name: "Local Sponsors", icon: MapPin, href: "/?filter=local" },
  { id: "high-budget", name: "High Budget", icon: DollarSign, href: "/?filter=high-budget" },
  { id: "featured", name: "Featured", icon: Sparkles, href: "/?filter=featured" },
  { id: "tech", name: "Tech Sponsors", icon: Target, href: "/?category=tech" },
  { id: "premium", name: "Premium", icon: Award, href: "/?filter=premium" },
]

export default function CategoryGrid() {
  return (
    <section className="w-full py-6 md:py-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card border border-border/60 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="flex flex-col items-center justify-center space-y-2 p-4 md:p-5 rounded-lg hover:bg-muted/50 transition-colors group flex-shrink-0 min-w-[80px] md:min-w-[100px]"
                >
                  <div className="p-3 md:p-4 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    <Icon size={24} className="md:w-7 md:h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors leading-tight whitespace-nowrap">
                    {category.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

