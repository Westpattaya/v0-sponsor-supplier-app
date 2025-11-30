"use client"

import DashboardLayout from "@/components/dashboard/layout"
import ActiveSponsorships from "@/components/dashboard/overview/active-sponsorships"
import PendingOffers from "@/components/dashboard/overview/pending-offers"
import TasksDeliverables from "@/components/dashboard/overview/tasks-deliverables"
import UpcomingDeadlines from "@/components/dashboard/overview/upcoming-deadlines"
import SuggestedEvents from "@/components/dashboard/overview/suggested-events"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="bg-background">
        <div className="p-6 md:p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your sponsorships and activities
            </p>
          </div>

          {/* Active Sponsorships */}
          <ActiveSponsorships />

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-2">
            <PendingOffers />
            <TasksDeliverables />
          </div>

          {/* Upcoming Deadlines */}
          <UpcomingDeadlines />

          {/* Suggested Events */}
          <SuggestedEvents />
        </div>
      </div>
    </DashboardLayout>
  )
}
