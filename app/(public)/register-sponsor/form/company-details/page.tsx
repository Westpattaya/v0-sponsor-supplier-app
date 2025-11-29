"use client"

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"

const sponsorTypes = [
  { id: "brand", label: "Brand" },
  { id: "agency", label: "Agency" },
  { id: "community", label: "Community" },
]

const categories = [
  { value: "community", label: "Community Partnerships" },
  { value: "technology", label: "Technology & SaaS" },
  { value: "wellness", label: "Wellness & Lifestyle" },
  { value: "media", label: "Media & Content" },
]

export default function SponsorProfileDetailsPage() {
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [sponsorType, setSponsorType] = useState(sponsorTypes[0].id)
  const [category, setCategory] = useState(categories[0].value)
  const [bio, setBio] = useState("")
  const [logoPreview, setLogoPreview] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview)
      }
    }
  }, [logoPreview])

  const previewName = useMemo(
    () => displayName.trim() || username.trim() || "d61emqio",
    [displayName, username]
  )

  const previewUrl = useMemo(
    () => `SponMatch.co/user/${username.trim() || "d61emqio"}`,
    [username]
  )

  const previewCategory = useMemo(
    () => categories.find((item) => item.value === category)?.label ?? "Creative",
    [category]
  )

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setLogoPreview(objectUrl)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Sponsor profile saved:", {
      username,
      displayName,
      sponsorType,
      category,
      bio,
    })
    router.push("/register-sponsor/form/sponsor-details")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <section className="space-y-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">
                  Sponsor profile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Build your presence
                </h1>
                <p className="text-base text-muted-foreground mt-2">
                  We will use this information to showcase your brand across
                  events and campaigns.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    URL preview
                  </div>
                  <div className="flex flex-wrap gap-1 text-base font-medium text-foreground">
                    <span>SponMatch.co/user/</span>
                    <span className="text-primary">
                      {username.trim() || "d61emqio"}
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="display-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Display name
                  </label>
                  <input
                    id="display-name"
                    name="display-name"
                    type="text"
                    placeholder="e.g. SponMatch Studio"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-foreground">
                    Sponsor type
                  </legend>
                  <div className="grid grid-cols-3 gap-3">
                    {sponsorTypes.map((type) => (
                      <label
                        key={type.id}
                        className="flex cursor-pointer items-center justify-center rounded-2xl border border-border bg-background p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-primary/5"
                      >
                        <input
                          type="radio"
                          name="sponsorType"
                          value={type.id}
                          checked={sponsorType === type.id}
                          onChange={() => setSponsorType(type.id)}
                          className="sr-only"
                        />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-foreground"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      {categories.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                      ▾
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium text-foreground"
                  >
                    Short bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell people what makes your brand or community special."
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span>Logo upload</span>
                    <span className="text-xs text-muted-foreground">
                      SVG, PNG, JPG up to 5MB
                    </span>
                  </div>
                  <label
                    htmlFor="logo-upload"
                    className="group flex items-center gap-4 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-foreground transition hover:border-primary hover:bg-muted/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/60 text-2xl font-bold text-muted-foreground">
                      +
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Upload a logo</p>
                      <p className="text-xs text-muted-foreground">
                        Drop files or browse from your device.
                      </p>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition group-hover:border-primary group-hover:text-primary">
                      Browse
                    </span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Preview ready for upload
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-base flex items-center justify-center gap-2"
                >
                  Save and Continue
                </button>
              </form>
            </section>

            <section className="space-y-6 rounded-3xl border border-border bg-gradient-to-b from-slate-50 to-white p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">
                    Preview
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    How you will appear
                  </h2>
                </div>
                <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                  Live
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={logoPreview || "/placeholder-logo.png"}
                      alt="Sponsor logo preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground">
                      Sponsor
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {previewName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previewUrl}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {bio ||
                    "We create thoughtful brand experiences for communities and live events."}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground">
                    {previewCategory}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground">
                    {sponsorTypes.find((type) => type.id === sponsorType)?.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <div className="flex flex-col rounded-2xl border border-border bg-background px-3 py-2 text-center">
                    <span className="text-foreground font-semibold">120+</span>
                    <span className="mt-1">Opportunities</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-border bg-background px-3 py-2 text-center">
                    <span className="text-foreground font-semibold">35</span>
                    <span className="mt-1">Community events</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-border bg-background px-3 py-2 text-center">
                    <span className="text-foreground font-semibold">4.9/5</span>
                    <span className="mt-1">Trust score</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

