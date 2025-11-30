"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import Header from "@/components/layout/header"
import HeroSection from "@/components/marketplace/hero-section"
import HorizontalFilterBar from "@/components/marketplace/horizontal-filter-bar"
import CategoryGrid from "@/components/marketplace/category-grid"
import SponsorPostingCard from "@/components/marketplace/sponsor-posting-card"
import { transformDbSponsorPostingToPosting } from "@/lib/event-utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchOptionClick = (option: string) => {
    // You can customize this based on what each option should do
    switch (option) {
      case "nearby":
        // Could implement location-based search
        setSearchQuery("nearby")
        break
      case "sponsor-type":
        setShowFilters(true)
        break
      case "university":
        setShowFilters(true)
        break
      case "category":
        setShowFilters(true)
        break
      default:
        break
    }
  }

  // Fetch sponsor postings from API
  const { data: postingsData, isLoading } = useQuery({
    queryKey: ["sponsor-postings", "all"],
    queryFn: async () => {
      const response = await fetch("/api/sponsor-postings?limit=100")
      if (!response.ok) throw new Error("Failed to fetch sponsor postings")
      return response.json()
    },
  })

  // Transform database sponsor postings
  const dbPostings = postingsData?.postings?.map(transformDbSponsorPostingToPosting) || []
  const allPostings = dbPostings

  // Filter sponsor postings
  const filteredPostings = useMemo(() => {
    return allPostings.filter((posting) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        posting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.sponsorType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesSearch
    })
  }, [allPostings, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <HeroSection 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          onSearchOptionClick={handleSearchOptionClick}
        />

        {/* Horizontal Filter Bar */}
        <HorizontalFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Sponsors Section */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Available Sponsors</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">Sponsors offering sponsorship packages for your events</p>
              </div>
            </div>

            {/* Sponsors Grid */}
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading sponsors...</div>
            ) : filteredPostings.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredPostings.length} {filteredPostings.length === 1 ? "sponsor" : "sponsors"}
                  </p>
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredPostings.map((posting) => (
                    <SponsorPostingCard key={posting.id} posting={posting} />
              ))}
            </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-2">No sponsors found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
            </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
