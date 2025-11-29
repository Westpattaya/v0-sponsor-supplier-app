"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Users,
  MessageCircle,
  Music2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ReferralSource {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const referralSources: ReferralSource[] = [
  { id: "google", name: "Google", icon: Search },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: Music2 },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "twitter", name: "X (Twitter)", icon: Twitter },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "referral", name: "Someone Recommended", icon: Users },
]

export default function ReferralSourceForm() {
  const router = useRouter()
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const handleContinue = () => {
    // Save selection and navigate to next step
    // For now, just log and continue
    console.log("Selected sources:", selectedSources)
    router.push("/register-sponsor/form/company-details")
  }

  const handleSkip = () => {
    router.push("/register-sponsor/form/company-details")
  }

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Before we start, tell us where you heard about us?
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          You can select multiple options
        </p>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {referralSources.map((source) => {
          const Icon = source.icon
          const isSelected = selectedSources.includes(source.id)
          return (
            <button
              key={source.id}
              onClick={() => toggleSource(source.id)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-lg mb-3 transition-colors",
                  isSelected ? "bg-primary/10" : "bg-muted/50"
                )}
              >
                <Icon
                  size={32}
                  className={cn(
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-medium text-center",
                  isSelected ? "text-primary" : "text-foreground"
                )}
              >
                {source.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={handleSkip}
          className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-border bg-background text-foreground hover:bg-muted transition-colors font-medium"
        >
          Skip
        </button>
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span>Save and Continue</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

