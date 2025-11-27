import type { Event, Proposal } from "./types"

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "Looking for tech sponsors and logistics partners for our annual summer music festival. This event brings together 5,000+ students for a day of music, food, and community. We're seeking sponsors who align with our values of creativity and innovation.",
    category: "Music",
    budget: "$50K",
    location: "Austin, TX",
    date: "Jun 15, 2025",
    university: "University of Texas at Austin",
    audienceSize: "5,000-7,000",
    supportNeeded: ["money", "product", "booth"],
    organizerName: "Sarah Chen",
    organizerRole: "Event Coordinator",
    expectedAudience: "College students (18-25), music enthusiasts, local community",
    sponsorshipTiers: [
      {
        name: "Platinum",
        amount: "$20,000",
        benefits: ["Main stage banner", "Booth space", "Social media features", "VIP passes"]
      },
      {
        name: "Gold",
        amount: "$10,000",
        benefits: ["Side stage banner", "Booth space", "Social media mention"]
      },
      {
        name: "Silver",
        amount: "$5,000",
        benefits: ["Logo on website", "Social media mention"]
      }
    ],
    benefits: [
      "Logo placement on main stage",
      "Social media features (50K+ reach)",
      "Booth space at event",
      "Product sampling opportunities",
      "VIP passes for team"
    ],
    timeline: "Logo placement: 2 weeks before event, Social posts: 1 week before and during event, Booth setup: Day of event",
    deliverables: ["Logo placement", "Social media posts", "Booth space", "Product sampling"]
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description: "Major tech conference seeking sponsors for brand activations and booth setup. Connect with 3,000+ tech students, professionals, and startups.",
    category: "Tech",
    budget: "$75K",
    location: "San Francisco, CA",
    date: "Jul 22, 2025",
    university: "Stanford University",
    audienceSize: "3,000-4,000",
    supportNeeded: ["money", "booth", "product"],
    organizerName: "Alex Rodriguez",
    organizerRole: "Tech Club President",
    expectedAudience: "Tech students, professionals, startup founders (20-35)",
    sponsorshipTiers: [
      {
        name: "Platinum",
        amount: "$30,000",
        benefits: ["Keynote sponsor", "Main booth", "Branded swag", "Networking event"]
      },
      {
        name: "Gold",
        amount: "$15,000",
        benefits: ["Booth space", "Branded swag", "Social media"]
      }
    ],
    benefits: [
      "Keynote sponsor mention",
      "Premium booth location",
      "Branded swag distribution",
      "Networking event access",
      "Social media coverage"
    ],
    timeline: "Booth setup: Day before event, Keynote mention: During event, Social posts: 2 weeks before and after",
    deliverables: ["Booth space", "Keynote mention", "Branded swag", "Social media"]
  },
  {
    id: "3",
    title: "Corporate Gala",
    description: "Luxury corporate event looking for catering, decor, and entertainment sponsors.",
    category: "Corporate",
    budget: "$25K",
    location: "New York, NY",
    date: "Aug 10, 2025",
    university: "NYU Stern School of Business",
    audienceSize: "500-800",
    supportNeeded: ["money", "product", "service"],
    organizerName: "Michael Park",
    organizerRole: "Business Club VP",
    expectedAudience: "Business students, alumni, corporate partners (22-40)",
    benefits: [
      "Logo on event materials",
      "Table sponsorship",
      "Networking opportunities",
      "Social media mention"
    ],
    timeline: "Material printing: 3 weeks before, Event: Aug 10, Social posts: Week of event",
    deliverables: ["Logo placement", "Table sponsorship", "Social media"]
  },
  {
    id: "4",
    title: "Marathon & Sports Day",
    description: "Annual marathon event looking for sports equipment and hydration sponsors.",
    category: "Sports",
    budget: "$30K",
    location: "Boston, MA",
    date: "Sep 5, 2025",
    university: "Boston University",
    audienceSize: "2,000-3,000",
    supportNeeded: ["product", "giveaway"],
    organizerName: "Emma Wilson",
    organizerRole: "Athletics Coordinator",
    expectedAudience: "Athletes, fitness enthusiasts, students (18-30)",
    benefits: [
      "Branded hydration stations",
      "Logo on race bibs",
      "Product sampling",
      "Social media coverage"
    ],
    timeline: "Bib printing: 2 weeks before, Event: Sep 5, Social posts: Week before and after",
    deliverables: ["Hydration stations", "Race bib logos", "Product sampling"]
  },
  {
    id: "5",
    title: "Art Exhibition Opening",
    description: "Contemporary art show seeking premium sponsors and media partners.",
    category: "Art",
    budget: "$15K",
    location: "Los Angeles, CA",
    date: "Aug 20, 2025",
    university: "UCLA School of the Arts",
    audienceSize: "800-1,200",
    supportNeeded: ["money", "product"],
    organizerName: "Jordan Kim",
    organizerRole: "Arts Society President",
    expectedAudience: "Art students, collectors, gallery owners (20-50)",
    benefits: [
      "Gallery wall sponsorship",
      "Opening night mention",
      "Catalog placement",
      "VIP reception access"
    ],
    timeline: "Catalog printing: 4 weeks before, Opening: Aug 20, Social posts: Month of event",
    deliverables: ["Gallery sponsorship", "Catalog placement", "VIP access"]
  },
]

export const mockProposals: Proposal[] = [
  {
    id: "1",
    eventTitle: "Summer Music Festival",
    supplierName: "AudioTech Solutions",
    proposalText: "We offer premium sound system rental with full technical support team.",
    amount: 5000,
    status: "pending",
  },
  {
    id: "2",
    eventTitle: "Tech Conference 2025",
    supplierName: "Stellar Events",
    proposalText: "Complete booth design, setup, and breakdown services with experienced crew.",
    amount: 8500,
    status: "approved",
  },
  {
    id: "3",
    eventTitle: "Corporate Gala",
    supplierName: "Gourmet Catering Co",
    proposalText: "Multi-course dinner with premium bar service and professional waitstaff.",
    amount: 12000,
    status: "approved",
  },
  {
    id: "4",
    eventTitle: "Marathon & Sports Day",
    supplierName: "HydroBoost Drinks",
    proposalText: "Unlimited hydration stations with branded cups and staff support.",
    amount: 3000,
    status: "rejected",
  },
  {
    id: "5",
    eventTitle: "Tech Conference 2025",
    supplierName: "Creative Marketing Agency",
    proposalText: "Brand activation booth with interactive demo and social media integration.",
    amount: 7500,
    status: "pending",
  },
]
