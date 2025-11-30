import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/sponsor-postings - Get all sponsor postings with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const sponsorType = searchParams.get("sponsorType")
    const category = searchParams.get("category")
    const budgetMin = searchParams.get("budgetMin")
    const budgetMax = searchParams.get("budgetMax")
    const university = searchParams.get("university")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ]
    }

    if (sponsorType) {
      where.sponsorType = sponsorType
    }

    if (category) {
      where.categories = { contains: category }
    }

    if (university) {
      where.targetUniversities = { contains: university }
    }

    const [postings, total] = await Promise.all([
      prisma.sponsorPosting.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          sponsor: {
            select: {
              id: true,
              name: true,
              email: true,
              companyName: true,
            },
          },
        },
      }),
      prisma.sponsorPosting.count({ where }),
    ])

    return NextResponse.json({
      postings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching sponsor postings:", error)
    return NextResponse.json({ error: "Failed to fetch sponsor postings" }, { status: 500 })
  }
}

// POST /api/sponsor-postings - Create a new sponsor posting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received sponsor posting data:", JSON.stringify(body, null, 2))

    // For now, create a mock sponsor if none exists
    // In production, get from session/auth
    const sponsorEmail = body.contactEmail || body.email
    if (!sponsorEmail) {
      return NextResponse.json(
        { error: "Sponsor email is required" },
        { status: 400 }
      )
    }

    if (!body.companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      )
    }

    let sponsor = await prisma.sponsor.findFirst({
      where: { email: sponsorEmail },
    })

    if (!sponsor) {
      sponsor = await prisma.sponsor.create({
        data: {
          name: body.contactName || body.companyName,
          email: sponsorEmail,
          companyName: body.companyName,
          role: "sponsor",
        },
      })
    }

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }
    if (!body.description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }
    if (!body.sponsorType) {
      return NextResponse.json({ error: "Sponsor type is required" }, { status: 400 })
    }
    if (!body.deliverables || body.deliverables.length === 0) {
      return NextResponse.json({ error: "At least one deliverable is required" }, { status: 400 })
    }

    const posting = await prisma.sponsorPosting.create({
      data: {
        title: body.title,
        description: body.description,
        shortDescription: body.shortDescription || null,
        companyName: body.companyName,
        sponsorType: body.sponsorType,
        budget: body.budget || null,
        deliverables: JSON.stringify(body.deliverables || []),
        benefits: body.benefits ? JSON.stringify(body.benefits) : null,
        targetAudience: body.targetAudience || null,
        targetUniversities: body.targetUniversities ? JSON.stringify(body.targetUniversities) : null,
        categories: JSON.stringify(body.categories || []),
        contactEmail: sponsorEmail,
        contactPhone: body.contactPhone || null,
        website: body.website || null,
        socialMediaLinks: body.socialMediaLinks || null,
        photos: body.photos ? JSON.stringify(body.photos) : null,
        createdBy: sponsor.id,
      },
    })

    console.log("Sponsor posting created successfully:", posting.id)

    return NextResponse.json(posting, { status: 201 })
  } catch (error: any) {
    console.error("========== ERROR CREATING SPONSOR POSTING ==========")
    console.error("Error message:", error.message)
    console.error("Error code:", error.code)
    console.error("Error meta:", JSON.stringify(error.meta, null, 2))
    console.error("Error stack:", error.stack)
    console.error("===================================================")
    
    // Return a more helpful error message
    let errorMessage = "Failed to create sponsor posting"
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
