"use client"

import { FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1,000 employees",
  "1,000+ employees",
]

export default function SponsorDetailsPage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState("")
  const [companySize, setCompanySize] = useState(companySizes[0])
  const [street, setStreet] = useState("")
  const [district, setDistrict] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [description, setDescription] = useState("")

  const previewAddress = useMemo(() => {
    const parts = [street, district, province, postalCode].filter(Boolean)
    return parts.length ? parts.join(", ") : "Address will appear here"
  }, [street, district, province, postalCode])

  const previewWebsite = useMemo(
    () => website || "Add a website or social handle to show here",
    [website]
  )

  const previewDescription = useMemo(
    () =>
      description ||
      "Introduce your company, what you do, and what kinds of partnerships you are looking for.",
    [description]
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Sponsor detail saved:", {
      companyName,
      companySize,
      street,
      district,
      province,
      postalCode,
      contactEmail,
      contactPhone,
      website,
      description,
    })
    router.push("/register-sponsor/form/sponsorship-preferences")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
              <span>Step 2 of 3</span>
              <span>Sponsor detail</span>
            </div>
            <div className="h-1 rounded-full bg-muted/40">
              <div className="h-full w-3/5 rounded-full bg-primary" />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <section className="space-y-8 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">
                  Sponsor details
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Tell us about your company
                </h1>
                <p className="text-base text-muted-foreground mt-2">
                  We will use this information to match you with the right campus
                  events and communities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="company-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Company name
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    placeholder="Your official company name"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company-size"
                    className="text-sm font-medium text-foreground"
                  >
                    Company size
                  </label>
                  <select
                    id="company-size"
                    value={companySize}
                    onChange={(event) => setCompanySize(event.target.value)}
                    className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span>Company address</span>
                    <span className="text-xs text-muted-foreground">
                      Street, district, province, postal code
                    </span>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={street}
                      onChange={(event) => setStreet(event.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        placeholder="District"
                        value={district}
                        onChange={(event) => setDistrict(event.target.value)}
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      />
                      <input
                        type="text"
                        placeholder="Province"
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Contact email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Contact phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    value={contactPhone}
                    onChange={(event) => setContactPhone(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="website"
                    className="text-sm font-medium text-foreground"
                  >
                    Website / social
                  </label>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-foreground"
                  >
                    Short company description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Summarize what your company does and the kind of sponsorships you are looking for."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-base flex items-center justify-center gap-2"
                >
                  Save and Continue
                  <span aria-hidden>➝</span>
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
                    Sponsor detail card
                  </h2>
                </div>
                <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                  Live
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">
                    Company
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {companyName || "Your company name here"}
                  </p>
                  <p className="text-sm text-muted-foreground">{companySize}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">{previewAddress}</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Contact email
                    </p>
                    <p className="text-sm text-foreground">
                      {contactEmail || "email@company.com"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Phone
                    </p>
                    <p className="text-sm text-foreground">
                      {contactPhone || "+1 555 123 4567"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Website / social
                  </p>
                  <p className="text-sm text-foreground">{previewWebsite}</p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {previewDescription}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
