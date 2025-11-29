"use client"

import Link from "next/link"
import { Bell, User, ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="h-7 w-7 md:h-8 md:w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">SM</span>
            </div>
            <span className="font-semibold text-base md:text-lg text-foreground">SponMatch</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Event Board Link */}
            <Link
              href="/find-sponsors"
              className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Event Board
            </Link>

            {/* Organizer Dashboard */}
            <Link
              href="/organizer/dashboard"
              className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>

            {/* Notifications */}
            <button className="relative p-1.5 md:p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
              <Bell size={18} className="md:w-5 md:h-5" />
              <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary"></span>
            </button>

            {/* Login/Signup */}
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              Sign Up
            </Link>

            {/* Post Event Button */}
            <Link
              href="/post-event"
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 md:px-5 md:py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <span>Post Event</span>
            </Link>

            {/* Register as Sponsor Button */}
            <Link
              href="/register-sponsor"
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 md:px-5 md:py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <span>Register as Sponsor</span>
              <ChevronDown size={14} className="md:w-4 md:h-4" />
            </Link>

            {/* User Profile */}
            <button className="p-1.5 md:p-2 rounded-md hover:bg-muted transition-colors">
              <User size={18} className="text-muted-foreground md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

