import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/offers/[id] - Get offer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const offer = await prisma.sponsorshipOffer.findUnique({
      where: { id },
      include: {
        event: true,
        sponsor: true,
      },
    })

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 })
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error("Error fetching offer:", error)
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 })
  }
}

// PATCH /api/offers/[id] - Update offer (accept/decline)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const offer = await prisma.sponsorshipOffer.update({
      where: { id },
      data: {
        status: body.status, // "accepted" | "declined"
      },
      include: {
        event: true,
        sponsor: true,
      },
    })

    // If accepted, trigger SaaS pipeline integration
    // In production, this would call your SaaS backend
    if (body.status === "accepted") {
      console.log("Offer accepted - triggering SaaS pipeline for Active Sponsorship")
      // TODO: Call SaaS API to create Active Sponsorship
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error("Error updating offer:", error)
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 })
  }
}

