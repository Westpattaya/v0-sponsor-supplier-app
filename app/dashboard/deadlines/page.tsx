"use client"

import DashboardLayout from "@/components/dashboard/layout"

export default function DeadlinesPage() {
  return (
    <DashboardLayout>
      <div className="h-full overflow-y-auto bg-background">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground">Deadlines</h1>
          <p className="text-muted-foreground mt-1">
            View all upcoming deadlines and important dates
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

