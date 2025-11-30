"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Calendar as CalendarIcon, X, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface PostEventFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PostEventForm({ onSuccess, onCancel }: PostEventFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [submitted, setSubmitted] = useState(false)
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    // Basic Info
    eventName: "",
    shortDescription: "",
    fullDescription: "",
    eventType: "",
    eventTypeOther: "",
    eventDates: "",
    location: "",
    venue: "",
    isOnline: false,

    // University & Audience
    university: "",
    universityOther: "",
    expectedAttendees: "",
    audienceAgeRange: "",
    audienceInterests: "",
    audienceOccupation: "",

    // Organizer Info
    organizerName: "",
    organizerRole: "",
    email: "",
    phone: "",
    socialMediaLinks: "",

    // Sponsorship Details
    budget: "",
    supportNeeded: [] as string[],

    // Terms
    agreedToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const eventTypes = [
    "Concert",
    "University Event",
    "Conference",
    "Competition",
    "Festival",
    "Sport",
    "Charity",
    "Tech",
    "Music",
    "Art",
    "Corporate",
    "Other",
  ]

  const universities = [
    "Chulalongkorn University (จุฬาลงกรณ์มหาวิทยาลัย)",
    "Thammasat University (มหาวิทยาลัยธรรมศาสตร์)",
    "Kasetsart University (มหาวิทยาลัยเกษตรศาสตร์)",
    "Mahidol University (มหาวิทยาลัยมหิดล)",
    "Chiang Mai University (มหาวิทยาลัยเชียงใหม่)",
    "Khon Kaen University (มหาวิทยาลัยขอนแก่น)",
    "KMITL (สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง)",
    "KMUTT (มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี)",
    "Silpakorn University (มหาวิทยาลัยศิลปากร)",
    "Srinakharinwirot University (มหาวิทยาลัยศรีนครินทรวิโรฒ)",
    "King Mongkut's University of Technology North Bangkok (KMUTNB)",
    "Burapha University (มหาวิทยาลัยบูรพา)",
    "Prince of Songkla University (มหาวิทยาลัยสงขลานครินทร์)",
    "Other",
  ]

  const supportTypes = ["money", "product", "booth", "giveaway", "service"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...prev[field as keyof typeof prev], value]
      return { ...prev, [field]: newArray }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.eventName.trim()) newErrors.eventName = "Event name is required"
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required"
    if (!formData.eventType) newErrors.eventType = "Event type is required"
    if (formData.eventType === "Other" && !formData.eventTypeOther.trim()) {
      newErrors.eventTypeOther = "Please specify event type"
    }
    if (!selectedDate && !formData.eventDates.trim()) newErrors.eventDates = "Event date is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.university) newErrors.university = "University is required"
    if (formData.university === "Other" && !formData.universityOther.trim()) {
      newErrors.universityOther = "Please specify university"
    }
    if (!formData.expectedAttendees.trim()) newErrors.expectedAttendees = "Expected attendees is required"
    if (!formData.organizerName.trim()) newErrors.organizerName = "Organizer name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please include an '@' in the email address"
    }
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms"

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const eventDate = selectedDate || (formData.eventDates ? new Date(formData.eventDates) : new Date())
        const finalEventType = formData.eventType === "Other" ? formData.eventTypeOther : formData.eventType
        const finalUniversity = formData.university === "Other" ? formData.universityOther : formData.university

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000)

        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            eventName: formData.eventName,
            shortDescription: formData.shortDescription,
            fullDescription: formData.fullDescription,
            eventType: finalEventType,
            eventDates: eventDate.toISOString(),
            location: formData.location,
            venue: formData.venue,
            isOnline: formData.isOnline,
            university: finalUniversity,
            expectedAttendees: formData.expectedAttendees,
            audienceAgeRange: formData.audienceAgeRange,
            audienceInterests: formData.audienceInterests,
            audienceOccupation: formData.audienceOccupation,
            organizerName: formData.organizerName,
            organizerRole: formData.organizerRole,
            organizerEmail: formData.email,
            email: formData.email,
            phone: formData.phone,
            socialMediaLinks: formData.socialMediaLinks,
            budget: formData.budget,
            supportNeeded: formData.supportNeeded,
          }),
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json()
            throw new Error(errorData.error || errorData.message || "Failed to post event")
          } else {
            const text = await response.text()
            throw new Error(`Server error (${response.status}). Please check the console for details.`)
          }
        }

        await response.json()
        queryClient.invalidateQueries({ queryKey: ["events"] })
        setSubmitted(true)
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 2000)
        }
      } catch (error) {
        console.error("Error posting event:", error)
        let errorMessage = "Failed to post event. Please try again."
        
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = "Request timed out. Please check your connection and try again."
          } else {
            errorMessage = error.message
          }
        }
        
        setErrors({ submit: errorMessage })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-green-500/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Event Posted Successfully!</h3>
        <p className="text-muted-foreground">
          Your event has been submitted and will appear on the Event Board.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Create New Event</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.eventName}
              onChange={(e) => handleInputChange("eventName", e.target.value)}
              placeholder="e.g., Summer Music Festival 2025"
              className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.eventName ? "border-destructive" : "border-border"
              }`}
            />
            {errors.eventName && <p className="text-sm text-destructive mt-1">{errors.eventName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Event Type <span className="text-destructive">*</span>
              </label>
              <select
                required
                value={formData.eventType}
                onChange={(e) => {
                  handleInputChange("eventType", e.target.value)
                  if (errors.eventType) setErrors((prev) => ({ ...prev, eventType: "" }))
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
              {errors.eventType && <p className="text-sm text-destructive mt-1">{errors.eventType}</p>}
              {formData.eventType === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    required={formData.eventType === "Other"}
                    value={formData.eventTypeOther}
                    onChange={(e) => handleInputChange("eventTypeOther", e.target.value)}
                    placeholder="Specify event type"
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Event Date <span className="text-destructive">*</span>
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
                  >
                    <span>{selectedDate ? format(selectedDate, "PPP") : "Pick a date"}</span>
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
                      if (errors.eventDates) setErrors((prev) => ({ ...prev, eventDates: "" }))
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.eventDates && <p className="text-sm text-destructive mt-1">{errors.eventDates}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Short Description <span className="text-destructive">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.shortDescription}
              onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              placeholder="Brief description that will appear on event cards..."
              className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                errors.shortDescription ? "border-destructive" : "border-border"
              }`}
            />
            {errors.shortDescription && (
              <p className="text-sm text-destructive mt-1">{errors.shortDescription}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Description</label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => handleInputChange("fullDescription", e.target.value)}
              placeholder="Detailed description of your event..."
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Bangkok, Thailand"
                className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.location ? "border-destructive" : "border-border"
                }`}
              />
              {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Venue Name</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="e.g., Main Auditorium"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* University & Audience */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              University <span className="text-destructive">*</span>
            </label>
            <select
              required
              value={formData.university}
              onChange={(e) => {
                handleInputChange("university", e.target.value)
                if (errors.university) setErrors((prev) => ({ ...prev, university: "" }))
              }}
              className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.university ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Select university</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            {errors.university && <p className="text-sm text-destructive mt-1">{errors.university}</p>}
            {formData.university === "Other" && (
              <div className="mt-3">
                <input
                  type="text"
                  required={formData.university === "Other"}
                  value={formData.universityOther}
                  onChange={(e) => handleInputChange("universityOther", e.target.value)}
                  placeholder="Specify university"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.universityOther ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.universityOther && (
                  <p className="text-sm text-destructive mt-1">{errors.universityOther}</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Attendees <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.expectedAttendees}
              onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
              placeholder="e.g., 5,000-7,000"
              className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.expectedAttendees ? "border-destructive" : "border-border"
              }`}
            />
            {errors.expectedAttendees && (
              <p className="text-sm text-destructive mt-1">{errors.expectedAttendees}</p>
            )}
          </div>
        </div>

        {/* Organizer Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organizerName}
                onChange={(e) => handleInputChange("organizerName", e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.organizerName ? "border-destructive" : "border-border"
                }`}
              />
              {errors.organizerName && (
                <p className="text-sm text-destructive mt-1">{errors.organizerName}</p>
              )}
            </div>

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
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                }}
                className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Sponsorship Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Support Needed
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {supportTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.supportNeeded.includes(type)}
                    onChange={() => handleCheckboxChange("supportNeeded", type)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              placeholder="e.g., $50K"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.agreedToTerms}
              onChange={(e) => {
                handleInputChange("agreedToTerms", e.target.checked)
                if (errors.agreedToTerms) setErrors((prev) => ({ ...prev, agreedToTerms: "" }))
              }}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-foreground">
              I agree to the platform rules and confirm that all information provided is accurate.{" "}
              <span className="text-destructive">*</span>
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="text-sm text-destructive ml-7">{errors.agreedToTerms}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Event"}
          </button>
        </div>
      </form>
    </div>
  )
}

