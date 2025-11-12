"use client"

import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors",
        selected
          ? "bg-accent text-white border-accent"
          : "bg-white text-foreground border-border hover:border-accent/50",
      )}
    >
      {selected && <TrendingUp size={16} />}
      {label}
    </button>
  )
}
