import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"
import type { Proposal } from "@/lib/types"

interface ProposalCardProps {
  proposal: Proposal
}

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50", label: "Pending" },
    approved: { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", label: "Approved" },
    rejected: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Rejected" },
  }

  const config = statusConfig[proposal.status]
  const Icon = config.icon

  return (
    <div className="bg-white border border-border rounded-3xl p-4 space-y-3 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{proposal.eventTitle}</h3>
          <p className="text-sm text-muted-foreground">{proposal.supplierName}</p>
        </div>
        <div className={`p-2 rounded-full ${config.bg}`}>
          <Icon size={20} className={config.color} />
        </div>
      </div>

      <p className="text-sm text-foreground">{proposal.proposalText}</p>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-medium text-accent">${proposal.amount}</span>
        <button className="text-accent hover:opacity-70 transition-opacity">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
