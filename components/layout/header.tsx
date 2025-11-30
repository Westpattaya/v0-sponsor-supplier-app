"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, User, ChevronDown, MessageCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ContactChat from "@/components/chat/contact-chat"

// Simple role check - in production, use proper auth/session
function useUserRole() {
  const [role, setRole] = useState<string>("organizer")
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "organizer"
      setRole(storedRole)
    }
  }, [])
  
  return role
}

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const userRole = useUserRole()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="h-7 w-7 md:h-8 md:w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">SM</span>
            </div>
            <span className="font-semibold text-base md:text-lg text-foreground">SponMatch</span>
          </Link>

          {/* Center-Right: Navigation Links & CTAs */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
            {/* For Organizers */}
            {userRole === "organizer" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium text-sm shadow-sm hover:shadow-md">
                    <span>Post Event</span>
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/post-event" className="cursor-pointer">
                      Post Event
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* For Sponsors */}
            {userRole === "sponsor" && (
              <>
            <Link
                  href="/sponsor/event-board"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Event Board
            </Link>
                <Link
                  href="/sponsor/dashboard"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium text-sm shadow-sm hover:shadow-md">
                      <span>Post Sponsor</span>
                      <ChevronDown size={16} />
            </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link href="/sponsor/dashboard" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/post-sponsor" className="cursor-pointer">
                        Post Sponsor
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Register as Sponsor Button - Always visible */}
            <Link
              href="/register-sponsor"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
            >
              <span>Register as Sponsor</span>
              <ChevronDown size={16} />
            </Link>
          </div>

          {/* Right: Notifications, Chat & User Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
              <Bell size={18} className="md:w-5 md:h-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </button>

            {/* Chat Button */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              title="Contact Us"
            >
              <MessageCircle size={18} className="md:w-5 md:h-5" />
            </button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                  <User size={18} className="md:w-5 md:h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/signup" className="cursor-pointer">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
                {userRole === "organizer" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/organizer/dashboard" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Contact Chat Modal */}
      <ContactChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  )
}

