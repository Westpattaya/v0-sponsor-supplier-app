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
  organizerName?: string
  type: "sent" | "received"
  amount?: number
  offerType?: "money" | "product" | "booth" | "service"
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

export type PipelineStage = "pending" | "negotiation" | "approved" | "active" | "completed"

export interface PipelineDeal {
  id: string
  eventName: string
  organization: string
  stage: PipelineStage
  value: number
  probability: number // 0-100
  contactPerson: string
  contactEmail: string
  lastActivity: string
  nextAction?: string
  notes?: string
}

export interface Deal {
  id: string
  eventName: string
  organizerName: string
  organizerEmail: string
  organization: string
  status: "pending" | "accepted" | "rejected" | "changes_requested"
  packageDetails: {
    items: string[]
    value: number
    benefits: string[]
  }
  termsAndConditions: string[]
  contractPdfUrl?: string
  proposalSentDate: string
  sponsorViewedDate?: string
  decisionDate?: string
  timeline: {
    event: string
    date: string
    description?: string
  }[]
}

export type DeliverableStatus = "not_started" | "submitted" | "approved" | "rejected"

export interface Deliverable {
  id: string
  title: string
  status: DeliverableStatus
  dueDate: string
  description?: string
  proofSubmissions: {
    id: string
    submittedDate: string
    files: string[]
    notes?: string
  }[]
}

export interface SponsorshipDeliverables {
  sponsorshipId: string
  eventName: string
  organization: string
  deliverables: Deliverable[]
}

export type FileType = "pdf" | "image" | "video" | "document" | "contract" | "report" | "proof"

export interface LibraryFile {
  id: string
  name: string
  type: FileType
  size: number // in bytes
  eventName: string
  organization: string
  sponsorshipId: string
  uploadedDate: string
  uploadedBy: string
  url: string
  thumbnailUrl?: string
  description?: string
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

export type InboxItemType = "message" | "proof_update" | "task_update" | "mention" | "update" | "proof_submission"

export interface InboxItem {
  id: string
  type: InboxItemType
  eventName: string
  sponsorshipId: string
  sponsorshipItem?: string // e.g., ":30 TV Spot", "Logo Placement", etc.
  organization: string
  organizerName: string
  organizerAvatar?: string
  organizerInitials: string
  lastMessage?: string
  lastUpdate?: string
  timestamp: string
  relativeTime: string // e.g., "1h", "18h"
  isUnread: boolean
  statusIcon: "message" | "proof" | "task" | "update" | "mention" | "warning"
  // Detail view data
  description?: string
  specs?: {
    format?: string
    dimensions?: string
    requirements?: string[]
  }
  attachedFiles?: {
    id: string
    name: string
    type: string
    url: string
    thumbnailUrl?: string
  }[]
  associatedBrands?: {
    id: string
    name: string
    logoUrl?: string
  }[]
  tasks?: {
    id: string
    title: string
    dueDate: string
    status: "completed" | "pending" | "overdue"
    assignedTo?: string
    priority?: "high" | "medium" | "low"
  }[]
  messages?: {
    id: string
    author: string
    authorAvatar?: string
    authorInitials: string
    content: string
    timestamp: string
    relativeTime: string
  }[]
  activityTimeline?: {
    id: string
    event: string
    timestamp: string
    user?: string
  }[]
  proofData?: {
    id: string
    title: string
    status: "pending" | "approved" | "rejected"
    submittedDate: string
    files: string[]
  }
}
