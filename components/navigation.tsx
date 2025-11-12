"use client"

import { Home, FileText, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentScreen: "discovery" | "proposals" | "profile"
  onNavigate: (screen: "discovery" | "proposals" | "profile") => void
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white safe-bottom">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        <button
          onClick={() => onNavigate("discovery")}
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-colors",
            currentScreen === "discovery" ? "bg-accent/10 text-accent" : "text-muted-foreground",
          )}
        >
          <Home size={24} />
          <span className="text-xs font-medium">Discover</span>
        </button>
        <button
          onClick={() => onNavigate("proposals")}
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-colors",
            currentScreen === "proposals" ? "bg-accent/10 text-accent" : "text-muted-foreground",
          )}
        >
          <FileText size={24} />
          <span className="text-xs font-medium">Proposals</span>
        </button>
        <button
          onClick={() => onNavigate("profile")}
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-colors",
            currentScreen === "profile" ? "bg-accent/10 text-accent" : "text-muted-foreground",
          )}
        >
          <User size={24} />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  )
}
