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
