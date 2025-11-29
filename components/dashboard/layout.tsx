"use client"

import DashboardSidebar from "./sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 ml-64">
        <div className="h-full">{children}</div>
      </main>
    </div>
  )
}

