"use client"

import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Plus, X } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/header"

// Simple role check - in production, use proper auth/session
function useUserRole() {
  const [role, setRole] = useState<string>("organizer")
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "organizer"
      setRole(storedRole)
    }
  }, [])
  
  return role
}

export default function PostSponsorPage() {
  const router = useRouter()
  const userRole = useUserRole()
  const [submitted, setSubmitted] = useState(false)
  const queryClient = useQueryClient()

  // Check if user is a sponsor - if not, redirect
  useEffect(() => {
    if (userRole !== "sponsor") {
      router.push("/login")
    }
  }, [userRole, router])

  if (userRole !== "sponsor") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">This page is only available to sponsors.</p>
          <Link href="/login" className="mt-4 inline-block text-primary hover:text-primary/80">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    shortDescription: "",
    fullDescription: "",
    companyName: "",
    sponsorType: "",
    sponsorTypeOther: "",
    budget: "",

    // Categories & Target
    categories: [] as string[],
    targetUniversities: [] as string[],
    targetAudience: "",

    // Contact Info
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    socialMediaLinks: "",

    // Deliverables & Benefits
    deliverables: [""] as string[],
    benefits: [""] as string[],

    // Terms
    agreedToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const sponsorTypes = [
    "Financial Sponsor",
    "Product Sponsor",
    "Service Sponsor",
    "Booth Sponsor",
    "Media Sponsor",
    "Technology Sponsor",
    "Food & Beverage Sponsor",
    "Other",
  ]

  const eventCategories = [
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
    "All Universities",
  ]

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

  const addDeliverable = () => {
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, ""],
    }))
  }

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }))
  }

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required"
    if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required"
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
    if (!formData.sponsorType) newErrors.sponsorType = "Sponsor type is required"
    if (formData.sponsorType === "Other" && !formData.sponsorTypeOther.trim()) {
      newErrors.sponsorTypeOther = "Please specify sponsor type"
    }
    if (formData.categories.length === 0) newErrors.categories = "At least one category is required"
    if (formData.deliverables.filter((d) => d.trim()).length === 0) {
      newErrors.deliverables = "At least one deliverable is required"
    }
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required"
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please include an '@' in the email address"
    }
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms"

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const finalSponsorType = formData.sponsorType === "Other" ? formData.sponsorTypeOther : formData.sponsorType

        // Create an AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        const response = await fetch("/api/sponsor-postings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            title: formData.title,
            shortDescription: formData.shortDescription,
            description: formData.fullDescription,
            companyName: formData.companyName,
            sponsorType: finalSponsorType,
            budget: formData.budget || null,
            categories: formData.categories,
            targetUniversities: formData.targetUniversities,
            targetAudience: formData.targetAudience || null,
            deliverables: formData.deliverables.filter((d) => d.trim()),
            benefits: formData.benefits.filter((b) => b.trim()).length > 0
              ? formData.benefits.filter((b) => b.trim())
              : null,
            contactName: formData.contactName,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone || null,
            website: formData.website || null,
            socialMediaLinks: formData.socialMediaLinks || null,
          }),
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          // Check if response is JSON
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json()
            console.error("API Error:", errorData)
            throw new Error(errorData.error || errorData.message || "Failed to post sponsorship offer")
          } else {
            // If it's HTML or other format, get text and throw generic error
            const text = await response.text()
            console.error("Non-JSON error response:", text.substring(0, 500))
            throw new Error(`Server error (${response.status}). Please check the console for details.`)
          }
        }

        const posting = await response.json()
        console.log("Sponsor posting created successfully:", posting)
        
        // Invalidate queries to refresh the sponsor posting lists
        queryClient.invalidateQueries({ queryKey: ["sponsor-postings"] })
        
        setSubmitted(true)
      } catch (error) {
        console.error("Error posting sponsor offer:", error)
        let errorMessage = "Failed to post sponsorship offer. Please try again."
        
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
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Sponsorship Offer Posted Successfully!</h1>
              <p className="text-muted-foreground">
                Your sponsorship offer has been submitted and will be visible to organizers on the marketplace.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Marketplace
              </Link>
              <Link
                href="/post-sponsor"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                onClick={() => setSubmitted(false)}
              >
                Post Another Offer
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Post Your Sponsorship Offer</h1>
              <p className="text-muted-foreground">
                Create a listing for your sponsorship package and connect with event organizers
              </p>
            </div>

            {errors.submit && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* 1. Basic Information */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">1. Basic Information</h2>
                  <p className="text-sm text-muted-foreground">Tell organizers about your sponsorship offer</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sponsorship Package Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Tech Startup Sponsorship Package 2025"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.title ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="e.g., TechCorp Inc."
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.companyName ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sponsor Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      value={formData.sponsorType}
                      onChange={(e) => {
                        handleInputChange("sponsorType", e.target.value)
                        if (errors.sponsorType) setErrors((prev) => ({ ...prev, sponsorType: "" }))
                        if (errors.sponsorTypeOther) setErrors((prev) => ({ ...prev, sponsorTypeOther: "" }))
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.sponsorType ? "border-destructive" : "border-border"
                      }`}
                    >
                      <option value="">Select sponsor type</option>
                      {sponsorTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.sponsorType && <p className="text-sm text-destructive mt-1">{errors.sponsorType}</p>}
                    {formData.sponsorType === "Other" && (
                      <div className="mt-3">
                        <input
                          type="text"
                          required={formData.sponsorType === "Other"}
                          value={formData.sponsorTypeOther}
                          onChange={(e) => {
                            handleInputChange("sponsorTypeOther", e.target.value)
                            if (errors.sponsorTypeOther) setErrors((prev) => ({ ...prev, sponsorTypeOther: "" }))
                          }}
                          placeholder="Specify sponsor type"
                          className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            errors.sponsorTypeOther ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.sponsorTypeOther && (
                          <p className="text-sm text-destructive mt-1">{errors.sponsorTypeOther}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Short Description (1-2 sentences) <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    placeholder="Brief description that will appear on sponsor cards..."
                    className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                      errors.shortDescription ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.shortDescription && (
                    <p className="text-sm text-destructive mt-1">{errors.shortDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                    placeholder="Detailed description of your sponsorship package, what you offer, and what you're looking for..."
                    className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                      errors.fullDescription ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.fullDescription && (
                    <p className="text-sm text-destructive mt-1">{errors.fullDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Budget Range (Optional)</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    placeholder="e.g., $10K - $50K"
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </section>

              {/* 2. Categories & Target */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">2. Categories & Target Audience</h2>
                  <p className="text-sm text-muted-foreground">What types of events are you interested in sponsoring?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Event Categories <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {eventCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => handleCheckboxChange("categories", category)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                  {errors.categories && <p className="text-sm text-destructive mt-1">{errors.categories}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Target Universities</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {universities.map((uni) => (
                      <label
                        key={uni}
                        className="flex items-center gap-2 p-2 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.targetUniversities.includes(uni)}
                          onChange={() => handleCheckboxChange("targetUniversities", uni)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{uni}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Target Audience Description</label>
                  <textarea
                    rows={3}
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                    placeholder="e.g., Tech-savvy students, entrepreneurs, startup founders..."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </section>

              {/* 3. Contact Information */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">3. Contact Information</h2>
                  <p className="text-sm text-muted-foreground">How can organizers reach you?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.contactName ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-destructive mt-1">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => {
                        handleInputChange("contactEmail", e.target.value)
                        if (errors.contactEmail) setErrors((prev) => ({ ...prev, contactEmail: "" }))
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.contactEmail ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.contactEmail && <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Social Media Links</label>
                  <input
                    type="text"
                    value={formData.socialMediaLinks}
                    onChange={(e) => handleInputChange("socialMediaLinks", e.target.value)}
                    placeholder="e.g., @companyname on Instagram, LinkedIn, etc."
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </section>

              {/* 4. Deliverables & Benefits */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">4. Deliverables & Benefits</h2>
                  <p className="text-sm text-muted-foreground">What can you offer to event organizers?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Deliverables <span className="text-destructive">*</span>
                  </label>
                  {formData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => {
                          const newDeliverables = [...formData.deliverables]
                          newDeliverables[index] = e.target.value
                          handleInputChange("deliverables", newDeliverables)
                        }}
                        placeholder="e.g., Logo placement, Social media posts, Product samples..."
                        className="flex-1 px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {formData.deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDeliverable(index)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Deliverable</span>
                  </button>
                  {errors.deliverables && <p className="text-sm text-destructive mt-1">{errors.deliverables}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Benefits (Optional)</label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => {
                          const newBenefits = [...formData.benefits]
                          newBenefits[index] = e.target.value
                          handleInputChange("benefits", newBenefits)
                        }}
                        placeholder="e.g., Brand exposure, Lead generation, Community engagement..."
                        className="flex-1 px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Benefit</span>
                  </button>
                </div>
              </section>

              {/* 5. Terms & Submit */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">5. Terms & Confirmation</h2>
                </div>

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
              </section>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Posting..." : "Post Sponsorship Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

