-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "audienceSize" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "photos" TEXT,
    "needs" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "venue" TEXT,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "budget" TEXT,
    "audienceAgeRange" TEXT,
    "audienceInterests" TEXT,
    "audienceOccupation" TEXT,
    "sponsorshipTiers" TEXT,
    "benefits" TEXT,
    "timeline" TEXT,
    "deliverables" TEXT,
    "organizerName" TEXT NOT NULL,
    "organizerRole" TEXT,
    "organizerEmail" TEXT NOT NULL,
    "organizerPhone" TEXT,
    "socialMediaLinks" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Organizer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "companyName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SponsorshipOffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "amount" TEXT,
    "items" TEXT,
    "deliverablesRequested" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SponsorshipOffer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SponsorshipOffer_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_email_key" ON "Sponsor"("email");

-- CreateIndex
CREATE INDEX "SponsorshipOffer_eventId_idx" ON "SponsorshipOffer"("eventId");

-- CreateIndex
CREATE INDEX "SponsorshipOffer_sponsorId_idx" ON "SponsorshipOffer"("sponsorId");

-- CreateIndex
CREATE INDEX "SponsorshipOffer_status_idx" ON "SponsorshipOffer"("status");
