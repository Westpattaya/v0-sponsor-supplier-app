"use client"

import { useState } from "react"
import { Search, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EventFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onEventTypeChange?: (type: string) => void
  onBudgetChange?: (budget: string) => void
}

export default function EventFilterBar({
  searchQuery,
  onSearchChange,
  onEventTypeChange,
  onBudgetChange,
}: EventFilterBarProps) {
  const [selectedEventType, setSelectedEventType] = useState("ทุกประเภทอีเว้นท์")
  const [selectedBudget, setSelectedBudget] = useState("ทุกช่วงราคา")

  const eventTypes = [
    "ทุกประเภทอีเว้นท์",
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

  const budgetRanges = [
    "ทุกช่วงราคา",
    "$0 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ]

  return (
    <div className="w-full bg-background py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-0 bg-card rounded-lg border border-border overflow-hidden shadow-sm h-12">
          {/* Event Type Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 h-full border-r border-border hover:bg-muted/50 transition-colors text-left min-w-[200px]">
                <span className={`text-sm font-medium ${selectedEventType === "ทุกประเภทอีเว้นท์" ? "text-muted-foreground" : "text-foreground"}`}>
                  {selectedEventType}
                </span>
                <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {eventTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => {
                    setSelectedEventType(type)
                    onEventTypeChange?.(type === "ทุกประเภทอีเว้นท์" ? "" : type)
                  }}
                  className="cursor-pointer"
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Budget Range Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 h-full border-r border-border hover:bg-muted/50 transition-colors text-left min-w-[180px]">
                <span className={`text-sm font-medium ${selectedBudget === "ทุกช่วงราคา" ? "text-muted-foreground" : "text-foreground"}`}>
                  {selectedBudget}
                </span>
                <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {budgetRanges.map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => {
                    setSelectedBudget(range)
                    onBudgetChange?.(range === "ทุกช่วงราคา" ? "" : range)
                  }}
                  className="cursor-pointer"
                >
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Input */}
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="อีเว้นท์ใกล้ฉัน"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 h-full border-0 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => onSearchChange(searchQuery)}
            className="flex items-center justify-center px-6 h-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm whitespace-nowrap"
          >
            ค้นหาข้อมูล
          </button>
        </div>
      </div>
    </div>
  )
}

