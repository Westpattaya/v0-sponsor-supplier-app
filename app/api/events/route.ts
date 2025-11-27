import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/events - Get all events with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const university = searchParams.get("university")
    const category = searchParams.get("category")
    const budgetMin = searchParams.get("budgetMin")
    const budgetMax = searchParams.get("budgetMax")
    const audienceSize = searchParams.get("audienceSize")
    const sponsorshipType = searchParams.get("sponsorshipType")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { university: { contains: search, mode: "insensitive" } },
      ]
    }

    if (university) {
      where.university = university
    }

    if (category) {
      where.categories = { contains: category }
    }

    if (audienceSize) {
      where.audienceSize = audienceSize
    }

    if (sponsorshipType) {
      where.needs = { contains: sponsorshipType }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received event data:", JSON.stringify(body, null, 2))

    // For now, create a mock organizer if none exists
    // In production, get from session/auth
    const organizerEmail = body.organizerEmail || body.email
    if (!organizerEmail) {
      return NextResponse.json(
        { error: "Organizer email is required" },
        { status: 400 }
      )
    }

    if (!body.organizerName) {
      return NextResponse.json(
        { error: "Organizer name is required" },
        { status: 400 }
      )
    }

    let organizer = await prisma.organizer.findFirst({
      where: { email: organizerEmail },
    })

    if (!organizer) {
      organizer = await prisma.organizer.create({
        data: {
          name: body.organizerName,
          email: organizerEmail,
        },
      })
    }

    // Validate required fields
    if (!body.eventName) {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 })
    }
    if (!body.university) {
      return NextResponse.json({ error: "University is required" }, { status: 400 })
    }
    if (!body.eventDates) {
      return NextResponse.json({ error: "Event date is required" }, { status: 400 })
    }
    if (!body.expectedAttendees) {
      return NextResponse.json({ error: "Expected attendees is required" }, { status: 400 })
    }
    if (!body.location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const event = await prisma.event.create({
      data: {
        name: body.eventName,
        university: body.university,
        date: new Date(body.eventDates),
        audienceSize: body.expectedAttendees,
        description: body.fullDescription || body.shortDescription || "",
        shortDescription: body.shortDescription || "",
        needs: JSON.stringify(body.supportNeeded || []),
        categories: JSON.stringify([body.eventType || "Other"]),
        location: body.location,
        venue: body.venue || null,
        isOnline: body.isOnline || false,
        budget: body.budget || null,
        audienceAgeRange: body.audienceAgeRange || null,
        audienceInterests: body.audienceInterests || null,
        audienceOccupation: body.audienceOccupation || null,
        organizerName: body.organizerName,
        organizerRole: body.organizerRole || null,
        organizerEmail: body.email || body.organizerEmail || organizerEmail,
        organizerPhone: body.phone || null,
        socialMediaLinks: body.socialMediaLinks || null,
        createdBy: organizer.id,
      },
    })

    console.log("Event created successfully:", event.id)

    return NextResponse.json(event, { status: 201 })
  } catch (error: any) {
    console.error("========== ERROR CREATING EVENT ==========")
    console.error("Error message:", error.message)
    console.error("Error code:", error.code)
    console.error("Error meta:", JSON.stringify(error.meta, null, 2))
    console.error("Error stack:", error.stack)
    console.error("==========================================")
    
    // Return a more helpful error message
    let errorMessage = "Failed to create event"
    if (error.code === "P2002") {
      errorMessage = "A record with this information already exists"
    } else if (error.code === "P2003") {
      errorMessage = "Invalid reference to related record"
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        code: error.code,
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

