"use client"

import DashboardSidebar from "./sidebar"
import DashboardHeader from "./header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

