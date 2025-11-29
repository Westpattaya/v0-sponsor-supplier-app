"use client"

import DashboardLayout from "@/components/dashboard/layout"

export default function OffersPage() {
  return (
    <DashboardLayout>
      <div className="h-full overflow-y-auto bg-background">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground">Pending Offers</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage sponsorship offers
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

