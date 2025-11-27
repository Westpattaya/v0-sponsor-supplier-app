import type { Event } from "./types"

// Transform database event to frontend Event type
export function transformDbEventToEvent(dbEvent: any): Event {
  const categories = dbEvent.categories ? JSON.parse(dbEvent.categories) : []
  const needs = dbEvent.needs ? JSON.parse(dbEvent.needs) : []
  
  return {
    id: dbEvent.id,
    title: dbEvent.name,
    description: dbEvent.description || dbEvent.shortDescription || "",
    category: categories[0] || "Other",
    budget: dbEvent.budget || "Not specified",
    location: dbEvent.location,
    date: new Date(dbEvent.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    university: dbEvent.university,
    audienceSize: dbEvent.audienceSize,
    supportNeeded: needs,
    organizerName: dbEvent.organizerName,
    organizerRole: dbEvent.organizerRole,
    expectedAudience: dbEvent.audienceAgeRange || dbEvent.audienceInterests || "",
    sponsorshipTiers: [],
    benefits: [],
    timeline: "",
    deliverables: [],
  }
}

