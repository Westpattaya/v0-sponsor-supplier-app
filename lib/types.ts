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
