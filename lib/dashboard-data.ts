import type { Sponsorship, Offer, Task, Deadline } from "./types"

export const mockSponsorships: Sponsorship[] = [
  {
    id: "1",
    eventName: "Spring Tech Conference 2025",
    organization: "Stanford University",
    status: "active",
    progress: 65,
    value: 15000,
    startDate: "2025-03-01",
    endDate: "2025-05-15",
    deliverables: 8,
    completedDeliverables: 5,
  },
  {
    id: "2",
    eventName: "Hackathon Weekend",
    organization: "MIT Computer Science Club",
    status: "active",
    progress: 40,
    value: 8000,
    startDate: "2025-02-15",
    endDate: "2025-04-20",
    deliverables: 5,
    completedDeliverables: 2,
  },
  {
    id: "3",
    eventName: "Cultural Festival",
    organization: "UCLA Student Union",
    status: "pending",
    progress: 0,
    value: 5000,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    deliverables: 6,
    completedDeliverables: 0,
  },
]

export const mockOffers: Offer[] = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    organization: "Berkeley Music Society",
    type: "sent",
    amount: 12000,
    status: "pending",
    date: "2025-01-15",
  },
  {
    id: "2",
    eventName: "Entrepreneurship Summit",
    organization: "Harvard Business Club",
    type: "received",
    amount: 20000,
    status: "pending",
    date: "2025-01-20",
  },
  {
    id: "3",
    eventName: "Sports Day 2025",
    organization: "Yale Athletics",
    type: "sent",
    amount: 7500,
    status: "pending",
    date: "2025-01-18",
  },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Deliver branded merchandise",
    sponsorship: "Spring Tech Conference 2025",
    dueDate: "2025-02-28",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "2",
    title: "Set up exhibition booth",
    sponsorship: "Spring Tech Conference 2025",
    dueDate: "2025-03-05",
    status: "pending",
    priority: "high",
  },
  {
    id: "3",
    title: "Provide speaker for opening keynote",
    sponsorship: "Hackathon Weekend",
    dueDate: "2025-03-10",
    status: "pending",
    priority: "medium",
  },
  {
    id: "4",
    title: "Submit logo for event materials",
    sponsorship: "Cultural Festival",
    dueDate: "2025-03-15",
    status: "pending",
    priority: "low",
  },
  {
    id: "5",
    title: "Review and approve final design",
    sponsorship: "Hackathon Weekend",
    dueDate: "2025-02-25",
    status: "completed",
    priority: "medium",
  },
]

export const mockDeadlines: Deadline[] = [
  {
    id: "1",
    title: "Final payment due",
    sponsorship: "Spring Tech Conference 2025",
    dueDate: "2025-03-01",
    type: "payment",
    daysUntil: 5,
  },
  {
    id: "2",
    title: "Deliver promotional materials",
    sponsorship: "Hackathon Weekend",
    dueDate: "2025-03-08",
    type: "deliverable",
    daysUntil: 12,
  },
  {
    id: "3",
    title: "Booth setup review",
    sponsorship: "Spring Tech Conference 2025",
    dueDate: "2025-03-03",
    type: "review",
    daysUntil: 7,
  },
  {
    id: "4",
    title: "Content approval deadline",
    sponsorship: "Cultural Festival",
    dueDate: "2025-03-20",
    type: "review",
    daysUntil: 24,
  },
]

