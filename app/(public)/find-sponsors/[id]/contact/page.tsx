"use client"

import { use, useState, useRef } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft, Upload, X, CheckCircle2, AlertCircle, Calendar as CalendarIcon } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import Header from "@/components/layout/header"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { mockEvents } from "@/lib/mock-data"
import type { Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ContactOrganizerPage({ params }: PageProps) {
  const { id } = use(params)
  const event: Event | undefined = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const [formData, setFormData] = useState({
    // Event Basic Info
    eventName: event.title,
    shortDescription: "",
    eventType: "",
    eventTypeOther: "",
    eventDates: "",
    location: event.location,
    expectedAttendees: "",
    audienceAgeRange: "",
    audienceInterests: "",
    audienceOccupation: "",
    audienceLocation: "",

    // Organizer Information
    organizerName: "",
    organizationType: "",
    organizationTypeOther: "",
    contactPersonName: "",
    contactPersonRole: "",
    email: "",
    phone: "",
    socialMediaLinks: "",

    // Sponsorship Request Details
    sponsorshipType: [] as string[],
    budgetRequest: "",
    sponsorshipPackage: "",
    deliverables: "",
    sponsorMatchReason: "",

    // Marketing & Exposure
    socialMediaReach: "",
    previousEventResults: "",
    mediaCoverageExpected: "",
    influencersInvolved: "",

    // Files
    uploadedFiles: [] as File[],

    // Sponsor Activation Options
    activationOptions: [] as string[],

    // Timeline
    deliverableTimeline: "",

    // Additional Notes
    additionalNotes: "",

    // Terms
    agreedToTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Refs for scrolling to sections
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      // Highlight the section briefly
      element.classList.add("ring-2", "ring-primary", "ring-offset-2")
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-primary", "ring-offset-2")
      }, 2000)
    }
  }

  const eventTypes = [
    "Concert",
    "University Event",
    "Conference",
    "Competition",
    "Festival",
    "Sport",
    "Charity",
    "Other",
  ]

  const organizationTypes = ["Student Team", "Startup", "Company", "Community", "Other"]

  const sponsorshipTypes = ["Cash", "Product / Sample", "Service", "Voucher / Coupon"]

  const activationOptions = [
    "Booth Space",
    "Banner Placement",
    "Product Sampling",
    "On-Stage Mention",
    "Social Media Features",
    "Giveaways",
    "VIP Passes",
    "Special Collab (Co-branded Content)",
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Event Basic Info
    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event name is required"
    }
    if (!formData.eventType) {
      newErrors.eventType = "Event type is required"
    }
    if (formData.eventType === "Other" && !formData.eventTypeOther.trim()) {
      newErrors.eventTypeOther = "Please specify the event type"
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required"
    }
    if (!selectedDate && !formData.eventDates.trim()) {
      newErrors.eventDates = "Event dates are required"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.expectedAttendees.trim()) {
      newErrors.expectedAttendees = "Expected attendees is required"
    }

    // Organizer Information
    if (!formData.organizerName.trim()) {
      newErrors.organizerName = "Organizer name is required"
    }
    if (!formData.organizationType) {
      newErrors.organizationType = "Organization type is required"
    }
    if (formData.organizationType === "Other" && !formData.organizationTypeOther.trim()) {
      newErrors.organizationTypeOther = "Please specify the organization type"
    }
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required"
    }
    if (!formData.contactPersonRole.trim()) {
      newErrors.contactPersonRole = "Contact person role is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please include an '@' in the email address"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    // Sponsorship Request Details
    if (formData.sponsorshipType.length === 0) {
      newErrors.sponsorshipType = "Please select at least one sponsorship type"
    }
    if (!formData.budgetRequest.trim()) {
      newErrors.budgetRequest = "Budget request is required"
    }
    if (!formData.sponsorshipPackage.trim()) {
      newErrors.sponsorshipPackage = "Sponsorship package is required"
    }
    if (!formData.sponsorMatchReason.trim()) {
      newErrors.sponsorMatchReason = "Please explain why this sponsor matches your event"
    }

    // Timeline
    if (!formData.deliverableTimeline.trim()) {
      newErrors.deliverableTimeline = "Deliverable timeline is required"
    }

    // Terms
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const { isValid, errors: validationErrors } = validateForm()
    
    if (!isValid) {
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0]
      if (firstErrorKey) {
        // Map field names to section IDs
        const sectionMap: Record<string, string> = {
          eventName: "section-1",
          eventType: "section-1",
          eventTypeOther: "section-1",
          shortDescription: "section-1",
          eventDates: "section-1",
          location: "section-1",
          expectedAttendees: "section-1",
          organizerName: "section-2",
          organizationType: "section-2",
          organizationTypeOther: "section-2",
          contactPersonName: "section-2",
          contactPersonRole: "section-2",
          email: "section-2",
          phone: "section-2",
          sponsorshipType: "section-3",
          budgetRequest: "section-3",
          sponsorshipPackage: "section-3",
          sponsorMatchReason: "section-3",
          deliverableTimeline: "section-7",
          agreedToTerms: "section-9",
        }
        const sectionId = sectionMap[firstErrorKey] || "section-1"
        setTimeout(() => scrollToSection(sectionId), 200)
      }
      return
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Submission Successful!</h1>
              <p className="text-muted-foreground">
                Your sponsorship request has been sent to the organizer. They will contact you soon.
              </p>
            </div>
            <Link
              href={`/find-sponsors/${id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Event
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Back Button */}
        <div className="container mx-auto px-4 md:px-6 pt-6">
          <Link
            href={`/find-sponsors/${id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Event</span>
          </Link>
        </div>

        {/* Form */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Send Sponsorship Offer</h1>
              <p className="text-muted-foreground">Fill out the form below to send a sponsorship offer for {event.title}</p>
            </div>

            {/* Error Alert */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">
                      Please fix the following errors:
                    </h3>
                    <ul className="space-y-1">
                      {Object.entries(errors).map(([field, message]) => {
                        const sectionMap: Record<string, string> = {
                          eventName: "section-1",
                          eventType: "section-1",
                          eventTypeOther: "section-1",
                          shortDescription: "section-1",
                          eventDates: "section-1",
                          location: "section-1",
                          expectedAttendees: "section-1",
                          organizerName: "section-2",
                          organizationType: "section-2",
                          organizationTypeOther: "section-2",
                          contactPersonName: "section-2",
                          contactPersonRole: "section-2",
                          email: "section-2",
                          phone: "section-2",
                          sponsorshipType: "section-3",
                          budgetRequest: "section-3",
                          sponsorshipPackage: "section-3",
                          sponsorMatchReason: "section-3",
                          deliverableTimeline: "section-7",
                          agreedToTerms: "section-9",
                        }
                        const sectionId = sectionMap[field] || "section-1"
                        const sectionNames: Record<string, string> = {
                          "section-1": "Event / Project Basic Info",
                          "section-2": "Organizer Information",
                          "section-3": "Sponsorship Request Details",
                          "section-7": "Timeline of Deliverables",
                          "section-9": "Terms & Confirmation",
                        }
                        return (
                          <li key={field}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(sectionId)}
                              className="text-sm text-orange-800 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-200 underline text-left"
                            >
                              {message} → Go to {sectionNames[sectionId] || "section"}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* 1. Event / Project Basic Info */}
              <section
                id="section-1"
                ref={(el) => (sectionRefs.current["section-1"] = el)}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">1. Event / Project Basic Info</h2>
                  <p className="text-sm text-muted-foreground">Essential information about your event</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event / Project Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.eventName}
                      onChange={(e) => {
                        handleInputChange("eventName", e.target.value)
                        if (errors.eventName) {
                          setErrors((prev) => ({ ...prev, eventName: "" }))
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.eventName ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.eventName && (
                      <p className="text-sm text-destructive mt-1">{errors.eventName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) => {
                        handleInputChange("eventType", e.target.value)
                        if (errors.eventType) {
                          setErrors((prev) => ({ ...prev, eventType: "" }))
                        }
                        if (errors.eventTypeOther) {
                          setErrors((prev) => ({ ...prev, eventTypeOther: "" }))
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.eventType ? "border-destructive" : "border-border"
                      }`}
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="text-sm text-destructive mt-1">{errors.eventType}</p>
                    )}
                    {formData.eventType === "Other" && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Please specify event type <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required={formData.eventType === "Other"}
                          value={formData.eventTypeOther}
                          onChange={(e) => {
                            handleInputChange("eventTypeOther", e.target.value)
                            if (errors.eventTypeOther) {
                              setErrors((prev) => ({ ...prev, eventTypeOther: "" }))
                            }
                          }}
                          placeholder="Enter event type"
                          className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            errors.eventTypeOther ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.eventTypeOther && (
                          <p className="text-sm text-destructive mt-1">{errors.eventTypeOther}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Short Description (1–2 sentences) <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    placeholder="Briefly describe your event..."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Date(s) <span className="text-destructive">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-left flex items-center justify-between",
                            errors.eventDates ? "border-destructive" : "border-border",
                            !selectedDate && "text-muted-foreground"
                          )}
                          onClick={(e) => {
                            if (errors.eventDates) {
                              setErrors((prev) => ({ ...prev, eventDates: "" }))
                            }
                          }}
                        >
                          <span>
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </span>
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date)
                            if (date) {
                              handleInputChange("eventDates", format(date, "PPP"))
                            }
                            if (errors.eventDates) {
                              setErrors((prev) => ({ ...prev, eventDates: "" }))
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.eventDates && (
                      <p className="text-sm text-destructive mt-1">{errors.eventDates}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location / Venue <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Online or physical location"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expected Number of Attendees / Participants <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.expectedAttendees}
                    onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
                    placeholder="e.g., 500-1000"
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Audience Demographics</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Age Range</label>
                      <input
                        type="text"
                        value={formData.audienceAgeRange}
                        onChange={(e) => handleInputChange("audienceAgeRange", e.target.value)}
                        placeholder="e.g., 18-25"
                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Interests</label>
                      <input
                        type="text"
                        value={formData.audienceInterests}
                        onChange={(e) => handleInputChange("audienceInterests", e.target.value)}
                        placeholder="e.g., Tech, Music"
                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Occupation</label>
                      <input
                        type="text"
                        value={formData.audienceOccupation}
                        onChange={(e) => handleInputChange("audienceOccupation", e.target.value)}
                        placeholder="e.g., Students, Professionals"
                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Organizer Information */}
              <section
                id="section-2"
                ref={(el) => (sectionRefs.current["section-2"] = el)}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">2. Organizer Information</h2>
                  <p className="text-sm text-muted-foreground">Tell sponsors who they're working with</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Organizer Name / Team Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organizerName}
                      onChange={(e) => handleInputChange("organizerName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Organization Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      value={formData.organizationType}
                      onChange={(e) => {
                        handleInputChange("organizationType", e.target.value)
                        if (errors.organizationType) {
                          setErrors((prev) => ({ ...prev, organizationType: "" }))
                        }
                        if (errors.organizationTypeOther) {
                          setErrors((prev) => ({ ...prev, organizationTypeOther: "" }))
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.organizationType ? "border-destructive" : "border-border"
                      }`}
                    >
                      <option value="">Select type</option>
                      {organizationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.organizationType && (
                      <p className="text-sm text-destructive mt-1">{errors.organizationType}</p>
                    )}
                    {formData.organizationType === "Other" && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Please specify organization type <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required={formData.organizationType === "Other"}
                          value={formData.organizationTypeOther}
                          onChange={(e) => {
                            handleInputChange("organizationTypeOther", e.target.value)
                            if (errors.organizationTypeOther) {
                              setErrors((prev) => ({ ...prev, organizationTypeOther: "" }))
                            }
                          }}
                          placeholder="Enter organization type"
                          className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            errors.organizationTypeOther ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.organizationTypeOther && (
                          <p className="text-sm text-destructive mt-1">{errors.organizationTypeOther}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Person Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPersonName}
                      onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Person Role <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPersonRole}
                      onChange={(e) => handleInputChange("contactPersonRole", e.target.value)}
                      placeholder="e.g., Event Coordinator"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        handleInputChange("email", e.target.value)
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }))
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Social Media Links (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.socialMediaLinks}
                    onChange={(e) => handleInputChange("socialMediaLinks", e.target.value)}
                    placeholder="Instagram, TikTok, Facebook, LinkedIn, etc."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </section>

              {/* 3. Sponsorship Request Details */}
              <section
                id="section-3"
                ref={(el) => (sectionRefs.current["section-3"] = el)}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">3. Sponsorship Request Details</h2>
                  <p className="text-sm text-muted-foreground">The most important section - what you're asking for</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Type of Sponsorship You Want <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sponsorshipTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.sponsorshipType.includes(type)}
                          onChange={() => {
                            handleCheckboxChange("sponsorshipType", type)
                            if (errors.sponsorshipType) {
                              setErrors((prev) => ({ ...prev, sponsorshipType: "" }))
                            }
                          }}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.sponsorshipType && (
                    <p className="text-sm text-destructive">{errors.sponsorshipType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Budget You Are Requesting or Value of Support <span className="text-destructive">*</span>
                  </label>
                    <input
                      type="text"
                      required
                      value={formData.budgetRequest}
                      onChange={(e) => {
                        handleInputChange("budgetRequest", e.target.value)
                        if (errors.budgetRequest) {
                          setErrors((prev) => ({ ...prev, budgetRequest: "" }))
                        }
                      }}
                      placeholder="e.g., $10,000 or Product worth $5,000"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.budgetRequest ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.budgetRequest && (
                      <p className="text-sm text-destructive mt-1">{errors.budgetRequest}</p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Sponsorship Package / Deliverables <span className="text-destructive">*</span>
                  </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.sponsorshipPackage}
                      onChange={(e) => {
                        handleInputChange("sponsorshipPackage", e.target.value)
                        if (errors.sponsorshipPackage) {
                          setErrors((prev) => ({ ...prev, sponsorshipPackage: "" }))
                        }
                      }}
                      placeholder="What the sponsor will receive: logo placement, social posts, booth, banners, free tickets, etc."
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                        errors.sponsorshipPackage ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.sponsorshipPackage && (
                      <p className="text-sm text-destructive mt-1">{errors.sponsorshipPackage}</p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Why This Sponsor Matches Your Event <span className="text-destructive">*</span>
                  </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.sponsorMatchReason}
                      onChange={(e) => {
                        handleInputChange("sponsorMatchReason", e.target.value)
                        if (errors.sponsorMatchReason) {
                          setErrors((prev) => ({ ...prev, sponsorMatchReason: "" }))
                        }
                      }}
                      placeholder="Short custom pitch (1–2 sentences) explaining why this sponsor is a good fit"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                        errors.sponsorMatchReason ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.sponsorMatchReason && (
                      <p className="text-sm text-destructive mt-1">{errors.sponsorMatchReason}</p>
                    )}
                </div>
              </section>

              {/* 4. Marketing & Exposure Information */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">4. Marketing & Exposure Information</h2>
                  <p className="text-sm text-muted-foreground">Show sponsors the ROI they can expect</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Social Media Reach</label>
                  <textarea
                    rows={3}
                    value={formData.socialMediaReach}
                    onChange={(e) => handleInputChange("socialMediaReach", e.target.value)}
                    placeholder="Instagram: X followers, TikTok: X followers, Facebook: X followers, etc."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Previous Event Results (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.previousEventResults}
                    onChange={(e) => handleInputChange("previousEventResults", e.target.value)}
                    placeholder="Share results from past events if available"
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Media Coverage Expected</label>
                    <input
                      type="text"
                      value={formData.mediaCoverageExpected}
                      onChange={(e) => handleInputChange("mediaCoverageExpected", e.target.value)}
                      placeholder="e.g., Local news, blogs, etc."
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Influencers Involved (if any)</label>
                    <input
                      type="text"
                      value={formData.influencersInvolved}
                      onChange={(e) => handleInputChange("influencersInvolved", e.target.value)}
                      placeholder="List influencers or creators"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </section>

              {/* 5. Files & Documents Upload Section */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">5. Files & Documents Upload</h2>
                  <p className="text-sm text-muted-foreground">Upload supporting documents (optional but helpful)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Upload Files (PDF, Images, etc.)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={32} className="text-muted-foreground" />
                      <span className="text-sm text-foreground font-medium">Click to upload files</span>
                      <span className="text-xs text-muted-foreground">
                        Proposal PDF, Media Kit, Event Deck, Past Event Photos
                      </span>
                    </label>
                  </div>

                  {formData.uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* 6. Sponsor Activation Options */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">6. Sponsor Activation Options</h2>
                  <p className="text-sm text-muted-foreground">Select what you can offer sponsors</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activationOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.activationOptions.includes(option)}
                        onChange={() => handleCheckboxChange("activationOptions", option)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 7. Timeline of Deliverables */}
              <section
                id="section-7"
                ref={(el) => (sectionRefs.current["section-7"] = el)}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">7. Timeline of Deliverables</h2>
                  <p className="text-sm text-muted-foreground">When sponsors will receive benefits</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Deliverable Timeline <span className="text-destructive">*</span>
                  </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.deliverableTimeline}
                      onChange={(e) => {
                        handleInputChange("deliverableTimeline", e.target.value)
                        if (errors.deliverableTimeline) {
                          setErrors((prev) => ({ ...prev, deliverableTimeline: "" }))
                        }
                      }}
                      placeholder="e.g., Logo placement: 2 weeks before event, Social posts: 1 week before and during event, Booth setup: Day of event, etc."
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                        errors.deliverableTimeline ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.deliverableTimeline && (
                      <p className="text-sm text-destructive mt-1">{errors.deliverableTimeline}</p>
                    )}
                </div>
              </section>

              {/* 8. Additional Notes */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">8. Additional Notes for Sponsor</h2>
                  <p className="text-sm text-muted-foreground">Any special requests or additional details</p>
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    placeholder="Add any additional information or special requests..."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </section>

              {/* 9. Terms & Confirmation */}
              <section
                id="section-9"
                ref={(el) => (sectionRefs.current["section-9"] = el)}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">9. Terms & Confirmation</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToTerms}
                      onChange={(e) => {
                        handleInputChange("agreedToTerms", e.target.checked)
                        if (errors.agreedToTerms) {
                          setErrors((prev) => ({ ...prev, agreedToTerms: "" }))
                        }
                      }}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">
                      I agree to platform rules and will deliver all promised benefits. All information provided is
                      accurate. <span className="text-destructive">*</span>
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="text-sm text-destructive ml-7">{errors.agreedToTerms}</p>
                  )}
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link
                  href={`/find-sponsors/${id}`}
                  className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                >
                  Submit Sponsorship Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

