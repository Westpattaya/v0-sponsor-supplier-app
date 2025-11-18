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
  { id: "sponsors", name: "Sponsors", icon: Users, href: "/find-sponsors?category=sponsors" },
  { id: "popular", name: "Popular Events", icon: TrendingUp, href: "/find-sponsors?sort=popular" },
  { id: "upcoming", name: "Upcoming", icon: Calendar, href: "/find-sponsors?sort=upcoming" },
  { id: "local", name: "Local Events", icon: MapPin, href: "/find-sponsors?filter=local" },
  { id: "high-budget", name: "High Budget", icon: DollarSign, href: "/find-sponsors?filter=high-budget" },
  { id: "featured", name: "Featured", icon: Sparkles, href: "/find-sponsors?filter=featured" },
  { id: "tech", name: "Tech Events", icon: Target, href: "/find-sponsors?category=tech" },
  { id: "premium", name: "Premium", icon: Award, href: "/find-sponsors?filter=premium" },
]

export default function CategoryGrid() {
  return (
    <section className="w-full -mt-6 md:-mt-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card border border-border/60 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="flex flex-col items-center justify-center space-y-2 p-3 md:p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="p-2.5 md:p-3 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    <Icon size={20} className="md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs lg:text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors leading-tight">
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

