"use client"

import { useState } from "react"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import ProposalCard from "@/components/proposal-card"
import { mockProposals } from "@/lib/mock-data"

type ProposalStatus = "all" | "pending" | "approved" | "rejected"

export default function ProposalBoardScreen() {
  const [activeTab, setActiveTab] = useState<ProposalStatus>("all")

  const filteredProposals = activeTab === "all" ? mockProposals : mockProposals.filter((p) => p.status === activeTab)

  const tabs: { label: string; value: ProposalStatus; icon: any }[] = [
    { label: "All", value: "all", icon: null },
    { label: "Pending", value: "pending", icon: Clock },
    { label: "Approved", value: "approved", icon: CheckCircle },
    { label: "Rejected", value: "rejected", icon: AlertCircle },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Proposals</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.value ? "bg-accent text-white" : "bg-muted text-foreground border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals List */}
      <div className="p-4 space-y-3">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} />)
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No {activeTab !== "all" ? activeTab : ""} proposals</p>
          </div>
        )}
      </div>
    </div>
  )
}
