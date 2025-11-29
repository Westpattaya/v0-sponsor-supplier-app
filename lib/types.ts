export interface Event {
  id: string
  title: string
  description: string
  category: string
  budget: string
  location: string
  date: string
  image?: string
}

export interface Proposal {
  id: string
  eventTitle: string
  supplierName: string
  proposalText: string
  amount: number
  status: "pending" | "approved" | "rejected"
}

export interface User {
  id: string
  name: string
  role: "organizer" | "sponsor" | "supplier"
  avatar?: string
}

export interface Sponsorship {
  id: string
  eventName: string
  organization: string
  status: "active" | "pending" | "completed"
  progress: number
  value: number
  startDate: string
  endDate: string
  deliverables: number
  completedDeliverables: number
}

export interface Offer {
  id: string
  eventName: string
  organization: string
  type: "sent" | "received"
  amount: number
  status: "pending" | "accepted" | "rejected"
  date: string
}

export interface Task {
  id: string
  title: string
  sponsorship: string
  dueDate: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
}

export interface Deadline {
  id: string
  title: string
  sponsorship: string
  dueDate: string
  type: "deliverable" | "payment" | "review"
  daysUntil: number
}
