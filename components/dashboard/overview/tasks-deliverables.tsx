"use client"

import Link from "next/link"
import { mockTasks } from "@/lib/dashboard-data"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { format } from "date-fns"

export default function TasksDeliverables() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={18} className="text-green-600" />
      case "in-progress":
        return <Clock size={18} className="text-primary" />
      default:
        return <Circle size={18} className="text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Tasks & Deliverables
        </h2>
        <Link
          href="/dashboard/tasks"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {mockTasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5">{getStatusIcon(task.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground text-sm">
                  {task.title}
                </h3>
                <span
                  className={`text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {task.sponsorship}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

