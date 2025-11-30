import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/sponsor-postings/[id] - Get a single sponsor posting
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posting = await prisma.sponsorPosting.findUnique({
      where: { id: params.id },
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
    })

    if (!posting) {
      return NextResponse.json({ error: "Sponsor posting not found" }, { status: 404 })
    }

    return NextResponse.json(posting)
  } catch (error) {
    console.error("Error fetching sponsor posting:", error)
    return NextResponse.json({ error: "Failed to fetch sponsor posting" }, { status: 500 })
  }
}

// DELETE /api/sponsor-postings/[id] - Delete a sponsor posting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if posting exists
    const posting = await prisma.sponsorPosting.findUnique({
      where: { id: params.id },
    })

    if (!posting) {
      return NextResponse.json({ error: "Sponsor posting not found" }, { status: 404 })
    }

    // Delete the posting
    await prisma.sponsorPosting.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Sponsor posting deleted successfully" })
  } catch (error) {
    console.error("Error deleting sponsor posting:", error)
    return NextResponse.json({ error: "Failed to delete sponsor posting" }, { status: 500 })
  }
}

// PUT /api/sponsor-postings/[id] - Update a sponsor posting
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Check if posting exists
    const existingPosting = await prisma.sponsorPosting.findUnique({
      where: { id: params.id },
    })

    if (!existingPosting) {
      return NextResponse.json({ error: "Sponsor posting not found" }, { status: 404 })
    }

    // Update the posting
    const posting = await prisma.sponsorPosting.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        shortDescription: body.shortDescription || null,
        companyName: body.companyName,
        sponsorType: body.sponsorType,
        budget: body.budget || null,
        deliverables: body.deliverables ? JSON.stringify(body.deliverables) : existingPosting.deliverables,
        benefits: body.benefits ? JSON.stringify(body.benefits) : existingPosting.benefits,
        targetAudience: body.targetAudience || null,
        targetUniversities: body.targetUniversities ? JSON.stringify(body.targetUniversities) : existingPosting.targetUniversities,
        categories: body.categories ? JSON.stringify(body.categories) : existingPosting.categories,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone || null,
        website: body.website || null,
        socialMediaLinks: body.socialMediaLinks || null,
        photos: body.photos ? JSON.stringify(body.photos) : existingPosting.photos,
      },
    })

    return NextResponse.json(posting)
  } catch (error) {
    console.error("Error updating sponsor posting:", error)
    return NextResponse.json({ error: "Failed to update sponsor posting" }, { status: 500 })
  }
}

