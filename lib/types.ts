export interface Event {
  id: string
  title: string
  description: string
  category: string
  budget: string
  location: string
  date: string
  image?: string
  // Marketplace enhancements
  university: string
  audienceSize: string
  supportNeeded: ("money" | "product" | "booth" | "giveaway")[]
  organizerName: string
  organizerRole: string
  organizerAvatar?: string
  expectedAudience?: string
  sponsorshipTiers?: {
    name: string
    amount: string
    benefits: string[]
  }[]
  benefits?: string[]
  timeline?: string
  deliverables?: string[]
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

// Dashboard types (from main branch)
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

// Marketplace types (from next-jue branch)
export interface SponsorshipOffer {
  id: string
  eventId: string
  sponsorId: string
  offerType: "money" | "product" | "booth" | "service"
  amount?: string
  items?: string
  deliverables: string[]
  notes: string
  status: "pending" | "accepted" | "declined"
  createdAt: string
}
