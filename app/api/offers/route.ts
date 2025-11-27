import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/offers - Get offers (with filters for organizer/sponsor)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventId = searchParams.get("eventId")
    const sponsorId = searchParams.get("sponsorId")
    const status = searchParams.get("status")

    const where: any = {}
    if (eventId) where.eventId = eventId
    if (sponsorId) where.sponsorId = sponsorId
    if (status) where.status = status

    const offers = await prisma.sponsorshipOffer.findMany({
      where,
      include: {
        event: {
          select: {
            id: true,
            name: true,
            university: true,
            date: true,
          },
        },
        sponsor: {
          select: {
            id: true,
            name: true,
            companyName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 })
  }
}

// POST /api/offers - Create sponsorship offer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // For now, create a mock sponsor if none exists
    // In production, get from session/auth
    let sponsor = await prisma.sponsor.findFirst({
      where: { email: body.sponsorEmail || "sponsor@example.com" },
    })

    if (!sponsor) {
      sponsor = await prisma.sponsor.create({
        data: {
          name: body.sponsorName || "Sponsor",
          email: body.sponsorEmail || "sponsor@example.com",
          companyName: body.companyName,
        },
      })
    }

    const offer = await prisma.sponsorshipOffer.create({
      data: {
        eventId: body.eventId,
        sponsorId: sponsor.id,
        offerType: body.offerType,
        amount: body.amount,
        items: body.items,
        deliverablesRequested: JSON.stringify(body.deliverables || []),
        notes: body.notes,
        status: "pending",
      },
      include: {
        event: {
          select: {
            name: true,
          },
        },
        sponsor: {
          select: {
            name: true,
            companyName: true,
          },
        },
      },
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 })
  }
}

