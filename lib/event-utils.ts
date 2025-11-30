import type { Event, SponsorPosting } from "./types"

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

// Transform database sponsor posting to frontend SponsorPosting type
export function transformDbSponsorPostingToPosting(dbPosting: any): SponsorPosting {
  const categories = dbPosting.categories ? JSON.parse(dbPosting.categories) : []
  const deliverables = dbPosting.deliverables ? JSON.parse(dbPosting.deliverables) : []
  const benefits = dbPosting.benefits ? JSON.parse(dbPosting.benefits) : []
  const targetUniversities = dbPosting.targetUniversities ? JSON.parse(dbPosting.targetUniversities) : []
  const photos = dbPosting.photos ? JSON.parse(dbPosting.photos) : []
  
  return {
    id: dbPosting.id,
    title: dbPosting.title,
    description: dbPosting.description,
    shortDescription: dbPosting.shortDescription || undefined,
    companyName: dbPosting.companyName,
    sponsorType: dbPosting.sponsorType,
    budget: dbPosting.budget || undefined,
    deliverables,
    benefits: benefits.length > 0 ? benefits : undefined,
    targetAudience: dbPosting.targetAudience || undefined,
    targetUniversities: targetUniversities.length > 0 ? targetUniversities : undefined,
    categories,
    contactEmail: dbPosting.contactEmail,
    contactPhone: dbPosting.contactPhone || undefined,
    website: dbPosting.website || undefined,
    socialMediaLinks: dbPosting.socialMediaLinks || undefined,
    photos: photos.length > 0 ? photos : undefined,
    createdBy: dbPosting.createdBy,
    createdAt: dbPosting.createdAt.toISOString(),
    updatedAt: dbPosting.updatedAt.toISOString(),
  }
}

