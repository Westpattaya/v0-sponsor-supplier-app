"use client"

import {
  UserPlus,
  Search,
  Send,
  FileText,
  CheckCircle,
  BarChart,
} from "lucide-react"

interface Step {
  number: number
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: UserPlus,
    title: "Register as Sponsor",
    description: "Create your sponsor account and complete your company profile",
  },
  {
    number: 2,
    icon: Search,
    title: "Browse Student Events",
    description: "Explore events seeking sponsorship that align with your brand",
  },
  {
    number: 3,
    icon: Send,
    title: "Send Sponsorship Offers",
    description: "Submit sponsorship proposals with your terms and deliverables",
  },
  {
    number: 4,
    icon: FileText,
    title: "Manage Contracts and Deliverables",
    description: "Review and sign contracts, then track all deliverables in one place",
  },
  {
    number: 5,
    icon: CheckCircle,
    title: "Approve Event Proofs",
    description: "Review event execution proofs and approve before final payment",
  },
  {
    number: 6,
    icon: BarChart,
    title: "Receive Final Reports",
    description: "Get comprehensive reports with metrics, reach, and engagement data",
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
            How It Works
          </h2>

          {/* Steps List */}
          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-xl bg-card border border-border/60 hover:shadow-sm transition-shadow"
                >
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border-2 border-primary/20">
                    <div className="flex items-center justify-center w-full h-full">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Step {step.number}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

