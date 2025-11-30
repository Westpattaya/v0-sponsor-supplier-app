"use client"

import DashboardLayout from "@/components/dashboard/layout"
import { mockSponsorships } from "@/lib/dashboard-data"
import { mockDeadlines } from "@/lib/dashboard-data"
import { format } from "date-fns"
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SponsorshipsPage() {
  const activeSponsorships = mockSponsorships.filter((s) => s.status === "active")

  const getNextDeadline = (eventName: string) => {
    const deadlines = mockDeadlines.filter(
      (d) => d.sponsorship === eventName || d.sponsorship.includes(eventName)
    )
    if (deadlines.length === 0) return null
    return deadlines.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime()
      const dateB = new Date(b.dueDate).getTime()
      return dateA - dateB
    })[0]
  }

  return (
    <DashboardLayout>
      <div className="bg-background">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Active Sponsorships</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your active sponsorship agreements
            </p>
          </div>

          {/* Active Sponsorships Cards */}
          {activeSponsorships.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSponsorships.map((sponsorship) => {
                const nextDeadline = getNextDeadline(sponsorship.eventName)
                return (
                  <div
                    key={sponsorship.id}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Event Name */}
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {sponsorship.eventName}
                    </h3>
                    
                    {/* Organizer */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {sponsorship.organization}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
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

                    {/* Deliverables */}
                    <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Deliverables</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {sponsorship.completedDeliverables} / {sponsorship.deliverables}
                      </span>
                    </div>

                    {/* Next Deadline */}
                    {nextDeadline ? (
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Calendar size={16} className="text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-muted-foreground">Next deadline</p>
                          <p className="font-medium text-foreground">
                            {format(new Date(nextDeadline.dueDate), "MMM d, yyyy")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {nextDeadline.title}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 text-sm text-muted-foreground">
                        No upcoming deadlines
                      </div>
                    )}

                    {/* View Sponsorship Button */}
                    <Link
                      href={`/dashboard/sponsorships/${sponsorship.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                      <span>View Sponsorship</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No active sponsorships at this time</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
