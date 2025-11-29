"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Handshake,
  Clock,
  CheckSquare,
  Calendar,
  Search,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Active Sponsorships", href: "/dashboard/sponsorships", icon: Handshake },
  { name: "Pending Offers", href: "/dashboard/offers", icon: Clock },
  { name: "Tasks & Deliverables", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Deadlines", href: "/dashboard/deadlines", icon: Calendar },
  { name: "Browse Events", href: "/find-sponsor", icon: Search },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="h-16 border-b border-border flex items-center px-6">
        <Link href="/dashboard" className="flex items-center space-x-2.5">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SM</span>
          </div>
          <span className="font-semibold text-lg text-foreground">SponMatch</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs font-semibold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate">
              john@company.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

