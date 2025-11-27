"use client"

import { useState } from "react"
import { X, CheckCircle2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface SponsorshipOfferModalProps {
  eventId: string
  eventName: string
  isOpen: boolean
  onClose: () => void
}

export default function SponsorshipOfferModal({
  eventId,
  eventName,
  isOpen,
  onClose,
}: SponsorshipOfferModalProps) {
  const [formData, setFormData] = useState({
    offerType: "money",
    amount: "",
    items: "",
    deliverables: [] as string[],
    notes: "",
    sponsorName: "",
    sponsorEmail: "",
    companyName: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const queryClient = useQueryClient()

  const createOfferMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          ...data,
        }),
      })
      if (!response.ok) throw new Error("Failed to create offer")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers", eventId] })
      setSubmitted(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createOfferMutation.mutate(formData)
  }

  const toggleDeliverable = (deliverable: string) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter((d) => d !== deliverable)
        : [...prev.deliverables, deliverable],
    }))
  }

  if (!isOpen) return null

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Offer Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Your sponsorship offer has been sent to the organizer. They will review it and get back to you.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                onClose()
                setFormData({
                  offerType: "money",
                  amount: "",
                  items: "",
                  deliverables: [],
                  notes: "",
                  sponsorName: "",
                  sponsorEmail: "",
                  companyName: "",
                })
              }}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Send Sponsorship Offer</h2>
            <p className="text-sm text-muted-foreground mt-1">for {eventName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Offer Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Offer Type <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["money", "product", "booth", "service"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.offerType === type
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="offerType"
                    value={type}
                    checked={formData.offerType === type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, offerType: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm font-medium text-foreground capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount or Items */}
          {formData.offerType === "money" ? (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="e.g., $10,000"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Items / Description <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.items}
                onChange={(e) => setFormData((prev) => ({ ...prev, items: e.target.value }))}
                placeholder="Describe the products, services, or items you're offering..."
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          )}

          {/* Deliverables Requested */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Deliverables Requested
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Logo placement",
                "Social media posts",
                "Booth space",
                "Product sampling",
                "VIP passes",
                "On-stage mention",
              ].map((deliverable) => (
                <label
                  key={deliverable}
                  className="flex items-center gap-2 p-2 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.deliverables.includes(deliverable)}
                    onChange={() => toggleDeliverable(deliverable)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{deliverable}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information or special requests..."
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Sponsor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.sponsorName}
                onChange={(e) => setFormData((prev) => ({ ...prev, sponsorName: e.target.value }))}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.sponsorEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, sponsorEmail: e.target.value }))}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createOfferMutation.isPending}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {createOfferMutation.isPending ? "Sending..." : "Send Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

