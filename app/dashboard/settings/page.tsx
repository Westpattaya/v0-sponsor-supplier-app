"use client"

import DashboardLayout from "@/components/dashboard/layout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="h-full overflow-y-auto bg-background">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

