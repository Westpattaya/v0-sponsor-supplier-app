"use client"

import Link from "next/link"
import { mockDeadlines } from "@/lib/dashboard-data"
import { Calendar, DollarSign, FileCheck, Eye } from "lucide-react"
import { format } from "date-fns"

export default function UpcomingDeadlines() {
  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign size={18} className="text-green-600" />
      case "deliverable":
        return <FileCheck size={18} className="text-primary" />
      case "review":
        return <Eye size={18} className="text-blue-600" />
      default:
        return <Calendar size={18} className="text-muted-foreground" />
    }
  }

  const getDaysUntilColor = (days: number) => {
    if (days <= 7) return "text-red-600 dark:text-red-400"
    if (days <= 14) return "text-yellow-600 dark:text-yellow-400"
    return "text-muted-foreground"
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Upcoming Deadlines
        </h2>
        <Link
          href="/dashboard/deadlines"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockDeadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-muted/50">
                {getDeadlineIcon(deadline.type)}
              </div>
              <span
                className={`text-xs font-semibold ${getDaysUntilColor(
                  deadline.daysUntil
                )}`}
              >
                {deadline.daysUntil}d left
              </span>
            </div>

            <h3 className="font-semibold text-foreground text-sm mb-1">
              {deadline.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate mb-2">
              {deadline.sponsorship}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(deadline.dueDate), "MMM d, yyyy")}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

